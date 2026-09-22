import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { getAgencyById, getProductions } from '#/os/store'
import { OsLabel } from '#/os/OsShell'
import { STAGES, type Production, type ProductionStage } from '#/os/types'

export const Route = createFileRoute('/os/productions/')({ component: ProductionsPage })

type StageFilter = ProductionStage | 'all'

function ProductionsPage() {
  const productions = getProductions()
  const [stageFilter, setStageFilter] = useState<StageFilter>('all')
  const inFlight = productions.filter((production) => production.stage !== 'delivered')
  const awaitingReview = inFlight.filter((production) => production.deliverables.some((item) => !item.approved))
  const shooting = inFlight.filter((production) => production.stage === 'shoot')
  const visibleJobs = productions
    .filter((production) => stageFilter === 'all' || production.stage === stageFilter)
    .sort((a, b) => {
      if (a.stage === 'delivered') return 1
      if (b.stage === 'delivered') return -1
      return STAGES.findIndex((stage) => stage.key === a.stage) - STAGES.findIndex((stage) => stage.key === b.stage)
    })

  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-10">
        <div>
          <OsLabel>Studio OS / Production control</OsLabel>
          <h1 className="text-[27px] leading-none mt-2" style={{ color: '#f0f0f1' }}>
            Jobs
          </h1>
          <p className="text-[12px] mt-3" style={{ color: '#8a8a8f' }}>
            Track every production from brief through delivery.
          </p>
        </div>
        <div className="text-[10px] uppercase tracking-[0.12em]" style={{ color: '#6a6a6e' }}>
          {productions.length} total productions
        </div>
      </div>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8 sm:mb-10">
        <OverviewCard label="In flight" value={inFlight.length} note="Currently moving" />
        <OverviewCard label="Awaiting review" value={awaitingReview.length} note="With open deliverables" accent="#e08a6f" />
        <OverviewCard label="On shoot" value={shooting.length} note="Production days" accent="#d8b178" />
        <OverviewCard label="Delivered" value={productions.length - inFlight.length} note="Closed productions" accent="#8cb08f" />
      </section>

      <section className="mb-6">
        <div className="flex items-center justify-between gap-4 mb-3">
          <OsLabel>Pipeline</OsLabel>
          <span className="text-[11px] tabular" style={{ color: '#6a6a6e' }}>
            {visibleJobs.length} shown
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0" style={{ scrollbarWidth: 'none' }}>
          <StageFilterButton active={stageFilter === 'all'} label="All work" count={productions.length} onClick={() => setStageFilter('all')} />
          {STAGES.map((stage) => (
            <StageFilterButton
              key={stage.key}
              active={stageFilter === stage.key}
              label={stage.label}
              count={productions.filter((production) => production.stage === stage.key).length}
              tone={stageTone(stage.key)}
              onClick={() => setStageFilter(stage.key)}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {visibleJobs.map((production) => (
            <JobCard key={production.id} production={production} />
          ))}
        </div>
        {visibleJobs.length === 0 && (
          <div className="py-16 text-center text-[13px]" style={{ color: '#6a6a6e', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            No jobs are in this stage right now.
          </div>
        )}
      </section>
    </div>
  )
}

function OverviewCard({ label, value, note, accent = '#f0f0f1' }: { label: string; value: number; note: string; accent?: string }) {
  return (
    <div className="p-4 sm:p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="text-[10px] uppercase tracking-[0.12em]" style={{ color: '#6a6a6e' }}>
        {label}
      </div>
      <div className="text-[30px] leading-none mt-3 tabular" style={{ color: accent }}>
        {value}
      </div>
      <div className="text-[11px] mt-2" style={{ color: '#8a8a8f' }}>
        {note}
      </div>
    </div>
  )
}

function StageFilterButton({ active, label, count, onClick, tone = '#9a9a9e' }: { active: boolean; label: string; count: number; onClick: () => void; tone?: string }) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 flex items-center gap-2 text-[11px] px-3 py-2 rounded-full whitespace-nowrap transition-colors"
      style={{
        background: active ? 'rgba(157,45,25,0.2)' : 'rgba(255,255,255,0.035)',
        color: active ? '#f0f0f1' : tone,
        border: `1px solid ${active ? 'rgba(224,138,111,0.55)' : 'rgba(255,255,255,0.08)'}`,
      }}
    >
      {label} <span className="tabular opacity-60">{count}</span>
    </button>
  )
}

function JobCard({ production }: { production: Production }) {
  const agency = getAgencyById(production.agencyId)
  const pending = production.deliverables.filter((item) => !item.approved).length
  const complete = production.deliverables.length - pending
  const progress = production.deliverables.length ? (complete / production.deliverables.length) * 100 : 0
  const tone = stageTone(production.stage)
  const stage = STAGES.find((item) => item.key === production.stage)

  return (
    <Link
      to="/os/productions/$id"
      params={{ id: production.id }}
      className="group block p-4 sm:p-5 transition-colors"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="text-[10px] uppercase tracking-[0.1em] px-2 py-1" style={{ color: tone, background: `${tone}18`, border: `1px solid ${tone}36` }}>
          {stage?.label}
        </div>
        <span className="text-[11px] transition-transform duration-200 group-hover:translate-x-1" style={{ color: '#6a6a6e' }}>
          →
        </span>
      </div>

      <h2 className="text-[15px] leading-snug mt-5 pr-5" style={{ color: '#f0f0f1' }}>
        {production.title}
      </h2>
      <p className="text-[12px] mt-2 truncate" style={{ color: '#9a9a9e' }}>
        {production.client}{agency ? ` · ${agency.name}` : ''}
      </p>

      <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex items-center justify-between gap-3 text-[11px]" style={{ color: '#8a8a8f' }}>
          <span>{production.shootDate ? `Shoot ${formatDate(production.shootDate)}` : 'Date not set'}</span>
          <span className="tabular">{complete}/{production.deliverables.length} approved</span>
        </div>
        <div className="h-px mt-3 overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <div className="h-full" style={{ width: `${progress}%`, background: tone }} />
        </div>
        <p className="text-[11px] mt-3" style={{ color: pending ? '#e08a6f' : '#8cb08f' }}>
          {pending ? `${pending} deliverable${pending === 1 ? '' : 's'} awaiting approval` : 'All deliverables approved'}
        </p>
      </div>
    </Link>
  )
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short' }).format(new Date(`${value}T12:00:00`))
}

function stageTone(stage: ProductionStage) {
  if (['brief', 'ppm', 'recce', 'casting'].includes(stage)) return '#d8b178'
  if (stage === 'shoot') return '#e08a6f'
  if (['offline', 'online_grade', 'mix', 'delivery'].includes(stage)) return '#8caac9'
  return '#8cb08f'
}
