// Demo gate, not security — Vite inlines VITE_* into the client bundle
// regardless of .env being gitignored, so these credentials ship in the
// bundle. This keeps casual visitors out of the console, nothing more.
const DEMO_EMAIL = import.meta.env.VITE_OS_EMAIL || 'admin@golpogreehoo.films'
const DEMO_PASSWORD = import.meta.env.VITE_OS_PASSWORD || 'golpogreehoo2026'

const SESSION_KEY = 'ggf-os-session-demo'

export function attemptLogin(email: string, password: string): boolean {
  const ok = email.trim().toLowerCase() === DEMO_EMAIL.toLowerCase() && password === DEMO_PASSWORD
  if (ok) {
    try {
      window.sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* noop */
    }
  }
  return ok
}

export function isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export function logout() {
  try {
    window.sessionStorage.removeItem(SESSION_KEY)
  } catch {
    /* noop */
  }
}

export const DEMO_CREDENTIALS_HINT = { email: DEMO_EMAIL, password: DEMO_PASSWORD }
