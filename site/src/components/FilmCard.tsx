import { Link } from '@tanstack/react-router'
import type { Film } from '#/data/films'

export function FilmCard({ film, aspect = 'video' }: { film: Film; aspect?: 'video' | 'tall' | 'wide' }) {
  const aspectClass =
    aspect === 'tall' ? 'aspect-[3/4]' : aspect === 'wide' ? 'aspect-[21/9]' : 'aspect-video'

  return (
    <Link to="/work/$slug" params={{ slug: film.slug }} className="group block" data-reveal>
      <div className={`relative overflow-hidden ${aspectClass}`} style={{ background: 'var(--ink-2)' }}>
        <img
          src={film.image}
          alt={film.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-[transform,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]"
          style={{ filter: 'brightness(0.92)' }}
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)' }}
        />
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <h3
          className="t-h2 leading-tight relative inline-block"
          style={{ fontSize: 'clamp(1rem, 1vw + 0.6rem, 1.375rem)', color: 'var(--text-1)' }}
        >
          {film.title}
          <span
            className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ background: 'var(--korobi)' }}
          />
        </h3>
      </div>
      <div className="t-slate mt-1.5">
        {film.client}
        {film.agency ? ` · ${film.agency}` : ''} · {film.year} · {film.duration}
      </div>
    </Link>
  )
}
