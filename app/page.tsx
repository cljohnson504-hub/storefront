import { getClientConfig } from '../lib/getClientConfig'
import Hero from './components/Hero'
import Services from './components/Services'
import Hours from './components/Hours'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import FadeUp from './components/FadeUp'
import BeforeAfter from './components/BeforeAfter'
import Gallery from './components/Gallery'

export default function Page() {
  const config = getClientConfig()

  return (
    <main>
      <FadeUp>
        <Hero
          businessName={config.businessName}
          tagline={config.tagline}
          phone={config.phone}
          primaryColor={config.primaryColor}
          logoUrl={config.logoUrl}
        />
      </FadeUp>
      <FadeUp delay={0.1}>
        <Services services={config.services} primaryColor={config.primaryColor} />
      </FadeUp>

      {config.beforeImageUrl && (
        <FadeUp delay={0.1}>
          <BeforeAfter
            label={config.beforeAfterLabel ?? 'See Our Work'}
            beforeImageUrl={config.beforeImageUrl}
            afterImageUrl={config.afterImageUrl}
            primaryColor={config.primaryColor}
          />
        </FadeUp>
      )}

      {config.galleryImages && config.galleryImages.length > 0 && (
        <FadeUp delay={0.1}>
          <Gallery
            label={config.galleryLabel ?? 'Our Work'}
            images={config.galleryImages}
            primaryColor={config.primaryColor}
          />
        </FadeUp>
      )}

      <FadeUp delay={0.1}>
        <Hours hours={config.hours} primaryColor={config.primaryColor} />
      </FadeUp>
      <FadeUp delay={0.1}>
        <ContactForm
          businessName={config.businessName}
          contactEmail={config.contactEmail}
          emailjsServiceId={config.emailjsServiceId}
          emailjsTemplateId={config.emailjsTemplateId}
          emailjsPublicKey={config.emailjsPublicKey}
          primaryColor={config.primaryColor}
        />
      </FadeUp>
      <FadeUp delay={0.1}>
        <Footer
          businessName={config.businessName}
          phone={config.phone}
          address={config.address}
          googleMapsUrl={config.googleMapsUrl}
          socialLinks={config.socialLinks}
        />
      </FadeUp>
    </main>
  )
}
