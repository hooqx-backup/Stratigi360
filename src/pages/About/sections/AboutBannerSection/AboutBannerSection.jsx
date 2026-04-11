import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate, useInView, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { viewportOnce, staggerContainer, fadeUp } from '../../../../utils/motionVariants'
import silhouetteImg from '../../../../assets/images/about/Group-155.webp'
import './AboutBannerSection.css'

/* ── Count-up component ─────────────────────────────── */
const CountUp = ({ end, suffix = '', duration = 1.8 }) => {
  const ref   = useRef(null)
  const count = useMotionValue(0)
  const rounded = useTransform(count, v => Math.floor(v))
  const inView  = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const ctrl = animate(count, end, { duration, ease: 'easeOut' })
    return () => ctrl.stop()
  }, [inView, end, duration]) // eslint-disable-line

  return (
    <span ref={ref} style={{ display: 'inline-flex', alignItems: 'baseline' }}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

/* ── Data ───────────────────────────────────────────── */
const stats = [
  { icon: 'fa-solid fa-building',   end: 500, suffix: '+', label: 'Companies Formed'    },
  { icon: 'fa-solid fa-globe',      end: 30,  suffix: '+', label: 'Countries Reached'   },
  { icon: 'fa-solid fa-award',      end: 12,  suffix: '+', label: 'Years of Excellence' },
  { icon: 'fa-solid fa-face-smile', end: 98,  suffix: '%', label: 'Satisfaction Rate'   },
]

const particles = [
  { size: 5,  top: '15%', left: '8%',   dur: '7s',  del: '0s'   },
  { size: 3,  top: '60%', left: '4%',   dur: '9s',  del: '1.5s' },
  { size: 7,  top: '25%', right: '10%', dur: '6s',  del: '0.5s' },
  { size: 4,  top: '75%', right: '6%',  dur: '11s', del: '2.2s' },
  { size: 6,  top: '40%', left: '50%',  dur: '8s',  del: '1s'   },
  { size: 3,  top: '85%', left: '35%',  dur: '10s', del: '0.8s' },
  { size: 5,  top: '55%', right: '40%', dur: '7.5s',del: '3s'   },
]

/* ── Component ─────────────────────────────────────── */
const AboutBannerSection = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      className="ab-cta"
      style={{ backgroundImage: `url(${silhouetteImg})` }}
    >
      <div className="ab-cta__overlay" />
      <div className="ab-cta__pattern" />
      <div className="ab-cta__glow ab-cta__glow--1" />
      <div className="ab-cta__glow ab-cta__glow--2" />

      {/* Floating particles */}
      <div className="ab-cta__particles" aria-hidden="true">
        {particles.map((p, i) => (
          <span
            key={i}
            className="ab-cta__particle"
            style={{
              width:  p.size,
              height: p.size,
              top:    p.top,
              left:   p.left  ?? 'auto',
              right:  p.right ?? 'auto',
              animationDuration: p.dur,
              animationDelay:    p.del,
            }}
          />
        ))}
      </div>

      <div className="container ab-cta__inner">

        {/* Stats row */}
        <motion.div
          className="ab-cta__stats"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              className="ab-cta__stat"
              variants={fadeUp}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.06, y: -4, transition: { duration: 0.2, type: 'spring', stiffness: 280 } }}
            >
              <div className="ab-cta__stat-icon-wrap">
                <div className="ab-cta__stat-icon">
                  <i className={s.icon} />
                </div>
                <div className="ab-cta__stat-icon-ring" />
              </div>
              <span className="ab-cta__stat-value">
                <CountUp end={s.end} suffix={s.suffix} duration={1.8} />
              </span>
              <span className="ab-cta__stat-label">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          className="ab-cta__divider"
          initial={shouldReduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={viewportOnce}
        />

        {/* CTA content */}
        <motion.div
          className="ab-cta__content"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.span
            className="ab-cta__badge"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.82, rotate: -3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 200 }}
            viewport={viewportOnce}
          >
            <i className="fa-solid fa-rocket ab-cta__rocket" /> Ready to Launch?
          </motion.span>

          <h2 className="ab-cta__heading">
            Let's Build Your<br />
            <span className="ab-cta__heading-accent">Success Story Together</span>
          </h2>

          <p className="ab-cta__sub">
            Join hundreds of businesses that have thrived with Stratigi360's expert guidance
            and comprehensive support services in Dubai and beyond.
          </p>

          <div className="ab-cta__actions">
            <Link to="/contact" className="ab-cta__btn ab-cta__btn--primary">
              <span className="ab-cta__btn-shine" />
              Start Your Journey <i className="fa-solid fa-arrow-right ab-cta__btn-arrow" />
            </Link>
            <Link to="/services" className="ab-cta__btn ab-cta__btn--ghost">
              Explore Services
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default AboutBannerSection
