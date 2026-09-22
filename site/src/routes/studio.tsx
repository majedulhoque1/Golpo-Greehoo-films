import { createFileRoute } from '@tanstack/react-router'
import { useScrollReveal } from '#/hooks/useScrollReveal'

export const Route = createFileRoute('/studio')({ component: StudioPage })

const SERVICES = [
  { n: '01', title: 'TVC & OVC', body: 'Brand films built for broadcast and social, from brief to broadcast master.' },
  { n: '02', title: 'Direction', body: 'Concept, script and on-set direction — narrative, musical, or documentary.' },
  { n: '03', title: 'Post & VFX', body: 'Grade, sound design and compositing, in-house through delivery.' },
  { n: '04', title: 'Feature film', body: 'Independent narrative work, as with Bokuler Buke Rokto Korobi.' },
]

function StudioPage() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div ref={ref}>
      <section className="max-w-[1600px] mx-auto px-5 sm:px-8 pt-32 sm:pt-40 pb-20 sm:pb-28">
        <div data-reveal className="t-slate mb-6" style={{ color: 'var(--text-4)' }}>
          Studio
        </div>
        <h1 data-reveal className="t-display max-w-[16ch]" style={{ color: 'var(--text-1)' }}>
          Battle for tales.
        </h1>
        <p data-reveal className="t-body mt-8 max-w-[56ch]" style={{ color: 'var(--text-3)' }}>
          Golpo Greehoo Films is a Dhaka production house directed by Shahrear Polock — TVC,
          brand film, and independent narrative work, for agencies including Bitopi, Grey and
          Bread &amp; Butter.
        </p>
      </section>

      {/* Director */}
      <section className="py-20 sm:py-28" style={{ borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 grid sm:grid-cols-[1fr_1.6fr] gap-10 sm:gap-20">
          <div data-reveal>
            <div className="t-slate mb-4" style={{ color: 'var(--text-4)' }}>
              Director
            </div>
            <h2 className="t-h1" style={{ color: 'var(--text-1)' }}>
              Shahrear Polock
            </h2>
          </div>
          <div data-reveal className="t-body max-w-[62ch]" style={{ color: 'var(--text-2)' }}>
            <p>
              Beyond commercial work, Polock directed{' '}
              <em style={{ color: 'var(--text-1)' }}>Dure Thaka Kacher Manush</em>, an Indo-Bangla
              lockdown short produced with TVwala Media (Kolkata), starring Rafiath Rashid Mithila
              and Vikram Chatterjee — the cast and crew waived their fees to support daily-wage
              film workers in both cities.
            </p>
            <p className="mt-5">
              His music-video work includes collaborations with Asha Bhosle, Hariharan, Anupam Roy
              and Madhubanti Bagchi. His current feature, Bokuler Buke Rokto Korobi, was shot
              across the Sundarbans and Barisal.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <div data-reveal className="t-slate mb-10" style={{ color: 'var(--text-4)' }}>
          What we make
        </div>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-12">
          {SERVICES.map((s) => (
            <div key={s.n} data-reveal className="flex gap-6" style={{ borderTop: '1px solid var(--rule)', paddingTop: '1.5rem' }}>
              <span className="t-slate-lg" style={{ color: 'var(--korobi)' }}>
                {s.n}
              </span>
              <div>
                <h3 className="t-h2" style={{ fontSize: '1.375rem', color: 'var(--text-1)' }}>
                  {s.title}
                </h3>
                <p className="t-body mt-2 max-w-[42ch]" style={{ color: 'var(--text-3)' }}>
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
