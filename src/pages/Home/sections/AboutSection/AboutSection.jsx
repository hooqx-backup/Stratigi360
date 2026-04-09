import content from '../../../../locales/en.json'
import Button from '../../../../components/ui/Button/Button'
import aboutImg from '../../../../assets/images/Group-138.webp'
import './AboutSection.css'

const { about } = content

const AboutSection = () => {
  return (
    <section className="about section">
      <div className="container about__inner">

        {/* Text */}
        <div className="about__text">
          <h2 className="about__heading">{about.heading}</h2>
          <p className="about__body">{about.body}</p>
          <p className="about__body">{about.body2}</p>
          <Button variant="primary" size="md" href="/about">
            {about.cta} →
          </Button>
        </div>

        {/* Image */}
        <div className="about__image-wrap">
          <img
            src={aboutImg}
            alt="About Stratigi360"
            className="about__img"
            onError={(e) => {
              e.target.parentElement.classList.add('about__image-wrap--placeholder')
              e.target.style.display = 'none'
            }}
          />
        </div>

      </div>
    </section>
  )
}

export default AboutSection
