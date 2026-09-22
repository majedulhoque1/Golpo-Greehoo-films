import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { getAgencies, getProductions, listLeads, convertLeadToProduction, updateLeadStage } from '#/os/store'
import { OsCard, OsLabel } from '#/os/OsShell'

export const Route = createFileRoute('/os/clients/')({ component: ClientsPage })

function ClientsPage() {
  const agencies = getAgencies()
  const productions = getProductions()
  const leads = listLeads()
  const router = useRouter()

  const onConvert = (leadId: string) => {
    const lead = listLeads().find((l) => l.id === leadId)
    if (!lead) return
    const prod = convertLeadToProduction(lead)
    router.navigate({ to: '/os/productions/$id', params: { id: prod.id } })
  }

  return (
    <div>
      <OsLabel>Studio OS</OsLabel>
      <h1 className="text-[24px] mb-8" style={{ color: '#f0f0f1' }}>
        Clients &amp; Leads
      </h1>

      <div className="mb-10">
        <OsLabel>Agencies</OsLabel>
        <div className="grid sm:grid-cols-3 gap-4 mt-3">
          {agencies.map((a) => {
            const jobs = productions.filter((p) => p.agencyId === a.id)
            return (
              <OsCard key={a.id}>
                <div className="flex items-center justify-between">
                  <span className="text-[14px]" style={{ color: '#f0f0f1' }}>
                    {a.name}
                  </span>
                  <span className="text-[11px] tabular" style={{ color: '#6a6a6e' }}>
                    {jobs.length} job{jobs.length === 1 ? '' : 's'}
                  </span>
                </div>
                <div className="text-[11px] mt-2" style={{ color: '#5a5a5e' }}>
                  {a.contactName} (demo contact)
                </div>
              </OsCard>
            )
          })}
        </div>
      </div>

      <div>
        <OsLabel>Inbound leads</OsLabel>
        <div className="flex flex-col gap-2 mt-3">
          {leads.length === 0 && (
            <OsCard>
              <div className="text-[13px]" style={{ color: '#6a6a6e' }}>
                No enquiries yet. Submit the public{' '}
                <Link to="/contact" className="underline">
                  /contact
                </Link>{' '}
                form to see a real lead land here.
              </div>
            </OsCard>
          )}
          {leads.map((l) => (
            <OsCard key={l.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[13px]" style={{ color: '#f0f0f1' }}>
                    {l.name} {l.company ? `· ${l.company}` : ''}
                  </div>
                  <div className="text-[12px] mt-1" style={{ color: '#8a8a8f' }}>
                    {l.email}
                    {l.phone ? ` · ${l.phone}` : ''}
                  </div>
                  <div className="text-[12px] mt-2" style={{ color: '#6a6a6e' }}>
                    {l.message}
                  </div>
                  <div className="text-[10px] mt-2 tabular" style={{ color: '#5a5a5e' }}>
                    {new Date(l.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-wide"
                    style={{
                      background: l.stage === 'converted' ? 'rgba(255,255,255,0.08)' : 'rgba(157,45,25,0.16)',
                      color: l.stage === 'converted' ? '#8a8a8f' : '#e08a6f',
                    }}
                  >
                    {l.stage}
                  </span>
                  {l.stage === 'new' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          updateLeadStage(l.id, 'contacted')
                          router.invalidate()
                        }}
                        className="text-[11px]"
                        style={{ color: '#8a8a8f' }}
                      >
                        Mark contacted
                      </button>
                      <button onClick={() => onConvert(l.id)} className="text-[11px]" style={{ color: '#e08a6f' }}>
                        Convert →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </OsCard>
          ))}
        </div>
      </div>
    </div>
  )
}
