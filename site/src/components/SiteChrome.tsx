import { Link, useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { featuredFilm } from '#/data/films'

const NAV = [
  { to: '/work' as const, label: 'Work', params: undefined },
  { to: '/films/$slug' as const, label: 'The Film', params: { slug: featuredFilm.slug } },
  { to: '/studio' as const, label: 'Studio', params: undefined },
  { to: '/contact' as const, label: 'Contact', params: undefined },
]

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isOs = location.pathname.startsWith('/os')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!isHome) return
    const onScroll = () => setScrolled(window.scrollY > 64)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const solid = !isHome || scrolled

  // The Studio OS is a tool, not a showcase — it brings its own full-screen
  // layout (OsShell) and deliberately skips the public site's marketing chrome.
  if (isOs) return <>{children}</>

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className="fixed top-0 inset-x-0 z-50 transition-colors duration-500"
        style={{
          background: solid ? 'var(--ink)' : 'transparent',
          borderBottom: solid ? '1px solid var(--rule)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="t-slate-lg flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
            <span className="t-bangla" style={{ fontSize: '1rem', letterSpacing: 0 }}>
              গল্প গৃহ
            </span>
            <span style={{ color: 'var(--text-4)' }}>·</span>
            <span>Golpo Greehoo Films</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-7">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                params={item.params}
                className="t-slate"
                style={{ color: 'var(--text-2)' }}
                activeProps={{ style: { color: 'var(--text-1)' } }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  )
}

function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', borderTop: '1px solid var(--rule)' }}>
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
        <div className="grid sm:grid-cols-3 gap-10 sm:gap-8">
          <div>
            <div className="t-bangla" style={{ fontSize: '1.5rem', color: 'var(--text-1)' }}>
              গল্প গৃহ
            </div>
            <p className="t-body mt-3" style={{ color: 'var(--text-3)', maxWidth: '32ch' }}>
              Golpo Greehoo Films — a Dhaka production house. House 2, Road 5, Niketon, Gulshan 1,
              Dhaka.
            </p>
          </div>
          <div>
            <div className="t-slate mb-4">Contact</div>
            <div className="t-body flex flex-col gap-1" style={{ color: 'var(--text-2)' }}>
              <a href="mailto:golpogreehoo.films@gmail.com" className="hover:underline">
                golpogreehoo.films@gmail.com
              </a>
              <a href="tel:+8801870478944" className="hover:underline">
                01870-478944
              </a>
              <a
                href="https://www.youtube.com/@golpogreehoofilms"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                YouTube
              </a>
              <a
                href="https://www.facebook.com/golpogreehoofilms"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Facebook
              </a>
            </div>
          </div>
          <div className="sm:text-right">
            <div className="t-slate mb-4">Studio</div>
            <div className="flex flex-col gap-1 sm:items-end">
              <Link to="/os" className="t-body" style={{ color: 'var(--text-4)' }}>
                Admin
              </Link>
            </div>
          </div>
        </div>

        <div
          className="mt-14 pt-6 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between"
          style={{ borderTop: '1px solid var(--rule)' }}
        >
          <p className="t-slate" style={{ color: 'var(--text-4)', letterSpacing: '0.04em' }}>
            Concept by EXPERIUS — not an official Golpo Greehoo Films property.
          </p>
          <p className="t-slate" style={{ color: 'var(--text-4)', letterSpacing: '0.04em' }}>
            © 2026 Golpo Greehoo Films
          </p>
        </div>
      </div>
    </footer>
  )
}
