import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import content from '../../locales/en.json'
import HeroNav from '../../components/ui/HeroNav/HeroNav'
import { fadeUp, staggerContainer, viewportOnce } from '../../utils/motionVariants'
import '../PrivacyPolicy/PrivacyPolicy.css'

const { payment, site } = content

const PaymentPolicy = () => {
  const [activeId, setActiveId] = useState(payment.sections[0].id)
  const shouldReduceMotion = useReducedMotion()
  const pageViewport = shouldReduceMotion ? { once: true } : viewportOnce

  useEffect(() => {
    const sections = payment.sections.map(s => document.getElementById(s.id)).filter(Boolean)
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
      <section className="pp-hero">
        <div className="pp-hero__overlay" />

        <HeroNav dark />

        <div className="pp-hero__body">
          <div className="container">
            <motion.div
              className="pp-hero__breadcrumb"
              initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link to="/">Home</Link>
              <i className="fa-solid fa-angle-right" />
              <span>Payment Policy</span>
            </motion.div>

            <motion.span
              className="pp-hero__label"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {payment.label}
            </motion.span>

            <motion.h1
              className="pp-hero__heading"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              {payment.heading}
            </motion.h1>

            <motion.p
              className="pp-hero__sub"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {payment.subheading}
            </motion.p>

            <motion.div
              className="pp-hero__meta"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              <span className="pp-hero__meta-badge">
                <i className="fa-regular fa-calendar" />
                {payment.lastUpdated}
              </span>
              <span className="pp-hero__meta-badge">
                <i className="fa-solid fa-building-columns" />
                Stratigi 360 FZC
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="pp-content section">
        <div className="container pp-content__grid">

          {/* Sidebar TOC */}
          <motion.aside
            className="pp-toc"
            initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            viewport={pageViewport}
          >
            <div className="pp-toc__inner">
              <p className="pp-toc__heading">
                <i className="fa-solid fa-list-ul" /> Contents
              </p>
              <ul className="pp-toc__list">
                {payment.sections.map((s, i) => (
                  <motion.li
                    key={s.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.28, delay: i * 0.04 }}
                    viewport={pageViewport}
                  >
                    <a
                      href={`#${s.id}`}
                      className={`pp-toc__link ${activeId === s.id ? 'pp-toc__link--active' : ''}`}
                    >
                      <span className="pp-toc__num">{String(i + 1).padStart(2, '0')}</span>
                      {s.title}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="pp-toc__contact">
                <p className="pp-toc__contact-label">Questions?</p>
                <a href={`mailto:${site.email}`} className="pp-toc__contact-link">
                  <i className="fa-solid fa-envelope" />
                  {site.email}
                </a>
              </div>
            </div>
          </motion.aside>

          {/* Main content */}
          <div className="pp-body">
            {/* Intro card */}
            <motion.div
              className="pp-intro-card"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={pageViewport}
            >
              <div className="pp-intro-card__icon">
                <i className="fa-solid fa-file-invoice-dollar" />
              </div>
              <p className="pp-intro-card__text">{payment.intro}</p>
            </motion.div>

            {/* Sections */}
            <motion.div
              className="pp-sections"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={pageViewport}
            >
              {payment.sections.map((s, i) => (
                <motion.div
                  key={s.id}
                  id={s.id}
                  className="pp-section"
                  variants={fadeUp}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -3, transition: { duration: 0.18, ease: 'easeOut' } }
                  }
                >
                  <div className="pp-section__header">
                    <div className="pp-section__icon-wrap">
                      <i className={s.icon} />
                    </div>
                    <div>
                      <span className="pp-section__num">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h2 className="pp-section__title">{s.title}</h2>
                    </div>
                  </div>

                  <div className="pp-section__body">
                    <p className="pp-section__text">{s.body}</p>

                    {s.items && (
                      <div className="pp-section__items">
                        {s.items.map((item, idx) => (
                          <motion.div
                            key={item.label}
                            className="pp-section__item"
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.28, delay: idx * 0.05 }}
                            viewport={pageViewport}
                          >
                            <div className="pp-section__item-icon">
                              <i className={item.icon} />
                            </div>
                            <div>
                              <strong className="pp-section__item-label">{item.label}</strong>
                              <p className="pp-section__item-text">{item.text}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {s.id === 'contact' && (
                      <a href={`mailto:${site.email}`} className="pp-section__cta">
                        <i className="fa-solid fa-envelope" />
                        {site.email}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Consent bar */}
            <motion.div
              className="pp-consent"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={pageViewport}
            >
              <div className="pp-consent__icon">
                <i className="fa-solid fa-handshake" />
              </div>
              <p className="pp-consent__text">
                By engaging our services and making payments, you acknowledge that you have read, understood, and agreed to these payment terms.
              </p>
            </motion.div>
          </div>

        </div>
      </section>
    </>
  )
}

export default PaymentPolicy
