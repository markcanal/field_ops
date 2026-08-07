export type UserRole = 'admin' | 'dispatcher' | 'technician'

export type OrganizationScope = {
  organizationId: string
  allowed: boolean
}

export type PermissionAction = 'view_dashboard' | 'manage_customers' | 'manage_jobs'

export type SessionUser = {
  id: string
  email: string
  role: UserRole
  organizationId: string
}

export type Session = {
  user: SessionUser
  isAuthenticated: boolean
}

export function canAccessOrganization(role: UserRole, scope: OrganizationScope): boolean {
  if (!scope.allowed) {
    return false
  }

  return role === 'admin' || role === 'dispatcher' || role === 'technician'
}

export function canPerformAction(role: UserRole, action: PermissionAction): boolean {
  switch (action) {
    case 'view_dashboard':
      return role === 'admin' || role === 'dispatcher' || role === 'technician'
    case 'manage_customers':
      return role === 'admin' || role === 'dispatcher'
    case 'manage_jobs':
      return role === 'admin' || role === 'dispatcher'
    default:
      return false
  }
}

export function createSession(user: SessionUser): Session {
  return {
    user,
    isAuthenticated: true,
  }
}

export function signOut(session: Session): Session {
  return {
    user: session.user,
    isAuthenticated: false,
  }
}
