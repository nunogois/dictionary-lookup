import { expect, test, describe } from 'bun:test'
import { isInDict, setup } from './set'

describe('dictionaryLookup - set - 3 simple words', () => {
  setup(['cat', 'car', 'bar'])

  test('simple lookup', () => {
    expect(isInDict('cat')).toBe(true)
    expect(isInDict('ca')).toBe(false)
    expect(isInDict('cataclysm')).toBe(false)
    expect(isInDict('cow')).toBe(false)
    expect(isInDict('bar')).toBe(true)
  })

  test('wildcard lookup', () => {
    expect(isInDict('c*t')).toBe(true)
    expect(isInDict('*ow')).toBe(false)
    expect(isInDict('ca*')).toBe(true)
    expect(isInDict('bar*')).toBe(false)
  })
})
