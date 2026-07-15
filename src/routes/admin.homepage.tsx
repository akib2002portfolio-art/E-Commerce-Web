import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/homepage')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/homepage"!</div>
}
