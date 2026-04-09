import { motion } from 'framer-motion'
import content from '../../../../locales/en.json'
import './ValuesSection.css'
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '../../../../utils/motionVariants'

const { values } = content

const getImg = (filename) => {
  try {
    return new URL(`../../../../assets/images/${filename}`, import.meta.url).href
  } catch {
    return null
  }
}

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
        <h2 className="values__heading">{values.heading}</h2>
        <div className="values__heading-line" />
      </motion.div>

      <motion.div
        className="values__grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {values.items.map((item) => (
          <motion.div key={item.title} className="values__card" variants={scaleIn}>
            <div className="values__card-img-wrap">
              <img
                src={getImg(item.image)}
                alt={item.title}
                className="values__card-img"
                onError={(e) => { e.target.parentElement.classList.add('values__card-img-wrap--empty'); e.target.style.display = 'none' }}
              />
            </div>
            <h3 className="values__card-title">{item.title}</h3>
            <p className="values__card-desc">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
)

export default ValuesSection
