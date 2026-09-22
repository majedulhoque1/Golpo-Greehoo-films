import { createFileRoute, Link } from '@tanstack/react-router'
import { MaskedHero } from '#/components/MaskedHero'
import { FilmCard } from '#/components/FilmCard'
import { films, featuredFilm } from '#/data/films'
import { useScrollReveal } from '#/hooks/useScrollReveal'

export const Route = createFileRoute('/')({ component: Home })

const CLIENTS = [
  { name: 'Hero', mark: 'H' },
  { name: 'BSRM', mark: 'B' },
  { name: 'Airtel', mark: 'A' },
  { name: 'Apex', mark: 'AX' },
  { name: 'Amar bKash', mark: 'bK' },
  { name: 'BATA', mark: 'BA' },
  { name: 'ACI', mark: 'ACI' },
  { name: 'ICT Division', mark: 'ICT' },
  { name: 'MGI Fresh', mark: 'F' },
  { name: 'New Zealand Dairy', mark: 'NZ' },
]

function Home() {
  const selected = films.filter((f) =>
    ['fresh-premium-tea', 'hero-desh-bangladesh', 'apex-eid-anthem'].includes(f.slug),
  )
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div>
      <MaskedHero />

      <div ref={ref}>
        {/* Selected work */}
        <section className="max-w-[1600px] mx-auto px-5 sm:px-8 pt-24 sm:pt-32 pb-16">
          <div className="flex items-end justify-between mb-10" data-reveal>
            <h2 className="t-h1" style={{ color: 'var(--text-1)' }}>
              Selected work
            </h2>
            <Link to="/work" className="t-slate hidden sm:block" style={{ color: 'var(--text-3)' }}>
              All work →
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 sm:gap-6">
            {selected.map((f) => (
              <FilmCard key={f.slug} film={f} />
            ))}
          </div>
          <Link to="/work" className="t-slate mt-10 inline-block sm:hidden" style={{ color: 'var(--text-3)' }}>
            All work →
          </Link>
        </section>

        {/* Client wall */}
        <section
          className="py-16 sm:py-20"
          style={{ borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}
        >
          <div className="max-w-[1600px] mx-auto px-5 sm:px-8">
            <div data-reveal className="t-slate mb-8" style={{ color: 'var(--text-4)' }}>
              Trusted by
            </div>
            <div data-reveal className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {CLIENTS.map((client) => (
                <div
                  key={client.name}
                  className="flex items-center gap-3 px-4 py-3 min-h-[68px]"
                  style={{ border: '1px solid var(--rule)', background: 'rgb(255 255 255 / 0.015)' }}
                  aria-label={client.name}
                >
                  <span
                    className="flex items-center justify-center shrink-0 w-9 h-9 rounded-full t-slate"
                    style={{ border: '1px solid var(--rule-strong)', color: 'var(--korobi)', fontSize: '0.58rem', letterSpacing: '-0.02em' }}
                  >
                    {client.mark}
                  </span>
                  <span className="t-h2 leading-none" style={{ fontSize: '1rem', color: 'var(--text-2)' }}>
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The film */}
        <section className="max-w-[1600px] mx-auto px-5 sm:px-8 py-24 sm:py-32">
          <div className="grid sm:grid-cols-2 gap-10 sm:gap-16 items-center">
            <div data-reveal>
              <div className="t-slate mb-4" style={{ color: 'var(--korobi)' }}>
                Featured production
              </div>
              <h2 className="t-bangla" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--text-1)' }}>
                {featuredFilm.titleBangla}
              </h2>
              <p className="t-body mt-2" style={{ color: 'var(--text-2)' }}>
                {featuredFilm.title}
              </p>
              <p className="t-body mt-5 max-w-[48ch]" style={{ color: 'var(--text-3)' }}>
                {featuredFilm.tagline} A psychological horror feature shot across the Sundarbans
                and Barisal — {featuredFilm.production}.
              </p>
              <Link
                to="/films/$slug"
                params={{ slug: featuredFilm.slug }}
                className="t-slate-lg mt-8 inline-flex items-center gap-2"
                style={{ color: 'var(--text-1)' }}
              >
                Enter the story
                <span style={{ color: 'var(--korobi)' }}>→</span>
              </Link>
            </div>
            <div data-reveal className="relative overflow-hidden flex items-center justify-center" style={{ background: 'var(--ink-2)' }}>
              <img
                src={featuredFilm.posterAmbient}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'brightness(0.5)' }}
              />
              <img
                src={featuredFilm.poster}
                alt={`${featuredFilm.title} — official poster`}
                className="relative w-full max-w-[220px] sm:max-w-[260px] h-auto my-10"
                style={{ boxShadow: '0 24px 50px -18px rgba(0,0,0,0.6)' }}
              />
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section style={{ borderTop: '1px solid var(--rule)' }}>
          <div className="max-w-[1600px] mx-auto px-5 sm:px-8 py-24 sm:py-32">
            <div data-reveal>
              <h2 className="t-h1 max-w-[16ch]" style={{ color: 'var(--text-1)' }}>
                Have a story that needs a studio?
              </h2>
              <Link
                to="/contact"
                className="t-slate-lg mt-8 inline-flex items-center gap-2"
                style={{ color: 'var(--korobi)' }}
              >
                Start a conversation →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
