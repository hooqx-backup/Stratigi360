import content from '../../../../locales/en.json'
import './ServicesSection.css'

const { services } = content

const ServiceCard = ({ icon, title, description }) => (
  <div className="svc-card">
    <div className="svc-card__icon-wrap">
      <i className={`fa-solid ${icon}`} />
    </div>
    <h3 className="svc-card__title">{title}</h3>
    <p className="svc-card__desc">{description}</p>
    <a href="/services" className="svc-card__link">
      {services.cta} <i className="fa-solid fa-arrow-right" />
    </a>
  </div>
)

const ServicesSection = () => (
  <section className="services section section--light">
    <div className="container">
      <div className="services__header">
        <h2 className="services__heading">{services.heading}</h2>
        <div className="services__heading-line" />
      </div>
      <div className="services__grid">
        {services.items.map((svc) => (
          <ServiceCard key={svc.title} {...svc} />
        ))}
      </div>
    </div>
  </section>
)

export default ServicesSection
