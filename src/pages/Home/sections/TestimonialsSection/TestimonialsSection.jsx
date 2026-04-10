import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import content from '../../../../locales/en.json'
import SectionTitle from '../../../../components/ui/SectionTitle/SectionTitle'
import './TestimonialsSection.css'
import { fadeUp, viewportOnce } from '../../../../utils/motionVariants'

const { testimonials } = content

const StarRating = ({ rating }) => (
  <div className="ts-stars" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fa-solid fa-star ${i < rating ? 'ts-star--filled' : 'ts-star--empty'}`}
      />
    ))}
  </div>
)

const Avatar = ({ item }) => {
  const [imgFailed, setImgFailed] = useState(false)

  useEffect(() => {
    setImgFailed(false)
  }, [item.name])

  return (
    <div className="ts__avatar">
      {!imgFailed && item.image ? (
        <img src={item.image} alt={item.name} onError={() => setImgFailed(true)} />
      ) : (
        <span className="ts__avatar-initial">{item.name.charAt(0)}</span>
      )}
    </div>
  )
}

const TestimonialsSection = () => {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(true)

  const goTo = (idx) => {
    setVisible(false)
    setTimeout(() => {
      setActive(idx)
      setVisible(true)
    }, 320)
  }

  const prev = () => goTo((active - 1 + testimonials.items.length) % testimonials.items.length)
  const next = () => goTo((active + 1) % testimonials.items.length)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setActive(prev => (prev + 1) % testimonials.items.length)
        setVisible(true)
      }, 320)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const item = testimonials.items[active]

  return (
    <section className="ts section">
      <div className="ts__bg-deco" aria-hidden="true">
        <i className="fa-solid fa-quote-left" />
      </div>

      <div className="container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <SectionTitle
            label={testimonials.label}
            heading={testimonials.heading}
            subheading={testimonials.subheading}
            align="center"
          />
        </motion.div>

        <div className="ts__carousel">
          <button className="ts__arrow" onClick={prev} aria-label="Previous testimonial">
            <i className="fa-solid fa-chevron-left" />
          </button>

          <div className={`ts__content ${visible ? 'ts__content--in' : 'ts__content--out'}`}>
            <div className="ts__quote-mark" aria-hidden="true">
              <i className="fa-solid fa-quote-left" />
            </div>

            <StarRating rating={item.rating} />

            <p className="ts__review">{item.review}</p>

            <div className="ts__author">
              <Avatar item={item} />
              <div className="ts__author-text">
                <span className="ts__name">{item.name}</span>
                <span className="ts__role">{item.role}</span>
              </div>
            </div>
          </div>

          <button className="ts__arrow" onClick={next} aria-label="Next testimonial">
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>

        <div className="ts__dots">
          {testimonials.items.map((_, i) => (
            <button
              key={i}
              className={`ts__dot ${i === active ? 'ts__dot--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
