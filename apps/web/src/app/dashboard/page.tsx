import { canAccessOrganization, canPerformAction } from '@fieldops/auth'

const currentUser = {
  role: 'dispatcher' as const,
  organizationId: 'org-1',
}

export default function DashboardPage() {
  const hasAccess = canAccessOrganization(currentUser.role, {
    organizationId: currentUser.organizationId,
    allowed: true,
  })

  const canManageCustomers = canPerformAction(currentUser.role, 'manage_customers')

  if (!hasAccess) {
    return <div>Access denied</div>
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>Role: {currentUser.role}</p>
      <p>Can manage customers: {canManageCustomers ? 'Yes' : 'No'}</p>
    </main>
  )
}
