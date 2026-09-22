import { createFileRoute } from '@tanstack/react-router'
import { WorkGrid } from '#/components/WorkGrid'

export const Route = createFileRoute('/work/')({ component: WorkPage })

function WorkPage() {
  return (
    <div>
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 pt-32 sm:pt-40 pb-4">
        <div className="t-slate mb-4" style={{ color: 'var(--text-4)' }}>
          Work — 2025 · 2026
        </div>
        <h1 className="t-display" style={{ color: 'var(--text-1)' }}>
          Selected films.
        </h1>
        <p className="t-body mt-5 max-w-[52ch]" style={{ color: 'var(--text-3)' }}>
          Fourteen productions, directed by Shahrear Polock. Commissioned by Bitopi, Grey, Bread &amp;
          Butter, Salt Creatives, Carrot Com, Sun Communication and Cocktail Limited.
        </p>
      </div>
      <WorkGrid />
    </div>
  )
}
