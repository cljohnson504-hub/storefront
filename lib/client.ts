export interface HoursEntry {
  days: string
  time: string
}

export interface SocialLinks {
  facebook?: string
}

export interface ClientConfig {
  businessName: string
  slug: string
  tagline: string
  primaryColor: string
  logoUrl?: string
  phone: string
  address: string
  googleMapsUrl: string
  contactEmail: string
  emailjsServiceId: string
  emailjsTemplateId: string
  emailjsPublicKey: string
  hours: HoursEntry[]
  services: string[]
  socialLinks?: SocialLinks
}
