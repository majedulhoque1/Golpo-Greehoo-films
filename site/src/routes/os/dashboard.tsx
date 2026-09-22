import { createFileRoute, Link } from '@tanstack/react-router'
import { dashboardSummary, getProductions, listLeads } from '#/os/store'
import { OsCard, OsLabel, OsStat } from '#/os/OsShell'
import { STAGES } from '#/os/types'

export const Route = createFileRoute('/os/dashboard')({ component: DashboardPage })

function DashboardPage() {
  const summary = dashboardSummary()
  const productions = getProductions()
  const leads = listLeads().slice(0, 5)

  const byStage = STAGES.map((s) => ({
    ...s,
    count: productions.filter((p) => p.stage === s.key).length,
  }))

  return (
    <div>
      <OsLabel>Studio OS</OsLabel>
      <h1 className="text-[24px] mb-8" style={{ color: '#f0f0f1' }}>
        Dashboard
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <OsStat label="Jobs in flight" value={summary.inFlightCount} />
        <OsStat label="Shoots this week" value={summary.thisWeekShoots.length} />
        <OsStat label="Deliverables pending" value={summary.overdueDeliverables} />
        <OsStat label="New enquiries" value={summary.newLeads} />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <OsCard>
          <OsLabel>Pipeline by stage</OsLabel>
          <div className="flex flex-col gap-2 mt-3">
            {byStage.map((s) => (
              <div key={s.key} className="flex items-center gap-3">
                <div className="text-[12px] w-28 shrink-0" style={{ color: '#9a9a9e' }}>
                  {s.label}
                </div>
                <div className="flex-1 h-4 rounded-sm overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div
                    className="h-full"
                    style={{
                      width: `${Math.max(4, (s.count / Math.max(1, productions.length)) * 100)}%`,
                      background: s.key === 'delivered' ? 'rgba(255,255,255,0.18)' : '#9d2d19',
                    }}
                  />
                </div>
                <div className="text-[12px] w-5 text-right tabular" style={{ color: '#d6d6d8' }}>
                  {s.count}
                </div>
              </div>
            ))}
          </div>
        </OsCard>

        <OsCard>
          <OsLabel>This week&rsquo;s shoots</OsLabel>
          <div className="flex flex-col gap-3 mt-3">
            {summary.thisWeekShoots.length === 0 && (
              <div className="text-[12px]" style={{ color: '#6a6a6e' }}>
                Nothing scheduled in the next 7 days.
              </div>
            )}
            {summary.thisWeekShoots.map((p) => (
              <Link
                key={p.id}
                to="/os/productions/$id"
                params={{ id: p.id }}
                className="flex items-center justify-between text-[13px]"
              >
                <span style={{ color: '#f0f0f1' }}>{p.title}</span>
                <span className="tabular" style={{ color: '#6a6a6e' }}>
                  {p.shootDate}
                </span>
              </Link>
            ))}
          </div>
        </OsCard>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mt-6">
        <OsCard>
          <OsLabel>Recent enquiries</OsLabel>
          <div className="flex flex-col gap-3 mt-3">
            {leads.length === 0 && (
              <div className="text-[12px]" style={{ color: '#6a6a6e' }}>
                No enquiries yet — submit the public /contact form to see one appear here live.
              </div>
            )}
            {leads.map((l) => (
              <div key={l.id} className="text-[13px]">
                <div style={{ color: '#f0f0f1' }}>
                  {l.name} {l.company ? `· ${l.company}` : ''}
                </div>
                <div className="text-[12px] truncate" style={{ color: '#6a6a6e' }}>
                  {l.message}
                </div>
              </div>
            ))}
          </div>
          <Link to="/os/clients" className="text-[12px] mt-4 inline-block" style={{ color: '#e08a6f' }}>
            View all →
          </Link>
        </OsCard>

        <OsCard>
          <OsLabel>Overdue deliverables</OsLabel>
          <div className="flex flex-col gap-3 mt-3">
            {productions
              .filter((p) => p.deliverables.some((d) => !d.approved) && p.stage !== 'brief')
              .slice(0, 5)
              .map((p) => (
                <Link key={p.id} to="/os/productions/$id" params={{ id: p.id }} className="flex items-center justify-between text-[13px]">
                  <span style={{ color: '#f0f0f1' }}>{p.title}</span>
                  <span className="tabular" style={{ color: '#e08a6f' }}>
                    {p.deliverables.filter((d) => !d.approved).length} pending
                  </span>
                </Link>
              ))}
          </div>
        </OsCard>
      </div>
    </div>
  )
}
