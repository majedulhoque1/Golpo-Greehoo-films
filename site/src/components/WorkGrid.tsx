import { films } from '#/data/films'
import { FilmCard } from './FilmCard'
import { useScrollReveal } from '#/hooks/useScrollReveal'

const bySlug = (slug: string) => films.find((f) => f.slug === slug)!

export function WorkGrid() {
  const ref = useScrollReveal<HTMLDivElement>()

  const row1 = ['fresh-premium-tea', 'hero-desh-bangladesh'].map(bySlug)
  const row2 = ['apex-eid-anthem', 'bsrm-thematic-70-years', 'airtel-regional-anthem-series'].map(bySlug)
  const row3 = ['belleame-biscuit', 'amar-bkash-shahosh', 'amar-bkash-ullikhito', 'asmar-golpo'].map(bySlug)
  const row4 = ['swapno-apon-shokti', 'wcit-thematic', 'fresh-khushi-chorai'].map(bySlug)
  const row5 = ['cholona-ek-sathe', 'bata-eid-2026'].map(bySlug)

  return (
    <div ref={ref} className="max-w-[1600px] mx-auto px-5 sm:px-8 py-20 sm:py-28 flex flex-col gap-16 sm:gap-24">
      {/* Row 1 — 2-up, full-bleed, tall */}
      <div className="grid sm:grid-cols-2 gap-8 sm:gap-6">
        {row1.map((f) => (
          <FilmCard key={f.slug} film={f} aspect="video" />
        ))}
      </div>

      {/* Row 2 — 3-up */}
      <div className="grid sm:grid-cols-3 gap-8 sm:gap-6">
        {row2.map((f) => (
          <FilmCard key={f.slug} film={f} aspect="video" />
        ))}
      </div>

      {/* Row 3 — 4-up, smaller rhythm */}
      <div className="grid sm:grid-cols-4 gap-8 sm:gap-5">
        {row3.map((f) => (
          <FilmCard key={f.slug} film={f} aspect="tall" />
        ))}
      </div>

      {/* Row 4 — 3-up */}
      <div className="grid sm:grid-cols-3 gap-8 sm:gap-6">
        {row4.map((f) => (
          <FilmCard key={f.slug} film={f} aspect="video" />
        ))}
      </div>

      {/* Row 5 — 2-up, closes into a CTA band */}
      <div className="grid sm:grid-cols-2 gap-8 sm:gap-6">
        {row5.map((f) => (
          <FilmCard key={f.slug} film={f} aspect="video" />
        ))}
      </div>

      <a
        href="https://www.youtube.com/@golpogreehoofilms"
        target="_blank"
        rel="noreferrer"
        data-reveal
        className="group flex items-center justify-between py-10 border-t"
        style={{ borderColor: 'var(--rule)' }}
      >
        <span className="t-h2" style={{ color: 'var(--text-1)' }}>
          Watch the full reel
        </span>
        <span
          className="t-slate-lg transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2"
          style={{ color: 'var(--korobi)' }}
        >
          YouTube →
        </span>
      </a>
    </div>
  )
}
