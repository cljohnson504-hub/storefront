interface HeroProps {
  businessName: string
  tagline: string
  phone: string
  primaryColor: string
  logoUrl?: string
}

export default function Hero({ businessName, tagline, phone, primaryColor, logoUrl }: HeroProps) {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-16 text-center bg-white">
      {logoUrl && (
        <img src={logoUrl} alt={`${businessName} logo`} className="h-20 mb-6 object-contain" />
      )}
      <h1 className="text-4xl font-bold text-gray-900 mb-3">{businessName}</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-sm">{tagline}</p>
      <a
        href={`tel:${phone}`}
        style={{ backgroundColor: primaryColor }}
        className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-lg shadow-md active:scale-95 transition-transform"
        aria-label={`Call ${businessName}`}
      >
        📞 Call Now
      </a>
    </section>
  )
}
