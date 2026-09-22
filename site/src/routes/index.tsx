import { createFileRoute, Link } from '@tanstack/react-router'
import { MaskedHero } from '#/components/MaskedHero'
import { FilmCard } from '#/components/FilmCard'
import { films, featuredFilm } from '#/data/films'
import { useScrollReveal } from '#/hooks/useScrollReveal'

export const Route = createFileRoute('/')({ component: Home })

const CLIENTS = [
  'Hero',
  'BSRM',
  'Airtel',
  'Apex',
  'Amar bKash',
  'BATA',
  'ACI',
  'ICT Division',
  'MGI Fresh',
  'New Zealand Dairy',
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
            <div data-reveal className="flex flex-wrap gap-x-10 gap-y-4">
              {CLIENTS.map((c) => (
                <span key={c} className="t-h2" style={{ fontSize: '1.25rem', color: 'var(--text-3)' }}>
                  {c}
                </span>
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
            <div data-reveal className="aspect-[4/5] relative overflow-hidden" style={{ background: 'var(--ink-2)' }}>
              <img
                src="/img/hero/bbrk-atmosphere.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'brightness(0.85)' }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(80% 60% at 50% 55%, rgba(157,45,25,0.12), rgba(14,13,11,0.6) 75%)' }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center t-bangla"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--korobi)', textShadow: '0 0 40px rgba(157,45,25,0.4)' }}
              >
                রক্তকরবী
              </div>
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
