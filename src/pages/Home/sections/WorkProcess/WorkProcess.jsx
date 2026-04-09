import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import content from '../../../../locales/en.json'
import workImg from '../../../../assets/images/Group-139.webp'
import './WorkProcess.css'

const { process } = content

const springUp = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 80, damping: 20 },
  },
}

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 60, damping: 20 },
  },
}

const WorkProcess = () => {
  const sectionRef = useRef(null)

  // Track scroll progress through the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 65%', 'end 40%'],
  })

  // The line grows from 0 → full height as the section scrolls through
  const lineScaleY = useTransform(scrollYProgress, [0, 0.85], [0, 1])

  return (
    <section className="process section" ref={sectionRef}>
      <div className="container process__inner">
        {/* Left: Title + Steps */}
        <div className="process__left">
          <motion.h2
            className="process__heading"
            variants={springUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
          >
            {process.heading}
          </motion.h2>
          <motion.div
            className="process__heading-line"
            variants={springUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
          />

          <div className="process__steps">
            {/* Scroll-driven animated line */}
            <motion.div
              className="process__line"
              style={{ scaleY: lineScaleY }}
            />

            {process.steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="process__step"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 80, damping: 20 }}
                whileHover={{ x: 8, transition: { type: 'spring', stiffness: 200 } }}
              >
                <div className="process__step-num">
                  <span className="process__step-num-text">{step.number}</span>
                  <div className="process__step-num-glow" />
                </div>

                <div className="process__step-content">
                  <h3 className="process__step-title">{step.title}</h3>
                  <p className="process__step-desc">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Sticky Image */}
        <motion.div
          className="process__image-wrap"
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="process__image-inner">
            <img
              src={workImg}
              alt="Work Process"
              className="process__img"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <div className="process__image-overlay" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WorkProcess