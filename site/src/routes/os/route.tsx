import { createFileRoute, Outlet } from '@tanstack/react-router'
import { OsShell } from '#/os/OsShell'

export const Route = createFileRoute('/os')({
  component: () => (
    <OsShell>
      <Outlet />
    </OsShell>
  ),
})
