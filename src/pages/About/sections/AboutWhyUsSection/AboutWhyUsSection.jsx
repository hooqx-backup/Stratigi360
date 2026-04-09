import simplifiedImg  from '../../../../assets/images/Simplified-Success.webp'
import excellenceImg  from '../../../../assets/images/Comprehensive-Excellence.webp'
import partnershipImg from '../../../../assets/images/Personalized-Partnership.webp'
import './AboutWhyUsSection.css'

const cards = [
  {
    img: simplifiedImg,
    title: 'Simplified Success',
    desc: 'Choose us for effortless solutions, from setting up your company to seamless compliance. We simplify every step so you can focus on growing your business.',
  },
  {
    img: excellenceImg,
    title: 'Comprehensive Excellence',
    desc: 'Opt for Stratigi360 for all-encompassing services, ensuring success with innovative solutions and unwavering integrity across every business need.',
  },
  {
    img: partnershipImg,
    title: 'Personalized Partnership',
    desc: "Select us to experience a dynamic partnership. We're not just about business; we're here to make every professional aspect of your life excellent.",
  },
]

const AboutWhyUsSection = () => (
  <section className="ab-why section">
    <div className="container">
      <div className="ab-why__header">
        <h2 className="ab-why__heading">Why Choose Us</h2>
        <div className="ab-why__line" />
      </div>
      <div className="ab-why__grid">
        {cards.map((card) => (
          <div key={card.title} className="ab-why__card">
            <div className="ab-why__card-img-wrap">
              <img src={card.img} alt={card.title} className="ab-why__card-img" />
            </div>
            <h3 className="ab-why__card-title">{card.title}</h3>
            <p className="ab-why__card-desc">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default AboutWhyUsSection
