import heroBg from '../../../../assets/images/hero-bg.webp'
import HeroNav from '../../../../components/ui/HeroNav/HeroNav'
import './ServicesHeroSection.css'

const ServicesHeroSection = () => {
  return (
    <section className="svc-hero" style={{ backgroundImage: `url(${heroBg})` }}>

      <HeroNav dark />

      <div className="container svc-hero__content">
        <h1 className="svc-hero__heading">SERVICES</h1>
        <p className="svc-hero__sub">
          Comprehensive solutions for every stage of your business journey in Dubai and beyond.
        </p>
        <div className="svc-hero__divider" />
      </div>

    </section>
  )
}

export default ServicesHeroSection
