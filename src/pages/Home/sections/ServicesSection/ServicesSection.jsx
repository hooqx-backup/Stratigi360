import { motion } from 'framer-motion'
import content from '../../../../locales/en.json'
import Button from '../../../../components/ui/Button/Button'
import './ServicesSection.css'
import { fadeUp, viewportOnce } from '../../../../utils/motionVariants'

const { services } = content

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: i * 0.07,
    },
  }),
}

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0 } },
}

const ServiceCard = ({ icon, title, description, index }) => (
  <motion.div
    className="svc-card"
    custom={index}
    variants={cardVariants}
  >
    <span className="svc-card__num">{String(index + 1).padStart(2, '0')}</span>

    <div className="svc-card__icon-wrap">
      <i className={`fa-solid ${icon}`} />
      <div className="svc-card__icon-ring" />
    </div>

    <h3 className="svc-card__title">{title}</h3>
    <p className="svc-card__desc">{description}</p>

    <Button href="/services" variant="link" className="svc-card__link">
      <span className="svc-card__link-text">{services.cta}</span>
      <span className="svc-card__link-arrow">
        <i className="fa-solid fa-arrow-right" />
      </span>
    </Button>
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
        <p className="services__label">{services.label}</p>
        <h2 className="services__heading">{services.heading}</h2>
        <div className="services__heading-line" />
      </motion.div>

      <motion.div
        className="services__grid"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {services.items.map((svc, i) => (
          <ServiceCard key={svc.title} {...svc} index={i} />
        ))}
      </motion.div>
    </div>
  </section>
)

export default ServicesSection