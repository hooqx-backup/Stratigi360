import HeroSection from './sections/HeroSection/HeroSection'
import ServicesWheelSection from './sections/ServicesWheelSection/ServicesWheelSection'
import AboutSection from './sections/AboutSection/AboutSection'
import WorkProcess from './sections/WorkProcess/WorkProcess'
import ServicesSection from './sections/ServicesSection/ServicesSection'
import ValuesSection from './sections/ValuesSection/ValuesSection'
import CostCalculatorBanner from './sections/CostCalculatorBanner/CostCalculatorBanner'
import PartnersSection from './sections/PartnersSection/PartnersSection'
import TestimonialsSection from './sections/TestimonialsSection/TestimonialsSection'
import FAQSection from './sections/FAQSection/FAQSection'
import ContactSection from './sections/ContactSection/ContactSection'
import BusinessDestiny from './sections/BusinessDestiny/BusinessDestiny'
import GlobalReachSection from './sections/GlobalReachSection/GlobalReachSection'

const Home = () => {
  return (
    <>
      <HeroSection />
      <BusinessDestiny />
      <ServicesWheelSection />
      <AboutSection />
      <WorkProcess />
      <ServicesSection />
      <ValuesSection />
      <CostCalculatorBanner />
      <PartnersSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <GlobalReachSection />
    </>
  )
}

export default Home
