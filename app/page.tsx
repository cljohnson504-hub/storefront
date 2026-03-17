import { getClientConfig } from '../lib/getClientConfig'
import Hero from './components/Hero'
import Services from './components/Services'
import Hours from './components/Hours'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

export default function Page() {
  const config = getClientConfig()

  return (
    <main>
      <Hero
        businessName={config.businessName}
        tagline={config.tagline}
        phone={config.phone}
        primaryColor={config.primaryColor}
        logoUrl={config.logoUrl}
      />
      <Services services={config.services} primaryColor={config.primaryColor} />
      <Hours hours={config.hours} />
      <ContactForm
        businessName={config.businessName}
        contactEmail={config.contactEmail}
        emailjsServiceId={config.emailjsServiceId}
        emailjsTemplateId={config.emailjsTemplateId}
        emailjsPublicKey={config.emailjsPublicKey}
        primaryColor={config.primaryColor}
      />
      <Footer
        businessName={config.businessName}
        phone={config.phone}
        address={config.address}
        googleMapsUrl={config.googleMapsUrl}
        socialLinks={config.socialLinks}
      />
    </main>
  )
}
