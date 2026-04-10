import HeroNav from '../../../../components/ui/HeroNav/HeroNav'
import heroBg from '../../../../assets/images/about/Group-154.webp'
import './AboutHeroSection.css'

const AboutHeroSection = () => {
  return (
    <section className="about-hero" style={{ backgroundImage: `url(${heroBg})` }}>

      <HeroNav dark />

      <div className="container about-hero__content">
        <h1 className="about-hero__heading">ABOUT US</h1>
        <p className="about-hero__sub">
          Welcome to 360 Stratigi – where your success is not just a goal; it's our mission!
        </p>
        <div className="about-hero__divider" />
      </div>

    </section>
  )
}

export default AboutHeroSection
