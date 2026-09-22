import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { isLoggedIn, logout } from './auth'

const NAV = [
  { to: '/os/dashboard', label: 'Dashboard' },
  { to: '/os/productions', label: 'Productions' },
  { to: '/os/calendar', label: 'Calendar' },
  { to: '/os/clients', label: 'Clients & Leads' },
  { to: '/os/crew', label: 'Crew' },
] as const

export function OsShell({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [ready, setReady] = useState(false)

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

  if (location.pathname === '/os/login') {
    return <div style={{ background: '#0b0b0c', minHeight: '100svh' }}>{children}</div>
  }

  if (!ready) return null

  return (
    <div className="flex min-h-screen" style={{ background: '#0b0b0c', color: '#d6d6d8', fontFamily: 'var(--font-mono)' }}>
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
          <button
            onClick={() => {
              logout()
              navigate({ to: '/os/login' })
            }}
            className="text-[12px] text-left px-3 py-1.5"
            style={{ color: '#6a6a6e' }}
          >
            Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 px-6 sm:px-10 py-8 sm:py-10">{children}</main>
    </div>
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
