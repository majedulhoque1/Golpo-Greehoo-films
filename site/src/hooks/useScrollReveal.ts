import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Attaches to a container; every direct/descendant [data-reveal] child fades + rises
 * into place once, staggered, when it enters the viewport. Respects prefers-reduced-motion.
 */
export function useScrollReveal<T extends HTMLElement>(deps: unknown[] = []) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (targets.length === 0) return

    if (reduce) {
      targets.forEach((el) => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const delay = Number(el.dataset.revealDelay || 0)
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay,
            ease: 'power3.out',
          })
          io.unobserve(el)
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )

    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}
