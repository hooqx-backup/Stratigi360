import { motion } from 'framer-motion'
import content from '../../../../locales/en.json'
import './ValuesSection.css'
import { fadeUp, viewportOnce } from '../../../../utils/motionVariants'

const { values } = content

const getImg = (filename) => {
  try {
    return new URL(`../../../../assets/images/${filename}`, import.meta.url).href
  } catch {
    return null
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: i * 0.12,
    },
  }),
}

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0 } },
}

const ValueCard = ({ image, title, description, index }) => (
  <motion.div
    className="val-card"
    custom={index}
    variants={cardVariants}
  >
    {/* Image */}
    <div className="val-card__media">
      <img
        src={getImg(image)}
        alt={title}
        className="val-card__img"
        onError={(e) => {
          e.target.style.display = 'none'
          e.target.parentElement.classList.add('val-card__media--fallback')
        }}
      />
    </div>

    {/* Overlay — persistent bottom strip, full cover on hover */}
    <div className="val-card__overlay">
      <div className="val-card__overlay-inner">
        <span className="val-card__num">{String(index + 1).padStart(2, '0')}</span>
        <div className="val-card__accent-line" />
        <h3 className="val-card__title">{title}</h3>
        <p className="val-card__desc">{description}</p>
      </div>
    </div>
  </motion.div>
)

const ValuesSection = () => (
  <section className="values section">
    <div className="container">
      <motion.div
        className="values__header"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <p className="values__label">Why Choose Us</p>
        <h2 className="values__heading">{values.heading}</h2>
        <div className="values__heading-line" />
      </motion.div>

      <motion.div
        className="values__grid"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {values.items.map((item, i) => (
          <ValueCard key={item.title} {...item} index={i} />
        ))}
      </motion.div>
    </div>
  </section>
)

export default ValuesSection
