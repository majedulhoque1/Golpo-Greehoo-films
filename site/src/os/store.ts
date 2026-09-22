import { seedAgencies, seedCrew, buildSeedProductions } from './seed'
import type { Agency, CrewMember, Production, ProductionStage } from './types'
import { listLeads, updateLeadStage, type Lead } from '#/lib/leadStore'

const KEYS = {
  productions: 'ggf-os-productions-demo',
  agencies: 'ggf-os-agencies-demo',
  crew: 'ggf-os-crew-demo',
}

function readOrSeed<T>(key: string, seed: T): T {
  if (typeof window === 'undefined') return seed
  try {
    const raw = window.localStorage.getItem(key)
    if (raw) return JSON.parse(raw) as T
    window.localStorage.setItem(key, JSON.stringify(seed))
    return seed
  } catch {
    return seed
  }
}

function write<T>(key: string, value: T) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* noop — demo store, non-fatal */
  }
}

export function getProductions(): Production[] {
  return readOrSeed(KEYS.productions, buildSeedProductions())
}

export function getAgencies(): Agency[] {
  return readOrSeed(KEYS.agencies, seedAgencies)
}

export function getCrew(): CrewMember[] {
  return readOrSeed(KEYS.crew, seedCrew)
}

export function getProduction(id: string): Production | undefined {
  return getProductions().find((p) => p.id === id)
}

export function setProductionStage(id: string, stage: ProductionStage) {
  const productions = getProductions().map((p) => (p.id === id ? { ...p, stage } : p))
  write(KEYS.productions, productions)
}

export function toggleDeliverable(productionId: string, deliverableId: string) {
  const productions = getProductions().map((p) => {
    if (p.id !== productionId) return p
    return {
      ...p,
      deliverables: p.deliverables.map((d) =>
        d.id === deliverableId ? { ...d, approved: !d.approved } : d,
      ),
    }
  })
  write(KEYS.productions, productions)
}

export function getAgencyById(id: string | null): Agency | undefined {
  if (!id) return undefined
  return getAgencies().find((a) => a.id === id)
}

export function getCrewByIds(ids: string[]): CrewMember[] {
  const all = getCrew()
  return ids.map((id) => all.find((c) => c.id === id)).filter(Boolean) as CrewMember[]
}

// Leads — reuses the same store the public /contact form writes to, so a
// real enquiry submitted on the live site shows up here immediately.
export { listLeads, updateLeadStage }
export type { Lead }

export function convertLeadToProduction(lead: Lead): Production {
  const productions = getProductions()
  const newProd: Production = {
    id: `lead-${lead.id}`,
    title: `${lead.company || lead.name} — new enquiry`,
    client: lead.company || lead.name,
    agencyId: null,
    director: 'Shahrear Polock',
    year: String(new Date().getFullYear()),
    stage: 'brief',
    budgetBand: '< ৳3L',
    shootDate: null,
    deliverables: [{ id: `${lead.id}-d0`, label: 'Scope TBD', approved: false }],
    isRealFilm: false,
    crewIds: ['cr-polock'],
    notes: `Converted from enquiry: "${lead.message}"`,
  }
  write(KEYS.productions, [newProd, ...productions])
  updateLeadStage(lead.id, 'converted')
  return newProd
}

// Dashboard aggregates
export function dashboardSummary() {
  const productions = getProductions()
  const leads = listLeads()
  const activeStages: ProductionStage[] = [
    'brief', 'ppm', 'recce', 'casting', 'shoot', 'offline', 'online_grade', 'mix', 'delivery',
  ]
  const inFlight = productions.filter((p) => activeStages.includes(p.stage))
  const overdueDeliverables = productions.reduce(
    (n, p) => n + p.deliverables.filter((d) => !d.approved).length,
    0,
  )
  const thisWeekShoots = productions.filter((p) => {
    if (!p.shootDate) return false
    const d = new Date(p.shootDate)
    const now = new Date()
    const in7 = new Date()
    in7.setDate(now.getDate() + 7)
    return d >= now && d <= in7
  })
  return {
    inFlightCount: inFlight.length,
    overdueDeliverables,
    thisWeekShoots,
    newLeads: leads.filter((l) => l.stage === 'new').length,
  }
}
