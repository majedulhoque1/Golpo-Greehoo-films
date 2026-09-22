import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { attemptLogin, DEMO_CREDENTIALS_HINT } from '#/os/auth'

export const Route = createFileRoute('/os/login')({ component: LoginPage })

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (attemptLogin(email, password)) {
      navigate({ to: '/os/dashboard' })
    } else {
      setError(true)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-5"
      style={{ fontFamily: 'var(--font-mono)', color: '#d6d6d8' }}
    >
      <form onSubmit={onSubmit} className="w-full max-w-sm">
        <div className="text-[13px] mb-1" style={{ color: '#f0f0f1' }}>
          Golpo Greehoo Films
        </div>
        <div className="text-[20px] mb-8" style={{ color: '#f0f0f1' }}>
          Studio OS
        </div>

        <label className="block mb-4">
          <span className="text-[11px] uppercase tracking-wide" style={{ color: '#6a6a6e' }}>
            Email
          </span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1.5 px-3 py-2.5 text-[13px] rounded-sm"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#f0f0f1' }}
          />
        </label>
        <label className="block mb-6">
          <span className="text-[11px] uppercase tracking-wide" style={{ color: '#6a6a6e' }}>
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1.5 px-3 py-2.5 text-[13px] rounded-sm"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#f0f0f1' }}
          />
        </label>

        {error && (
          <div className="text-[12px] mb-4" style={{ color: '#e08a6f' }}>
            Incorrect email or password.
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2.5 text-[13px] rounded-sm transition-opacity"
          style={{ background: '#9d2d19', color: '#f5efe8' }}
        >
          Sign in
        </button>

        <div className="mt-8 text-[11px] leading-relaxed" style={{ color: '#5a5a5e' }}>
          Demo credentials — {DEMO_CREDENTIALS_HINT.email} / {DEMO_CREDENTIALS_HINT.password}
          <br />
          This is a prototype gate, not production security.
        </div>
      </form>
    </div>
  )
}
