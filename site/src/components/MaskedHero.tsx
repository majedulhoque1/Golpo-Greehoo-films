import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

/**
 * The signature moment: the studio's name, cut out of its own playing film.
 * background-clip:text over a muted looping video. Falls back to solid type
 * over a dimmed still frame where the mask isn't supported (older Safari/Android)
 * or reduced-motion is requested — that fallback is a complete hero on its own,
 * not a degraded one.
 */
export function MaskedHero() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [supportsMask, setSupportsMask] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)

    const supports =
      CSS?.supports?.('background-clip: text') || CSS?.supports?.('-webkit-background-clip: text')
    setSupportsMask(Boolean(supports))
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const label = root.querySelector<HTMLElement>('[data-hero-label]')
    const title = root.querySelector<HTMLElement>('[data-hero-title]')
    const sub = root.querySelector<HTMLElement>('[data-hero-sub]')
    const frame = root.querySelector<HTMLElement>('[data-hero-frame]')
    if (!label || !title || !sub || !frame) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set([frame, label, title, sub], { opacity: 1, y: 0 })
      return
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(frame, { opacity: 0 }, { opacity: 1, duration: 1.1 })
      .fromTo(label, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.6')
      .fromTo(title, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.15')
      .fromTo(sub, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
  }, [])

  const useVideo = supportsMask && !reduceMotion

  return (
    <section ref={rootRef} className="relative w-full h-[100svh] min-h-[560px] overflow-hidden" style={{ background: 'var(--ink)' }}>
      {/* Frame — Tier 1 */}
      <div data-hero-frame className="absolute inset-0">
        {reduceMotion || !supportsMask ? (
          <img
            src="/img/hero/hero-main.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.55)' }}
          />
        ) : (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/img/hero/hero-main.jpg"
          >
            <source src="/video/hero-loop.mp4" type="video/mp4" />
          </video>
        )}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(14,13,11,0.15) 0%, rgba(14,13,11,0.55) 100%)' }}
        />
      </div>

      {/* Title — Tier 2, masked over the frame when supported */}
      <div className="relative h-full flex flex-col items-start justify-end px-5 sm:px-8 pb-14 sm:pb-20 max-w-[1600px] mx-auto">
        <div data-hero-label className="t-slate mb-4" style={{ color: 'var(--text-2)' }}>
          Dhaka — Film &amp; TVC Studio — Est. work archive 2025
        </div>

        {useVideo ? (
          <h1
            data-hero-title
            className="t-bangla select-none"
            style={{
              fontSize: 'clamp(3.5rem, 14vw, 13rem)',
              lineHeight: 0.88,
              fontWeight: 700,
              letterSpacing: '-0.01em',
              backgroundImage: 'url(/img/hero/hero-main.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 18%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
              filter: 'brightness(1.6) saturate(1.15)',
            }}
          >
            গল্প গৃহ
          </h1>
        ) : (
          <h1 data-hero-title className="t-bangla" style={{ fontSize: 'clamp(3.5rem, 14vw, 13rem)', lineHeight: 0.88, fontWeight: 700, color: 'var(--text-1)' }}>
            গল্প গৃহ
          </h1>
        )}

        <p data-hero-sub className="t-body mt-6 max-w-[46ch]" style={{ color: 'var(--text-2)' }}>
          Golpo Greehoo Films — story house. A Dhaka production studio directed by{' '}
          <span style={{ color: 'var(--text-1)' }}>Shahrear Polock</span>.
        </p>
      </div>
    </section>
  )
}
