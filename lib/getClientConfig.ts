import { ClientConfig } from './client'

export function getClientConfig(): ClientConfig {
  const slug = process.env.NEXT_PUBLIC_CLIENT_SLUG
  if (!slug) {
    throw new Error('NEXT_PUBLIC_CLIENT_SLUG is not set')
  }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw new Error(`Invalid client slug: "${slug}". Only lowercase letters, numbers, and hyphens are allowed.`)
  }
  // Dynamic require so each call re-reads the slug from env at call time
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const config = require(`../clients/${slug}.json`) as ClientConfig
  return config
}
