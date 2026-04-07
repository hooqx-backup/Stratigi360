import { Link } from 'react-router-dom'
import content from '../../../../locales/en.json'
import './ServicesGridSection.css'

const { services } = content

const ServicesGridSection = () => (
  <section className="svc-grid section section--light">
    <div className="container">

      <div className="svc-grid__header">
        <h2 className="svc-grid__heading">Our Services</h2>
        <div className="svc-grid__line" />
      </div>

      <div className="svc-grid__grid">
        {services.items.map((svc) => (
          <div key={svc.title} className="svc-card2">
            <div className="svc-card2__icon-wrap">
              <i className={`fa-solid ${svc.icon}`} />
            </div>
            <h3 className="svc-card2__title">{svc.title}</h3>
            <p className="svc-card2__desc">{svc.description}</p>
          </div>
        ))}
      </div>

    </div>
  </section>
)

export default ServicesGridSection
