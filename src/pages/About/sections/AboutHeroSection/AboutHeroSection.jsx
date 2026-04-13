import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useBreadcrumbs } from '../../../../context/NavigationHistoryContext'
import HeroNav from '../../../../components/ui/HeroNav/HeroNav'
import heroBg from '../../../../assets/images/about/Group-154.webp'
import './AboutHeroSection.css'

/* ── Count-up component ─────────────────────────────── */
const CountUp = ({ end, suffix = '', duration = 1.8, delay = 0 }) => {
  const ref  = useRef(null)
  const count = useMotionValue(0)
  const rounded = useTransform(count, v => Math.floor(v))
  const inView  = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const timer = setTimeout(() => {
      const ctrl = animate(count, end, { duration, ease: 'easeOut' })
      return () => ctrl.stop()
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [inView, end, duration, delay]) // eslint-disable-line

  return (
    <span ref={ref} style={{ display: 'inline-flex', alignItems: 'baseline' }}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

/* ── Data ───────────────────────────────────────────── */
const stats = [
  { end: 500, suffix: '+', label: 'Businesses Launched' },
  { end: 12,  suffix: '+', label: 'Years of Excellence'  },
  { end: 98,  suffix: '%', label: 'Client Satisfaction'  },
  { end: 50,  suffix: '+', label: 'Expert Consultants'   },
]

const line2Words = [
  { text: 'Business', accent: false },
  { text: 'Dreams',   accent: false },
  { text: 'Across',       accent: false },
  { text: 'Globe',    accent: true  },
]

/* 6 floating particle configs */
const particles = [
  { size: 6,  top: '18%', left: '12%',  dur: '6s',  del: '0s'   },
  { size: 4,  top: '55%', left: '6%',   dur: '8s',  del: '1.2s' },
  { size: 8,  top: '30%', right: '15%', dur: '7s',  del: '0.4s' },
  { size: 5,  top: '70%', right: '8%',  dur: '9s',  del: '2s'   },
  { size: 3,  top: '45%', left: '48%',  dur: '5s',  del: '0.8s' },
  { size: 7,  top: '82%', left: '30%',  dur: '10s', del: '1.6s' },
]

/* ── Component ─────────────────────────────────────── */
const AboutHeroSection = () => {
  const crumbs = useBreadcrumbs()
  return (
  <section className="ab-hero" style={{ backgroundImage: `url(${heroBg})` }}>
    <div className="ab-hero__overlay" />
    <div className="ab-hero__pattern" />
    <div className="ab-hero__glow ab-hero__glow--tr" />
    <div className="ab-hero__glow ab-hero__glow--bl" />

    {/* Floating particles */}
    <div className="ab-hero__particles" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className="ab-hero__particle"
          style={{
            width:  p.size,
            height: p.size,
            top:    p.top,
            left:   p.left   ?? 'auto',
            right:  p.right  ?? 'auto',
            animationDuration: p.dur,
            animationDelay:    p.del,
          }}
        />
      ))}
    </div>

    <HeroNav dark />

    <div className="container ab-hero__content">

      {/* Breadcrumb */}
      <motion.div
        className="ab-hero__breadcrumb"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {crumbs.map((crumb, i) => (
          <span key={crumb.path} style={{ display: 'contents' }}>
            {i > 0 && <i className="fa-solid fa-angle-right" />}
            {crumb.isCurrent
              ? <span>{crumb.label}</span>
              : <Link to={crumb.path}>{crumb.label}</Link>
            }
          </span>
        ))}
      </motion.div>

      {/* Badge */}
      <motion.span
        className="ab-hero__badge"
        initial={{ opacity: 0, scale: 0.78, rotate: -4 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, delay: 0.22, type: 'spring', stiffness: 220 }}
      >
        <i className="fa-solid fa-star ab-hero__badge-star" /> Our Story
      </motion.span>

      {/* Heading line 1 */}
      <motion.span
        className="ab-hero__line1"
        initial={{ opacity: 0, x: -28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        Empowering
      </motion.span>

      {/* Heading line 2 — word-by-word */}
      <div className="ab-hero__line2">
        {line2Words.map((w, i) => (
          <motion.span
            key={w.text}
            className={w.accent ? 'ab-hero__word--accent' : ''}
            initial={{ opacity: 0, y: 36, rotateX: 40 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.6, delay: 0.48 + i * 0.11, type: 'spring', stiffness: 160 }}
          >
            {w.text}
          </motion.span>
        ))}
      </div>

      {/* Subheading */}
      <motion.p
        className="ab-hero__sub"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.95 }}
      >
        Where your success is not just a goal; it's our mission!
      </motion.p>

      {/* CTAs */}
      <motion.div
        className="ab-hero__actions"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 1.08 }}
      >
        <Link to="/contact" className="ab-hero__btn ab-hero__btn--primary">
          <span className="ab-hero__btn-shine" />
          Get In Touch <i className="fa-solid fa-arrow-right ab-hero__btn-arrow" />
        </Link>
        <Link to="/services" className="ab-hero__btn ab-hero__btn--ghost">
          Our Services
        </Link>
      </motion.div>
    </div>

    {/* Stats bar */}
    <motion.div
      className="ab-hero__stats"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.2 }}
    >
      <div className="container ab-hero__stats-inner">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="ab-hero__stat"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.3 + i * 0.1 }}
            whileHover={{ scale: 1.04, transition: { duration: 0.18 } }}
          >
            <span className="ab-hero__stat-value">
              <CountUp end={s.end} suffix={s.suffix} duration={1.6} delay={1.3 + i * 0.1} />
            </span>
            <span className="ab-hero__stat-label">{s.label}</span>
            <div className="ab-hero__stat-pulse" />
          </motion.div>
        ))}
      </div>
    </motion.div>

    {/* Scroll indicator */}
    <motion.div
      className="ab-hero__scroll"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.6 }}
    >
      <span className="ab-hero__scroll-text">Scroll</span>
      <div className="ab-hero__scroll-track">
        <div className="ab-hero__scroll-thumb" />
      </div>
    </motion.div>
  </section>
  )
}

export default AboutHeroSection
