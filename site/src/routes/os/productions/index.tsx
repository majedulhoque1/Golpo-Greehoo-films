import { createFileRoute, Link } from '@tanstack/react-router'
import { getProductions, getAgencyById } from '#/os/store'
import { OsLabel } from '#/os/OsShell'
import { STAGES } from '#/os/types'

export const Route = createFileRoute('/os/productions/')({ component: ProductionsPage })

function ProductionsPage() {
  const productions = getProductions()

  return (
    <div>
      <OsLabel>Studio OS</OsLabel>
      <h1 className="text-[24px] mb-8" style={{ color: '#f0f0f1' }}>
        Productions
      </h1>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const items = productions.filter((p) => p.stage === stage.key)
          return (
            <div key={stage.key} className="w-64 shrink-0">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[11px] uppercase tracking-wide" style={{ color: '#8a8a8f' }}>
                  {stage.label}
                </div>
                <div className="text-[11px] tabular" style={{ color: '#5a5a5e' }}>
                  {items.length}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {items.map((p) => {
                  const agency = getAgencyById(p.agencyId)
                  const pending = p.deliverables.filter((d) => !d.approved).length
                  return (
                    <Link
                      key={p.id}
                      to="/os/productions/$id"
                      params={{ id: p.id }}
                      className="block p-3 rounded-sm text-[12px]"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <div style={{ color: '#f0f0f1' }}>{p.title}</div>
                      <div className="mt-1.5" style={{ color: '#6a6a6e' }}>
                        {p.client}
                        {agency ? ` · ${agency.name}` : ''}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="tabular" style={{ color: '#5a5a5e' }}>
                          {p.budgetBand}
                        </span>
                        {pending > 0 && (
                          <span className="tabular" style={{ color: '#e08a6f' }}>
                            {pending} left
                          </span>
                        )}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
