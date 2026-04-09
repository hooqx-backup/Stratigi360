import { motion } from 'framer-motion'
import content from '../../../../locales/en.json'
import './ServicesSection.css'
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '../../../../utils/motionVariants'

const { services } = content

const ServiceCard = ({ icon, title, description }) => (
  <motion.div className="svc-card" variants={scaleIn}>
    <div className="svc-card__icon-wrap">
      <i className={`fa-solid ${icon}`} />
    </div>
    <h3 className="svc-card__title">{title}</h3>
    <p className="svc-card__desc">{description}</p>
    <a href="/services" className="svc-card__link">
      {services.cta} <i className="fa-solid fa-arrow-right" />
    </a>
  </motion.div>
)

const ServicesSection = () => (
  <section className="services section section--light">
    <div className="container">
      <motion.div
        className="services__header"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <h2 className="services__heading">{services.heading}</h2>
        <div className="services__heading-line" />
      </motion.div>

      <motion.div
        className="services__grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {services.items.map((svc) => (
          <ServiceCard key={svc.title} {...svc} />
        ))}
      </motion.div>
    </div>
  </section>
)

export default ServicesSection
