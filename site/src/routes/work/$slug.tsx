import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { getFilmBySlug, films } from '#/data/films'
import { VideoLightbox } from '#/components/VideoLightbox'
import { FilmCard } from '#/components/FilmCard'

export const Route = createFileRoute('/work/$slug')({
  loader: ({ params }) => {
    const film = getFilmBySlug(params.slug)
    if (!film) throw notFound()
    return film
  },
  component: FilmPage,
})

function FilmPage() {
  const film = Route.useLoaderData()
  const more = films.filter((f) => f.slug !== film.slug).slice(0, 3)

  return (
    <div>
      {/* Frame — full-bleed still, Tier 1 */}
      <div className="relative w-full h-[70svh] min-h-[420px] overflow-hidden" style={{ background: 'var(--ink)' }}>
        <img src={film.image} alt={film.title} className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.7)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(14,13,11,0.1) 30%, rgba(14,13,11,0.85) 100%)' }} />
        <div className="relative h-full flex flex-col justify-end max-w-[1600px] mx-auto px-5 sm:px-8 pb-10 sm:pb-14">
          <Link to="/work" className="t-slate mb-6" style={{ color: 'var(--text-3)' }}>
            ← All work
          </Link>
          <h1 className="t-h1 max-w-[20ch]" style={{ color: 'var(--text-1)' }}>
            {film.title}
          </h1>
        </div>
      </div>

      {/* Slate — Tier 3 */}
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 py-10 sm:py-14" style={{ borderBottom: '1px solid var(--rule)' }}>
        <div className="flex flex-wrap gap-x-10 gap-y-4 t-slate-lg" style={{ color: 'var(--text-2)' }}>
          <Slate label="Client" value={film.client} />
          {film.agency && <Slate label="Agency" value={film.agency} />}
          <Slate label="Director" value={film.director} />
          <Slate label="Year" value={film.year} />
          <Slate label="Duration" value={film.duration} />
        </div>

        {film.note && (
          <p className="t-body mt-8 max-w-[60ch]" style={{ color: 'var(--text-3)' }}>
            {film.note}
          </p>
        )}

        {film.deliverables && (
          <div className="mt-8">
            <div className="t-slate mb-3" style={{ color: 'var(--text-4)' }}>
              Deliverables in this campaign
            </div>
            <div className="flex flex-wrap gap-2">
              {film.deliverables.map((d) => (
                <span
                  key={d}
                  className="t-slate px-3 py-1.5"
                  style={{ border: '1px solid var(--rule-strong)', color: 'var(--text-2)' }}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          <VideoLightbox youtubeId={film.youtubeId} title={film.title} />
        </div>
      </div>

      {/* More work */}
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <div className="t-slate mb-8" style={{ color: 'var(--text-4)' }}>
          More work
        </div>
        <div className="grid sm:grid-cols-3 gap-8 sm:gap-6">
          {more.map((f) => (
            <FilmCard key={f.slug} film={f} />
          ))}
        </div>
      </div>
    </div>
  )
}

function Slate({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span style={{ color: 'var(--text-4)' }}>{label}</span>
      <span className="mx-2" style={{ color: 'var(--text-4)' }}>
        ·
      </span>
      <span style={{ color: 'var(--text-1)' }}>{value}</span>
    </div>
  )
}
