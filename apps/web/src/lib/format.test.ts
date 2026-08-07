import { describe, expect, it } from 'vitest'

import { formatStatusLabel } from './format'

describe('formatStatusLabel', () => {
  it('formats snake_case values into readable labels', () => {
    expect(formatStatusLabel('in_progress')).toBe('In Progress')
  })

  it('normalizes uppercase values', () => {
    expect(formatStatusLabel('COMPLETED')).toBe('Completed')
  })
})
