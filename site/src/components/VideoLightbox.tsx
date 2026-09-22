import { useEffect, useRef, useState } from 'react'

/**
 * Full film playback, always via youtube-nocookie — we never re-host masters.
 * Keyboard-operable: Esc closes, Tab traps inside, focus returns to the trigger on close.
 */
export function VideoLightbox({ youtubeId, title }: { youtubeId: string; title: string }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key !== 'Tab') return
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], iframe',
      )
      if (!focusable || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => {
    setOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        className="t-slate-lg inline-flex items-center gap-3 group"
        style={{ color: 'var(--text-1)' }}
      >
        <span
          className="w-11 h-11 rounded-full flex items-center justify-center border transition-colors duration-300"
          style={{ borderColor: 'var(--rule-strong)' }}
        >
          <span
            className="w-0 h-0 ml-0.5"
            style={{
              borderTop: '6px solid transparent',
              borderBottom: '6px solid transparent',
              borderLeft: '9px solid var(--korobi)',
            }}
          />
        </span>
        Watch the film
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10"
          style={{ background: 'rgba(10,9,8,0.92)' }}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — video player`}
          onClick={close}
        >
          <div
            ref={panelRef}
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              onClick={close}
              className="absolute -top-12 right-0 t-slate"
              style={{ color: 'var(--text-2)' }}
              aria-label="Close video"
            >
              Close ✕
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  )
}
