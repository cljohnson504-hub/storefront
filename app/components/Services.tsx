interface ServicesProps {
  services: string[]
  primaryColor: string
}

export default function Services({ services, primaryColor }: ServicesProps) {
  return (
    <section className="px-6 py-12 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Services</h2>
      <ul className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto">
        {services.map((service) => (
          <li
            key={service}
            style={{ borderColor: primaryColor, color: primaryColor }}
            className="border-2 rounded-full px-4 py-2 text-sm font-medium bg-white"
          >
            {service}
          </li>
        ))}
      </ul>
    </section>
  )
}
