import { createFileRoute, notFound } from '@tanstack/react-router'
import { featuredFilm } from '#/data/films'
import { useScrollReveal } from '#/hooks/useScrollReveal'

export const Route = createFileRoute('/films/$slug')({
  loader: ({ params }) => {
    if (params.slug !== featuredFilm.slug) throw notFound()
    return featuredFilm
  },
  component: FeaturedFilmPage,
})

function FeaturedFilmPage() {
  const film = Route.useLoaderData()
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="relative w-full h-[100svh] min-h-[560px] flex items-end" style={{ background: 'var(--ink)' }}>
        <img
          src="/img/hero/bbrk-atmosphere.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.6)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(14,13,11,0.2) 0%, rgba(14,13,11,0.9) 85%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 90% at 50% 100%, rgba(157,45,25,0.18), transparent 60%)' }} />
        <div className="relative max-w-[1600px] mx-auto px-5 sm:px-8 pb-16 sm:pb-24 w-full">
          <div data-reveal className="t-slate mb-6" style={{ color: 'var(--korobi)' }}>
            {film.production} · {film.genre}
          </div>
          <h1 data-reveal className="t-bangla" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', lineHeight: 0.95, color: 'var(--text-1)' }}>
            {film.titleBangla}
          </h1>
          <p data-reveal className="t-h2 mt-4" style={{ color: 'var(--text-2)', fontWeight: 400 }}>
            {film.tagline}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-8 py-24 sm:py-32">
        <div className="grid sm:grid-cols-[1fr_1.4fr] gap-10 sm:gap-20">
          <div data-reveal>
            <div className="t-slate mb-4" style={{ color: 'var(--text-4)' }}>
              The story
            </div>
          </div>
          <div data-reveal className="t-body max-w-[62ch]" style={{ color: 'var(--text-2)' }}>
            <p>
              Somewhere beneath silence, beneath forgotten memories, something still waits. In a
              village the maps have forgotten, a girl hears a voice her grandmother once buried.
              The wind carries a name that should never have returned.
            </p>
            <p className="mt-5">
              Some stories arrive as rumors. This one arrives as a wound — slowly, then all at
              once, blooming red where love once slept. Shot across the {film.locations}.
            </p>
          </div>
        </div>
      </section>

      {/* Characters */}
      <section className="py-24 sm:py-32" style={{ borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8">
          <div data-reveal className="t-slate mb-10" style={{ color: 'var(--text-4)' }}>
            Those who remember
          </div>
          <div className="grid sm:grid-cols-4 gap-10 sm:gap-8">
            {film.characters.map((c) => (
              <div key={c.name} data-reveal>
                <div className="t-bangla" style={{ fontSize: '2rem', color: 'var(--text-4)' }}>
                  {c.nameBangla}
                </div>
                <div className="t-h2 mt-2" style={{ fontSize: '1.25rem', color: 'var(--text-1)' }}>
                  {c.name}
                </div>
                <p className="t-body mt-2" style={{ color: 'var(--text-3)' }}>
                  {c.line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Director's vision */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-8 py-24 sm:py-32">
        <div className="grid sm:grid-cols-2 gap-10 sm:gap-16 items-start">
          <div data-reveal>
            <div className="t-slate mb-4" style={{ color: 'var(--text-4)' }}>
              Director&rsquo;s vision
            </div>
            <div className="t-h2" style={{ color: 'var(--text-1)' }}>
              {film.director}
            </div>
            <div className="t-bangla mt-1" style={{ color: 'var(--text-4)', fontSize: '1.125rem' }}>
              {film.directorBangla}
            </div>
          </div>
          <div data-reveal>
            <p className="t-body italic" style={{ color: 'var(--text-2)' }}>
              &ldquo;I wanted to make a film that lingers — the way the smell of wet earth stays on
              your skin long after the rain has left.&rdquo;
            </p>
            <p className="t-body mt-5" style={{ color: 'var(--text-3)' }}>
              A story built from silence, memory, and the language of things left unsaid in
              Bangladeshi households. Inspired by Tarkovsky, Apichatpong Weerasethakul, Bengali folk
              mourning songs, The Witch, Ari Aster, monsoons that refuse to end.
            </p>
          </div>
        </div>
      </section>

      {/* Full experience CTA */}
      <section style={{ borderTop: '1px solid var(--rule)' }}>
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 py-24 sm:py-32 text-center">
          <div data-reveal>
            <h2 className="t-h1" style={{ color: 'var(--text-1)' }}>
              Enter the full experience
            </h2>
            <p className="t-body mt-4" style={{ color: 'var(--text-3)' }}>
              The immersive teaser site — character profiles, production timeline, sound on.
            </p>
            <a
              href={film.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="t-slate-lg mt-8 inline-flex items-center gap-2"
              style={{ color: 'var(--korobi)' }}
            >
              bbrkmovie.com →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
