import { motion } from 'framer-motion'
import content from '../../../../locales/en.json'
import './TestimonialsSection.css'
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '../../../../utils/motionVariants'

const { testimonials } = content

const StarRating = ({ rating }) => (
  <div className="stars" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fa-solid fa-star ${i < rating ? 'stars__star--filled' : 'stars__star--empty'}`}
      />
    ))}
  </div>
)

const TestimonialsSection = () => {
  return (
    <section className="testimonials section section--light">
      <div className="container">
        <motion.div
          className="testimonials__header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <h2 className="testimonials__title">Testimonials</h2>
          <div className="testimonials__underline"></div>
        </motion.div>

        <motion.div
          className="testimonials__grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {testimonials.items.map((item) => (
            <motion.div
              key={item.name}
              className="testimonial-card"
              variants={scaleIn}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="testimonial-card__avatar">
                {item.image ? (
                   <img src={item.image} alt={item.name} />
                ) : (
                   item.name.charAt(0)
                )}
              </div>
              <h3 className="testimonial-card__name">{item.name}</h3>
              <StarRating rating={item.rating} />
              <p className="testimonial-card__review">{item.review}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection
