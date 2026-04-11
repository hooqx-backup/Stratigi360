import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { viewportOnce } from '../../../../utils/motionVariants'
import './AboutIntroSection.css'

const achievements = [
  { icon: 'fa-solid fa-building',   value: '500+',  label: 'Businesses Launched', color: '#dd3333' },
  { icon: 'fa-solid fa-trophy',     value: '12+',   label: 'Years of Excellence', color: '#f59e0b' },
  { icon: 'fa-solid fa-users',      value: '5000+', label: 'Happy Clients',       color: '#10b981' },
  { icon: 'fa-solid fa-globe',      value: '30+',   label: 'Countries Served',    color: '#6366f1' },
]

const tags = ['Company Setup', 'Legal Compliance', 'Financial Management', 'Digital Solutions']

const AboutIntroSection = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="ab-intro section">
      <div className="container ab-intro__grid">

        {/* ── Left column ── */}
        <motion.div
          className="ab-intro__left"
          initial={shouldReduceMotion ? false : { opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          viewport={viewportOnce}
        >
          <span className="ab-intro__label">
            <i className="fa-solid fa-circle-info" /> Who We Are
          </span>

          <h2 className="ab-intro__heading">
            Dubai's Trusted<br />
            <span className="ab-intro__heading-accent">Business Partner</span>
          </h2>

          <div className="ab-intro__divider" />

          <p className="ab-intro__body">
            At 360 Stratigi, we're not just a company; we're your dynamic ally in navigating
            the intricate world of business in Dubai. Whether you're a startup aiming for the
            stars or an international business seeking a smooth journey, we've got your back.
          </p>
          <p className="ab-intro__body">
            Our services are more than just paperwork; they're the building blocks of your
            success. From setting up your company with ease to handling government registrations,
            meticulous financial management, and ensuring annual compliance – we cover it all.
          </p>
          <p className="ab-intro__body">
            Our goal is clear – we want to make your life simpler. Imagine a one-click solution
            for all your legal and professional needs in Dubai. Navigating the regulatory dance in
            Dubai's vibrant market should be effortless, and that's what we're here to achieve.
          </p>

          <div className="ab-intro__tags">
            {tags.map((tag, i) => (
              <motion.span
                key={tag}
                className="ab-intro__tag"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                viewport={viewportOnce}
              >
                <i className="fa-solid fa-check" /> {tag}
              </motion.span>
            ))}
          </div>

          <motion.div
            className="ab-intro__cta"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={viewportOnce}
          >
            <Link to="/contact" className="ab-intro__btn">
              Work With Us <i className="fa-solid fa-arrow-right" />
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Right column — achievement cards ── */}
        <motion.div
          className="ab-intro__right"
          initial={shouldReduceMotion ? false : { opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
          viewport={viewportOnce}
        >
          <div className="ab-intro__cards">
            {achievements.map((item, i) => (
              <motion.div
                key={item.label}
                className="ab-intro__card"
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
                viewport={viewportOnce}
                whileHover={shouldReduceMotion ? undefined : { y: -6, transition: { duration: 0.22 } }}
              >
                <motion.div
                  className="ab-intro__card-icon"
                  style={{ background: item.color + '18', borderColor: item.color + '35', color: item.color }}
                  whileHover={shouldReduceMotion ? undefined : { rotate: -8, scale: 1.1 }}
                  transition={{ duration: 0.22 }}
                >
                  <i className={item.icon} />
                </motion.div>

                <span className="ab-intro__card-value" style={{ color: item.color }}>
                  {item.value}
                </span>
                <span className="ab-intro__card-label">{item.label}</span>

                {/* Decorative corner circle */}
                <div
                  className="ab-intro__card-bg"
                  style={{ background: item.color + '0d' }}
                />
              </motion.div>
            ))}
          </div>

          {/* Floating decorative rings */}
          <div className="ab-intro__deco" aria-hidden="true">
            <div className="ab-intro__deco-ring" />
            <div className="ab-intro__deco-ring ab-intro__deco-ring--2" />
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default AboutIntroSection
