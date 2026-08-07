'use client'

import { useState } from 'react'

import { createSession, type SessionUser } from '@fieldops/auth'

const demoUser: SessionUser = {
  id: 'demo-user',
  email: 'dispatcher@example.com',
  role: 'dispatcher',
  organizationId: 'org-1',
}

export default function SignInPage() {
  const [session, setSession] = useState(() => createSession(demoUser))

  return (
    <main style={{ padding: '2rem', display: 'grid', gap: '1rem' }}>
      <h1>Sign in</h1>
      <p>Use the demo dispatcher account to continue.</p>
      <button
        type="button"
        onClick={() => setSession(createSession(demoUser))}
        style={{ maxWidth: '12rem', padding: '0.75rem' }}
      >
        Sign in
      </button>
      <p>Session status: {session.isAuthenticated ? 'Authenticated' : 'Signed out'}</p>
      <p>Role: {session.user.role}</p>
    </main>
  )
}
