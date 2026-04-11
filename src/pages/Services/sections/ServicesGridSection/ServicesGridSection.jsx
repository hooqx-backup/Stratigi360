import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import content from '../../../../locales/en.json'
import { viewportOnce, staggerContainer, fadeUp } from '../../../../utils/motionVariants'
import './ServicesGridSection.css'

const { services } = content

/* ── Animation variants ── */
const headerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 40, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' },
  }),
  exit:    { opacity: 0, y: -20, scale: 0.94, transition: { duration: 0.22 } },
}

/* Icon background colours per category */
const categoryColour = {
  Consultation:          'rgba(221,51,51,0.10)',
  'Business Setup':      'rgba(37,43,59,0.08)',
  'Digital & Marketing': 'rgba(99,102,241,0.10)',
}

/* ── Service Card with 3D tilt + spotlight ── */
const ServiceCard = ({ svc, i }) => {
  const ref    = useRef(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const rotateX = useTransform(mouseY, [0, 1], [4, -4])
  const rotateY = useTransform(mouseX, [0, 1], [-4, 4])

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width
    const ny = (e.clientY - rect.top)  / rect.height
    mouseX.set(nx)
    mouseY.set(ny)
    ref.current.style.setProperty('--mx', `${nx * 100}%`)
    ref.current.style.setProperty('--my', `${ny * 100}%`)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      className="sg-card"
      custom={i}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -10, transition: { duration: 0.3, type: 'spring', stiffness: 200, damping: 20 } }}
    >
      {/* Cursor-tracking spotlight */}
      <div className="sg-card__spotlight" />
      {/* Shimmer sweep */}
      <div className="sg-card__shimmer" />

      {/* Number badge */}
      <span className="sg-card__num">
        {String(i + 1).padStart(2, '0')}
      </span>

      {/* Icon */}
      <div
        className="sg-card__icon-wrap"
        style={{ background: categoryColour[svc.category] ?? 'rgba(221,51,51,0.10)' }}
      >
        <i className={`fa-solid ${svc.icon} sg-card__icon`} />
        <div className="sg-card__icon-ring" />
      </div>

      {/* Category tag */}
      <span className="sg-card__category">{svc.category}</span>

      <h3 className="sg-card__title">{svc.title}</h3>
      <p className="sg-card__desc">{svc.description}</p>

      <Link to="/contact" className="sg-card__cta">
        Get Started <i className="fa-solid fa-arrow-right sg-card__cta-arrow" />
      </Link>

      <div className="sg-card__glow" />
    </motion.div>
  )
}

const ServicesGridSection = () => {
  const [activeTab, setActiveTab] = useState('All')

  const filtered = activeTab === 'All'
    ? services.items
    : services.items.filter((s) => s.category === activeTab)

  const handleTab = (tab) => {
    if (tab !== activeTab) setActiveTab(tab)
  }

  return (
    <>
      {/* ── Grid section ──────────────────────────────────── */}
      <section className="sg-grid section">
        <div className="container">

          {/* Section header */}
          <motion.div
            className="sg-grid__header"
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.span className="sg-grid__label" variants={fadeUp}>
              <i className="fa-solid fa-layer-group sg-grid__label-icon" />
              {services.label}
            </motion.span>

            <motion.h2 className="sg-grid__heading" variants={fadeUp}>
              {services.heading}
            </motion.h2>

            <motion.div className="sg-grid__line" variants={{
              hidden:  { scaleX: 0 },
              visible: { scaleX: 1, transition: { duration: 0.7, ease: 'easeOut' } },
            }} />

            <motion.p className="sg-grid__sub" variants={fadeUp}>
              {services.subheading}
            </motion.p>
          </motion.div>

          {/* Tabs */}
          <div className="sg-tabs-scroll">
          <motion.div
            className="sg-tabs"
            role="tablist"
            aria-label="Service categories"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {services.tabs.map((tab) => {
              const count = tab === 'All'
                ? services.items.length
                : services.items.filter((s) => s.category === tab).length
              return (
                <motion.button
                  key={tab}
                  role="tab"
                  aria-selected={activeTab === tab}
                  className={`sg-tab ${activeTab === tab ? 'sg-tab--active' : ''}`}
                  onClick={() => handleTab(tab)}
                  variants={fadeUp}
                  whileHover={{ y: -2, transition: { duration: 0.18 } }}
                  whileTap={{ scale: 0.96 }}
                >
                  {tab}
                  <span className="sg-tab__count">{count}</span>
                  {activeTab === tab && (
                    <motion.span
                      className="sg-tab__pill"
                      layoutId="activeTabPill"
                      transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </motion.div>
          </div>

          {/* Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="sg-grid__grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.22 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              {filtered.map((svc, i) => (
                <ServiceCard key={svc.title} svc={svc} i={i} />
              ))}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* ── CTA banner ────────────────────────────────────── */}
      <section className="sg-cta">
        <div className="sg-cta__glow" />
        <div className="sg-cta__pattern" />

        <div className="container sg-cta__inner">
          <motion.div
            className="sg-cta__content"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.span className="sg-cta__badge" variants={fadeUp}>
              <i className="fa-solid fa-rocket" /> Ready to Start?
            </motion.span>

            <motion.h2 className="sg-cta__heading" variants={fadeUp}>
              Let's Build Your Business<br />
              <span className="sg-cta__heading-accent">The Right Way</span>
            </motion.h2>

            <motion.p className="sg-cta__sub" variants={fadeUp}>
              Talk to one of our consultants today and get a personalised plan tailored to your goals.
            </motion.p>

            <motion.div className="sg-cta__actions" variants={fadeUp}>
              <Link to="/contact" className="sg-cta__btn sg-cta__btn--primary">
                <span className="sg-cta__btn-shine" />
                Book a Free Consultation <i className="fa-solid fa-arrow-right sg-cta__btn-arrow" />
              </Link>
              <Link to="/calculator" className="sg-cta__btn sg-cta__btn--ghost">
                <i className="fa-solid fa-calculator" /> Cost Calculator
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust pills */}
          <motion.div
            className="sg-cta__trust"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {[
              { icon: 'fa-bolt',          text: 'Instant Consultation' },
              { icon: 'fa-shield-halved', text: 'No Hidden Fees'       },
              { icon: 'fa-clock',         text: 'Fast Setup'           },
            ].map((t) => (
              <motion.span key={t.text} className="sg-cta__trust-pill" variants={fadeUp}>
                <i className={`fa-solid ${t.icon}`} /> {t.text}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default ServicesGridSection
