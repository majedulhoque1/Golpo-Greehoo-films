// Shared between the public /contact form and the Studio OS demo (Phase 4).
// This is a DEMO data layer — see the "Demo data" marker in the OS chrome.
// Every mutation here is written to mirror one future Supabase RPC 1:1
// (submit_enquiry), so swapping the backend later is a data-layer change only.

export type Lead = {
  id: string
  name: string
  company: string
  email: string
  phone?: string
  message: string
  createdAt: string
  stage: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
}

const KEY = 'ggf-os-leads-demo'

export function listLeads(): Lead[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Lead[]) : []
  } catch {
    return []
  }
}

export function submitEnquiry(input: {
  name: string
  company: string
  email: string
  phone?: string
  message: string
}): Lead {
  const lead: Lead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    ...input,
    createdAt: new Date().toISOString(),
    stage: 'new',
  }
  const leads = listLeads()
  leads.unshift(lead)
  try {
    window.localStorage.setItem(KEY, JSON.stringify(leads))
  } catch {
    // localStorage unavailable (private mode, etc.) — the WhatsApp message
    // is the real delivery path regardless, so this failing silently is fine.
  }
  return lead
}

export function updateLeadStage(id: string, stage: Lead['stage']) {
  const leads = listLeads().map((l) => (l.id === id ? { ...l, stage } : l))
  try {
    window.localStorage.setItem(KEY, JSON.stringify(leads))
  } catch {
    /* noop */
  }
}
