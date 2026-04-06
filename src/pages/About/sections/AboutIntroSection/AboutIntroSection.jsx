import Button from '../../../../components/ui/Button/Button'
import aboutImg from '../../../../assets/images/Group-138.webp'
import './AboutIntroSection.css'

const AboutIntroSection = () => (
  <section className="ab-intro section">
    <div className="container ab-intro__inner">

      <div className="ab-intro__text">
        <h2 className="ab-intro__heading">
          A Dynamic Ally in Navigating the World of Business
        </h2>
        <div className="ab-intro__line" />
        <p className="ab-intro__body">
          Stratigi360 is a beacon of innovation and efficiency in the world of business setup
          services. We redefine the process of establishing your business, making it seamless and
          stress-free. Our commitment to transparency, efficiency, and personalized service sets us apart.
        </p>
        <p className="ab-intro__body">
          Imagine a one-click solution for all your legal and professional needs in Dubai.
          Specializing in business consultations, setup, legal & tax, operations, collateral building,
          marketing management, digital solutions, virtual assistance, and investment & financial
          consultations — we are your one-stop solution.
        </p>
        <Button variant="primary" size="md" href="/services">
          Explore Our Services →
        </Button>
      </div>

      <div className="ab-intro__image-wrap">
        <img src={aboutImg} alt="About Stratigi360" className="ab-intro__img" />
      </div>

    </div>
  </section>
)

export default AboutIntroSection
