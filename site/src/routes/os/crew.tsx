import { createFileRoute } from '@tanstack/react-router'
import { getCrew, getProductions } from '#/os/store'
import { OsCard, OsLabel } from '#/os/OsShell'
import { STAGES } from '#/os/types'

export const Route = createFileRoute('/os/crew')({ component: CrewPage })

const ACTIVE_STAGES = new Set(STAGES.slice(0, -1).map((s) => s.key)) // everything but 'delivered'

function CrewPage() {
  const crew = getCrew()
  const productions = getProductions()

  return (
    <div>
      <OsLabel>Studio OS</OsLabel>
      <h1 className="text-[24px] mb-8" style={{ color: '#f0f0f1' }}>
        Crew
      </h1>

      <div className="grid sm:grid-cols-2 gap-4">
        {crew.map((c) => {
          const assigned = productions.filter((p) => p.crewIds.includes(c.id) && ACTIVE_STAGES.has(p.stage))
          return (
            <OsCard key={c.id}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[14px]" style={{ color: '#f0f0f1' }}>
                    {c.name}
                  </div>
                  <div className="text-[12px] mt-0.5" style={{ color: '#8a8a8f' }}>
                    {c.role}
                  </div>
                </div>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-sm"
                  style={{
                    background: assigned.length > 0 ? 'rgba(157,45,25,0.16)' : 'rgba(255,255,255,0.05)',
                    color: assigned.length > 0 ? '#e08a6f' : '#6a6a6e',
                  }}
                >
                  {assigned.length > 0 ? `On ${assigned.length} job${assigned.length > 1 ? 's' : ''}` : 'Available'}
                </span>
              </div>
              {assigned.length > 0 && (
                <div className="flex flex-col gap-1 mt-3">
                  {assigned.map((p) => (
                    <div key={p.id} className="text-[12px]" style={{ color: '#6a6a6e' }}>
                      {p.title}
                    </div>
                  ))}
                </div>
              )}
            </OsCard>
          )
        })}
      </div>
    </div>
  )
}
