import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { isLoggedIn, logout } from './auth'

const NAV = [
  { to: '/os/dashboard', label: 'Dashboard', short: 'Home', icon: IconHome },
  { to: '/os/productions', label: 'Productions', short: 'Jobs', icon: IconFilm },
  { to: '/os/calendar', label: 'Calendar', short: 'Cal', icon: IconCalendar },
  { to: '/os/clients', label: 'Clients & Leads', short: 'Leads', icon: IconPeople },
  { to: '/os/crew', label: 'Crew', short: 'Crew', icon: IconUser },
] as const

export function OsShell({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [ready, setReady] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (location.pathname === '/os/login') {
      setReady(true)
      return
    }
    if (!isLoggedIn()) {
      navigate({ to: '/os/login' })
      return
    }
    setReady(true)
  }, [location.pathname, navigate])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  if (location.pathname === '/os/login') {
    return <div style={{ background: '#0b0b0c', minHeight: '100svh' }}>{children}</div>
  }

  if (!ready) return null

  const onLogout = () => {
    logout()
    navigate({ to: '/os/login' })
  }

  return (
    <div className="flex min-h-screen" style={{ background: '#0b0b0c', color: '#d6d6d8', fontFamily: 'var(--font-mono)' }}>
      {/* Desktop sidebar */}
      <aside
        className="hidden sm:flex flex-col w-60 shrink-0 px-5 py-6"
        style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}
      >
        <Link to="/" className="text-[11px] tracking-wide mb-1" style={{ color: '#8a8a8f' }}>
          ← Golpo Greehoo Films
        </Link>
        <div className="text-[13px] font-medium mb-8" style={{ color: '#f0f0f1' }}>
          Studio OS
        </div>

        <nav className="flex flex-col gap-1">
          {NAV.map((item) => {
            const active = location.pathname === item.to || location.pathname.startsWith(item.to + '/')
            return (
              <Link
                key={item.to}
                to={item.to}
                className="text-[13px] px-3 py-2 rounded-sm transition-colors duration-150"
                style={{
                  background: active ? 'rgba(255,255,255,0.06)' : 'transparent',
                  color: active ? '#f0f0f1' : '#8a8a8f',
                }}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-3">
          <div
            className="text-[10px] px-2.5 py-1.5 rounded-sm tracking-wide text-center"
            style={{ background: 'rgba(157,45,25,0.16)', color: '#e08a6f', border: '1px solid rgba(157,45,25,0.3)' }}
          >
            DEMO DATA
          </div>
          <button onClick={onLogout} className="text-[12px] text-left px-3 py-1.5" style={{ color: '#6a6a6e' }}>
            Log out
          </button>
        </div>
      </aside>

      {/* Mobile top bar — identity + demo badge + logout, no duplicate nav */}
      <div
        className="sm:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4"
        style={{ height: 52, background: '#0b0b0c', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        <Link to="/" className="text-[11px]" style={{ color: '#8a8a8f' }}>
          ← Studio
        </Link>
        <span
          className="text-[9px] px-2 py-1 rounded-sm tracking-wide"
          style={{ background: 'rgba(157,45,25,0.16)', color: '#e08a6f', border: '1px solid rgba(157,45,25,0.3)' }}
        >
          DEMO DATA
        </span>
        <button
          onClick={() => setMenuOpen((open) => !open)}
          className="flex items-center justify-center w-10 h-10 -mr-2"
          aria-label={menuOpen ? 'Close admin menu' : 'Open admin menu'}
          aria-expanded={menuOpen}
        >
          <span className="relative block w-4 h-3">
            <span
              className="absolute left-0 right-0 h-px transition-transform duration-200"
              style={{ top: menuOpen ? '50%' : '0', background: '#d6d6d8', transform: menuOpen ? 'translateY(-50%) rotate(45deg)' : 'none' }}
            />
            <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px transition-opacity duration-200" style={{ background: '#d6d6d8', opacity: menuOpen ? 0 : 1 }} />
            <span
              className="absolute left-0 right-0 h-px transition-transform duration-200"
              style={{ bottom: menuOpen ? '50%' : '0', background: '#d6d6d8', transform: menuOpen ? 'translateY(50%) rotate(-45deg)' : 'none' }}
            />
          </span>
        </button>
      </div>

      <div
        className="sm:hidden fixed top-[52px] inset-x-0 bottom-0 z-30 px-4 py-5 transition-opacity duration-200"
        style={{ background: '#0b0b0c', opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none' }}
      >
        <nav className="flex flex-col" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {NAV.map((item) => {
            const active = location.pathname === item.to || location.pathname.startsWith(item.to + '/')
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center justify-between py-4 text-[14px]"
                style={{ color: active ? '#f0f0f1' : '#a3a3a7', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
              >
                <span>{item.label}</span>
                <span style={{ color: active ? '#e08a6f' : '#6a6a6e' }}>→</span>
              </Link>
            )
          })}
        </nav>
        <div className="mt-8 flex flex-col gap-4">
          <Link to="/" className="text-[12px]" style={{ color: '#8a8a8f' }}>
            ← Back to Golpo Greehoo Films
          </Link>
          <button onClick={onLogout} className="text-[12px] text-left" style={{ color: '#e08a6f' }}>
            Log out
          </button>
        </div>
      </div>

      <main className="flex-1 min-w-0 px-4 sm:px-10 pt-[68px] pb-24 sm:pt-10 sm:pb-10">{children}</main>

      {/* Mobile bottom tab bar — the real navigation on a touch screen */}
      <nav
        className="sm:hidden fixed bottom-0 inset-x-0 z-40 flex"
        style={{
          background: '#0f0f10',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        {NAV.map((item) => {
          const active = location.pathname === item.to || location.pathname.startsWith(item.to + '/')
          const Icon = item.icon
          return (
            <Link
              key={item.to}
              to={item.to}
              className="flex-1 flex flex-col items-center justify-center gap-1"
              style={{ height: 58, color: active ? '#e08a6f' : '#6a6a6e' }}
            >
              <Icon active={active} />
              <span className="text-[9px] tracking-wide">{item.short}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

function IconHome({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
      <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 10v9a1 1 0 0 0 1 1H10v-5.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V20h3.5a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function IconFilm({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" />
      <path d="M8 4.5v15M16 4.5v15M3.5 9h4.5M3.5 15h4.5M16 9h4.5M16 15h4.5" strokeLinecap="round" />
    </svg>
  )
}
function IconCalendar({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
      <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" strokeLinecap="round" />
    </svg>
  )
}
function IconPeople({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19.5c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" strokeLinecap="round" />
      <circle cx="17" cy="8.5" r="2.2" />
      <path d="M15.8 14.3c2.4.4 4.2 2.5 4.2 5.2" strokeLinecap="round" />
    </svg>
  )
}
function IconUser({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.5}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c0-4.1 3.4-7.5 7.5-7.5s7.5 3.4 7.5 7.5" strokeLinecap="round" />
    </svg>
  )
}

export function OsCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-sm p-5 ${className}`}
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {children}
    </div>
  )
}

export function OsLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color: '#6a6a6e' }}>
      {children}
    </div>
  )
}

export function OsStat({ label, value }: { label: string; value: string | number }) {
  return (
    <OsCard>
      <OsLabel>{label}</OsLabel>
      <div className="text-[28px] leading-none tabular" style={{ color: '#f0f0f1' }}>
        {value}
      </div>
    </OsCard>
  )
}
