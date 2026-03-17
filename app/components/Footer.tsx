import { SocialLinks } from '../../lib/client'

interface FooterProps {
  businessName: string
  phone: string
  address: string
  googleMapsUrl: string
  socialLinks?: SocialLinks
}

export default function Footer({ businessName, phone, address, googleMapsUrl, socialLinks }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-10 text-center">
      <p className="text-white font-semibold text-lg mb-2">{businessName}</p>
      <a href={`tel:${phone}`} className="block text-gray-400 hover:text-white mb-1">
        {phone}
      </a>
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-gray-400 hover:text-white mb-4 text-sm"
      >
        {address}
      </a>
      {socialLinks?.facebook && (
        <a
          href={socialLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm text-blue-400 hover:text-blue-300 mb-4"
        >
          Facebook
        </a>
      )}
      <p className="text-xs text-gray-600 mt-6">© {new Date().getFullYear()} {businessName}</p>
    </footer>
  )
}
