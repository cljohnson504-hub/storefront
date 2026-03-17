import type { Metadata, Viewport } from 'next'
import { getClientConfig } from '../lib/getClientConfig'
import './globals.css'

export function generateMetadata(): Metadata {
  const config = getClientConfig()
  return {
    title: config.businessName,
    description: config.tagline,
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
