import { useState } from 'react'
import content from '../../../../locales/en.json'
import './ServicesGridSection.css'

const { services } = content

const ServicesGridSection = () => {
  const [activeTab, setActiveTab] = useState('All')

  const filtered = activeTab === 'All'
    ? services.items
    : services.items.filter((s) => s.category === activeTab)

  return (
    <section className="svc-grid section section--light">
      <div className="container">

        <div className="svc-grid__header">
          <h2 className="svc-grid__heading">Our Services</h2>
          <div className="svc-grid__line" />
          <p className="svc-grid__sub">{services.subheading}</p>
        </div>

        <div className="svc-tabs" role="tablist" aria-label="Service categories">
          {services.tabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={`svc-tab ${activeTab === tab ? 'svc-tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="svc-grid__grid">
          {filtered.map((svc) => (
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
}

export default ServicesGridSection
