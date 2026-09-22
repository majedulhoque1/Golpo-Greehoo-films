import { createFileRoute, redirect } from '@tanstack/react-router'
import { isLoggedIn } from '#/os/auth'

export const Route = createFileRoute('/os/')({
  beforeLoad: () => {
    throw redirect({ to: isLoggedIn() ? '/os/dashboard' : '/os/login' })
  },
})
