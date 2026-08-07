import { describe, expect, it } from 'vitest'

import { canAccessOrganization, canPerformAction, createSession, signOut } from './index'

describe('auth permissions', () => {
  it('allows admins to access an allowed organization scope', () => {
    expect(canAccessOrganization('admin', { organizationId: 'org-1', allowed: true })).toBe(true)
  })

  it('allows dispatchers to access an allowed organization scope', () => {
    expect(canAccessOrganization('dispatcher', { organizationId: 'org-1', allowed: true })).toBe(
      true
    )
  })

  it('denies technicians when the scope is not allowed', () => {
    expect(canAccessOrganization('technician', { organizationId: 'org-1', allowed: false })).toBe(
      false
    )
  })

  it('allows dispatchers to manage customers', () => {
    expect(canPerformAction('dispatcher', 'manage_customers')).toBe(true)
  })

  it('denies technicians from managing customers', () => {
    expect(canPerformAction('technician', 'manage_customers')).toBe(false)
  })

  it('creates an authenticated session for a signed-in user', () => {
    const session = createSession({
      id: 'user-1',
      email: 'dispatcher@example.com',
      role: 'dispatcher',
      organizationId: 'org-1',
    })

    expect(session.isAuthenticated).toBe(true)
    expect(session.user.role).toBe('dispatcher')
  })

  it('marks a session as signed out', () => {
    const session = signOut(
      createSession({
        id: 'user-1',
        email: 'dispatcher@example.com',
        role: 'dispatcher',
        organizationId: 'org-1',
      })
    )

    expect(session.isAuthenticated).toBe(false)
  })
})
