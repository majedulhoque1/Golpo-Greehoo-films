import { createFileRoute, Link, notFound, useRouter } from '@tanstack/react-router'
import { getProduction, getAgencyById, getCrewByIds, setProductionStage, toggleDeliverable } from '#/os/store'
import { OsCard, OsLabel } from '#/os/OsShell'
import { STAGES, type ProductionStage } from '#/os/types'

export const Route = createFileRoute('/os/productions/$id')({
  loader: ({ params }) => {
    const p = getProduction(params.id)
    if (!p) throw notFound()
    return p
  },
  component: ProductionDetail,
})

function ProductionDetail() {
  const production = Route.useLoaderData()
  const router = useRouter()
  const agency = getAgencyById(production.agencyId)
  const crew = getCrewByIds(production.crewIds)

  const onStageChange = (stage: ProductionStage) => {
    setProductionStage(production.id, stage)
    router.invalidate()
  }

  const onToggleDeliverable = (deliverableId: string) => {
    toggleDeliverable(production.id, deliverableId)
    router.invalidate()
  }

  const approvedCount = production.deliverables.filter((d) => d.approved).length

  return (
    <div>
      <Link to="/os/productions" className="text-[12px]" style={{ color: '#6a6a6e' }}>
        ← Productions
      </Link>

      <div className="flex items-start justify-between mt-4 mb-8">
        <div>
          <OsLabel>
            {production.client}
            {agency ? ` · ${agency.name}` : ''} · {production.year}
          </OsLabel>
          <h1 className="text-[24px]" style={{ color: '#f0f0f1' }}>
            {production.title}
          </h1>
          {!production.isRealFilm && (
            <span
              className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded-sm"
              style={{ background: 'rgba(157,45,25,0.16)', color: '#e08a6f' }}
            >
              DEMO DATA
            </span>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        <div className="sm:col-span-2 flex flex-col gap-6">
          <OsCard>
            <OsLabel>Stage</OsLabel>
            <div className="flex flex-wrap gap-2 mt-3">
              {STAGES.map((s) => (
                <button
                  key={s.key}
                  onClick={() => onStageChange(s.key)}
                  className="text-[12px] px-3 py-1.5 rounded-sm transition-colors duration-150"
                  style={{
                    background: production.stage === s.key ? '#9d2d19' : 'rgba(255,255,255,0.04)',
                    color: production.stage === s.key ? '#f5efe8' : '#9a9a9e',
                    border: '1px solid ' + (production.stage === s.key ? '#9d2d19' : 'rgba(255,255,255,0.08)'),
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </OsCard>

          <OsCard>
            <div className="flex items-center justify-between mb-3">
              <OsLabel>Deliverables</OsLabel>
              <span className="text-[11px] tabular" style={{ color: '#6a6a6e' }}>
                {approvedCount} / {production.deliverables.length} approved
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {production.deliverables.map((d) => (
                <label
                  key={d.id}
                  className="flex items-center gap-3 text-[13px] py-1.5 cursor-pointer"
                  style={{ color: d.approved ? '#6a6a6e' : '#f0f0f1' }}
                >
                  <input
                    type="checkbox"
                    checked={d.approved}
                    onChange={() => onToggleDeliverable(d.id)}
                    className="accent-[#9d2d19]"
                  />
                  <span style={{ textDecoration: d.approved ? 'line-through' : 'none' }}>{d.label}</span>
                </label>
              ))}
            </div>
          </OsCard>

          {production.notes && (
            <OsCard>
              <OsLabel>Notes</OsLabel>
              <p className="text-[13px] mt-2" style={{ color: '#d6d6d8' }}>
                {production.notes}
              </p>
            </OsCard>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <OsCard>
            <OsLabel>Details</OsLabel>
            <dl className="flex flex-col gap-3 mt-3 text-[13px]">
              <Row k="Director" v={production.director} />
              <Row k="Budget band" v={production.budgetBand} />
              <Row k="Shoot date" v={production.shootDate ?? '—'} />
            </dl>
          </OsCard>

          <OsCard>
            <OsLabel>Crew</OsLabel>
            <div className="flex flex-col gap-2 mt-3">
              {crew.map((c) => (
                <div key={c.id} className="flex items-center justify-between text-[13px]">
                  <span style={{ color: '#f0f0f1' }}>{c.name}</span>
                  <span style={{ color: '#6a6a6e' }}>{c.role}</span>
                </div>
              ))}
            </div>
          </OsCard>
        </div>
      </div>
    </div>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt style={{ color: '#6a6a6e' }}>{k}</dt>
      <dd className="tabular" style={{ color: '#f0f0f1' }}>
        {v}
      </dd>
    </div>
  )
}
