// Golpo Greehoo Studio OS — data model.
// REAL: production titles/clients/agencies/years (from research/DOSSIER.md).
// SYNTHETIC, marked throughout the UI: agency contacts, budgets, dates, crew,
// leads. Budgets are bands, never precise figures — see the plan's honesty
// guardrails. Every mutation here mirrors one future Supabase RPC 1:1.

export type ProductionStage =
  | 'brief'
  | 'ppm'
  | 'recce'
  | 'casting'
  | 'shoot'
  | 'offline'
  | 'online_grade'
  | 'mix'
  | 'delivery'
  | 'delivered'

export const STAGES: { key: ProductionStage; label: string }[] = [
  { key: 'brief', label: 'Brief' },
  { key: 'ppm', label: 'PPM' },
  { key: 'recce', label: 'Recce' },
  { key: 'casting', label: 'Casting' },
  { key: 'shoot', label: 'Shoot' },
  { key: 'offline', label: 'Offline' },
  { key: 'online_grade', label: 'Online / Grade' },
  { key: 'mix', label: 'Mix' },
  { key: 'delivery', label: 'Delivery' },
  { key: 'delivered', label: 'Delivered' },
]

export type Deliverable = {
  id: string
  label: string // e.g. "30s cut", "9:16 social", "Sylhet regional"
  approved: boolean
}

export type Production = {
  id: string
  title: string
  client: string
  agencyId: string | null
  director: string
  year: string
  stage: ProductionStage
  budgetBand: '< ৳3L' | '৳3L–8L' | '৳8L–15L' | '৳15L+' // band only, never a figure
  shootDate: string | null // ISO date, business tz = Asia/Dhaka
  deliverables: Deliverable[]
  isRealFilm: boolean // true = verified in research/DOSSIER.md
  crewIds: string[]
  notes?: string
}

export type Agency = {
  id: string
  name: string
  isReal: boolean // agency NAME is real (from video credits); contact fields are synthetic
  contactName?: string
  contactEmail?: string
  jobsCount: number
}

export type CrewMember = {
  id: string
  name: string
  role: 'Director' | 'DOP' | 'Editor' | 'Colorist' | 'Sound' | 'Producer'
  isReal: boolean
}

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
