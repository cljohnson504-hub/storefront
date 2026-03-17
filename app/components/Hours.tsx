import { HoursEntry } from '../../lib/client'

interface HoursProps {
  hours: HoursEntry[]
}

export default function Hours({ hours }: HoursProps) {
  return (
    <section className="px-6 py-12 bg-white">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Hours</h2>
      <div className="max-w-xs mx-auto divide-y divide-gray-100">
        {hours.map(({ days, time }) => (
          <div key={days} className="flex justify-between py-3 text-gray-700">
            <span className="font-medium">{days}</span>
            <span>{time}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
