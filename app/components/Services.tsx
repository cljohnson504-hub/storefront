'use client'
import FadeUp from './FadeUp'

interface ServicesProps {
  services: string[]
  primaryColor: string
}

export default function Services({ services, primaryColor }: ServicesProps) {
  return (
    <section className="px-6 py-12 bg-gray-50">
      <h2
        style={{ borderLeft: `3px solid ${primaryColor}`, paddingLeft: '12px' }}
        className="text-2xl font-bold text-gray-900 mb-6"
      >
        Our Services
      </h2>
      <div className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto">
        {services.map((service, index) => (
          <FadeUp key={service} delay={Math.min(index * 0.1, 0.5)}>
            <div
              style={{ borderColor: primaryColor, color: primaryColor }}
              className="border rounded-full px-4 py-2 text-sm font-medium bg-white"
            >
              {service}
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}
