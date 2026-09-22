import { films } from '#/data/films'
import type { Agency, CrewMember, Production } from './types'

// Agencies — NAMES are real (from the studio's own video credits, see
// research/DOSSIER.md). Contact details are synthetic and clearly so.
export const seedAgencies: Agency[] = [
  { id: 'ag-bitopi', name: 'Bitopi', isReal: true, contactName: 'Agency contact (demo)', contactEmail: 'demo@example.com', jobsCount: 5 },
  { id: 'ag-grey', name: 'Grey', isReal: true, contactName: 'Agency contact (demo)', contactEmail: 'demo@example.com', jobsCount: 2 },
  { id: 'ag-breadbutter', name: 'Bread & Butter', isReal: true, contactName: 'Agency contact (demo)', contactEmail: 'demo@example.com', jobsCount: 3 },
  { id: 'ag-salt', name: 'Salt Creatives', isReal: true, contactName: 'Agency contact (demo)', contactEmail: 'demo@example.com', jobsCount: 1 },
  { id: 'ag-carrot', name: 'Carrot Com', isReal: true, contactName: 'Agency contact (demo)', contactEmail: 'demo@example.com', jobsCount: 1 },
  { id: 'ag-sun', name: 'Sun Communication', isReal: true, contactName: 'Agency contact (demo)', contactEmail: 'demo@example.com', jobsCount: 1 },
  { id: 'ag-cocktail', name: 'Cocktail Limited', isReal: true, contactName: 'Agency contact (demo)', contactEmail: 'demo@example.com', jobsCount: 2 },
]

const agencyIdByName: Record<string, string> = {
  Bitopi: 'ag-bitopi',
  Grey: 'ag-grey',
  'Bread & Butter': 'ag-breadbutter',
  'Salt Creatives': 'ag-salt',
  'Carrot Com': 'ag-carrot',
  'Sun Communication': 'ag-sun',
  'Cocktail Limited': 'ag-cocktail',
}

// Crew — Shahrear Polock (director) and Raju Raj (DOP, credited on BelleAme)
// are real, verified names. The rest are synthetic, clearly marked, to round
// out a plausible roster for the pipeline demo.
export const seedCrew: CrewMember[] = [
  { id: 'cr-polock', name: 'Shahrear Polock', role: 'Director', isReal: true },
  { id: 'cr-raju', name: 'Raju Raj', role: 'DOP', isReal: true },
  { id: 'cr-editor1', name: 'Editor (demo)', role: 'Editor', isReal: false },
  { id: 'cr-colorist1', name: 'Colorist (demo)', role: 'Colorist', isReal: false },
  { id: 'cr-sound1', name: 'Sound Designer (demo)', role: 'Sound', isReal: false },
  { id: 'cr-producer1', name: 'Line Producer (demo)', role: 'Producer', isReal: false },
]

// Deterministic pseudo-random stage/date assignment so the pipeline looks
// like a real week rather than everything sitting in one bucket.
const STAGE_CYCLE: Production['stage'][] = [
  'delivered', 'delivered', 'delivered', 'delivered', 'delivered',
  'mix', 'online_grade', 'offline', 'offline',
  'shoot', 'casting', 'recce', 'ppm', 'brief',
]
const BUDGET_CYCLE: Production['budgetBand'][] = ['< ৳3L', '৳3L–8L', '৳3L–8L', '৳8L–15L']

function pseudoDate(daysFromToday: number) {
  const d = new Date()
  d.setDate(d.getDate() + daysFromToday)
  return d.toISOString().slice(0, 10)
}

export function buildSeedProductions(): Production[] {
  return films.map((f, i) => {
    const stage = STAGE_CYCLE[i % STAGE_CYCLE.length]
    const isUpcoming = ['brief', 'ppm', 'recce', 'casting', 'shoot'].includes(stage)
    const dayOffset = isUpcoming ? (i % 5) + 1 : -((i % 20) + 3)
    const shootDateIso = pseudoDate(dayOffset)

    const deliverableLabels =
      f.deliverables && f.deliverables.length > 0
        ? f.deliverables.map((d) => `${d} regional cut`)
        : ['60s master', '30s cutdown', '15s cutdown', '9:16 social', '1:1 social']

    return {
      id: f.slug,
      title: f.title,
      client: f.client,
      agencyId: f.agency ? agencyIdByName[f.agency] ?? null : null,
      director: f.director,
      year: f.year,
      stage,
      budgetBand: BUDGET_CYCLE[i % BUDGET_CYCLE.length],
      shootDate: shootDateIso,
      deliverables: deliverableLabels.map((label, di) => ({
        id: `${f.slug}-d${di}`,
        label,
        approved: stage === 'delivered' || (stage === 'delivery' && di % 2 === 0),
      })),
      isRealFilm: true,
      crewIds:
        i % 3 === 0
          ? ['cr-polock', 'cr-raju', 'cr-editor1']
          : i % 3 === 1
            ? ['cr-polock', 'cr-editor1', 'cr-colorist1']
            : ['cr-polock', 'cr-raju', 'cr-sound1'],
    } satisfies Production
  })
}
