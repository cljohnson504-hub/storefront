import { getClientConfig } from './getClientConfig'

describe('getClientConfig', () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('returns demo config when NEXT_PUBLIC_CLIENT_SLUG is "demo"', () => {
    process.env.NEXT_PUBLIC_CLIENT_SLUG = 'demo'
    const config = getClientConfig()
    expect(config.businessName).toBe('Acme Plumbing')
    expect(config.slug).toBe('demo')
    expect(config.services.length).toBeGreaterThan(0)
  })

  it('throws when slug is missing', () => {
    delete process.env.NEXT_PUBLIC_CLIENT_SLUG
    expect(() => getClientConfig()).toThrow('NEXT_PUBLIC_CLIENT_SLUG is not set')
  })

  it('throws when slug has no matching config file', () => {
    process.env.NEXT_PUBLIC_CLIENT_SLUG = 'nonexistent-client-xyz'
    expect(() => getClientConfig()).toThrow(/nonexistent-client-xyz/)
  })

  it('throws when slug contains invalid characters', () => {
    process.env.NEXT_PUBLIC_CLIENT_SLUG = '../../etc/passwd'
    expect(() => getClientConfig()).toThrow('Invalid client slug')
  })
})
