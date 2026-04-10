import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import content from '../../locales/en.json'
import HeroNav from '../../components/ui/HeroNav/HeroNav'
import { fadeUp, staggerContainer, viewportOnce } from '../../utils/motionVariants'
import './TermsConditions.css'

const { terms, site } = content

const TermsConditions = () => {
  const [activeId, setActiveId] = useState(terms.sections[0].id)
  const shouldReduceMotion = useReducedMotion()
  const pageViewport = shouldReduceMotion ? { once: true } : viewportOnce

  /* Highlight TOC item on scroll */
  useEffect(() => {
    const sections = terms.sections.map(s => document.getElementById(s.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    sections.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* ── Hero ── */}
      <section className="tc-hero">
        <div className="tc-hero__overlay" />

        <HeroNav dark />

        <div className="tc-hero__body">
          <div className="container">
            <motion.div
              className="tc-hero__breadcrumb"
              initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link to="/">Home</Link>
              <i className="fa-solid fa-angle-right" />
              <span>Terms &amp; Conditions</span>
            </motion.div>

            <motion.span
              className="tc-hero__label"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {terms.label}
            </motion.span>

            <motion.h1
              className="tc-hero__heading"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              {terms.heading}
            </motion.h1>

            <motion.p
              className="tc-hero__sub"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {terms.subheading}
            </motion.p>

            <motion.div
              className="tc-hero__meta"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              <span className="tc-hero__meta-badge">
                <i className="fa-regular fa-calendar" />
                {terms.lastUpdated}
              </span>
              <span className="tc-hero__meta-badge">
                <i className="fa-solid fa-building-columns" />
                Stratigi 360 FZC
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="tc-content section">
        <div className="container tc-content__grid">

          {/* Sidebar TOC */}
          <motion.aside
            className="tc-toc"
            initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            viewport={pageViewport}
          >
            <div className="tc-toc__inner">
              <p className="tc-toc__heading">
                <i className="fa-solid fa-list-ul" /> Contents
              </p>
              <ul className="tc-toc__list">
                {terms.sections.map((s, i) => (
                  <motion.li
                    key={s.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.28, delay: i * 0.04 }}
                    viewport={pageViewport}
                  >
                    <a
                      href={`#${s.id}`}
                      className={`tc-toc__link ${activeId === s.id ? 'tc-toc__link--active' : ''}`}
                    >
                      <span className="tc-toc__num">{String(i + 1).padStart(2, '0')}</span>
                      {s.title}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="tc-toc__contact">
                <p className="tc-toc__contact-label">Questions?</p>
                <a href={`mailto:${site.email}`} className="tc-toc__contact-link">
                  <i className="fa-solid fa-envelope" />
                  {site.email}
                </a>
              </div>
            </div>
          </motion.aside>

          {/* Main content */}
          <div className="tc-body">
            {/* Intro card */}
            <motion.div
              className="tc-intro-card"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={pageViewport}
            >
              <div className="tc-intro-card__icon">
                <i className="fa-solid fa-file-contract" />
              </div>
              <p className="tc-intro-card__text">{terms.intro}</p>
            </motion.div>

            {/* Sections */}
            <motion.div
              className="tc-sections"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={pageViewport}
            >
              {terms.sections.map((s, i) => (
                <motion.div
                  key={s.id}
                  id={s.id}
                  className="tc-section"
                  variants={fadeUp}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -3, transition: { duration: 0.18, ease: 'easeOut' } }
                  }
                >
                  <div className="tc-section__header">
                    <div className="tc-section__icon-wrap">
                      <i className={s.icon} />
                    </div>
                    <div>
                      <span className="tc-section__num">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h2 className="tc-section__title">{s.title}</h2>
                    </div>
                  </div>

                  <div className="tc-section__body">
                    <p className="tc-section__text">{s.body}</p>

                    {s.items && (
                      <div className="tc-section__items">
                        {s.items.map((item, idx) => (
                          <motion.div
                            key={item.label}
                            className="tc-section__item"
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.28, delay: idx * 0.05 }}
                            viewport={pageViewport}
                          >
                            <div className="tc-section__item-icon">
                              <i className={item.icon} />
                            </div>
                            <div>
                              <strong className="tc-section__item-label">{item.label}</strong>
                              <p className="tc-section__item-text">{item.text}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Special CTA for Contact section */}
                    {s.id === 'contact' && (
                      <a href={`mailto:${site.email}`} className="tc-section__cta">
                        <i className="fa-solid fa-envelope" />
                        {site.email}
                      </a>
                    )}

                    {/* Privacy Policy link */}
                    {s.id === 'privacy' && (
                      <Link to="/privacy-policy" className="tc-section__cta">
                        <i className="fa-solid fa-arrow-right" />
                        View Privacy Policy
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom acknowledgment bar */}
            <motion.div
              className="tc-consent"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={pageViewport}
            >
              <div className="tc-consent__icon">
                <i className="fa-solid fa-circle-check" />
              </div>
              <p className="tc-consent__text">
                By using the website, you acknowledge that you have read, understood, and agreed to these terms and conditions.
              </p>
            </motion.div>
          </div>

        </div>
      </section>
    </>
  )
}

export default TermsConditions
