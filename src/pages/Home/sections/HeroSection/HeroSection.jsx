import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import content from '../../../../locales/en.json'
import Button from '../../../../components/ui/Button/Button'
import HeroNav from '../../../../components/ui/HeroNav/HeroNav'
import heroBg from '../../../../assets/images/hero-bg.webp'
import './HeroSection.css'

const { hero } = content

/* ── Word-by-word animated headline ── */
const SplitWords = ({ text, startDelay = 0, className = '' }) =>
  text.split(' ').map((word, i) => (
    <motion.span
      key={i}
      className={className}
      style={{ display: 'inline-block', marginRight: '0.28em' }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: startDelay + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
    >
      {word}
    </motion.span>
  ))

/* ── Animated count-up for stat values ── */
const CountUp = ({ raw }) => {
  const match = raw.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1]) : 0
  const suffix = match ? match[2] : ''
  const [count, setCount] = useState(0)

  useEffect(() => {
    const steps = 50
    const interval = 1800 / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      setCount(Math.round((target / steps) * step))
      if (step >= steps) clearInterval(timer)
    }, interval)
    return () => clearInterval(timer)
  }, [target])

  return <>{count}{suffix}</>
}

const HeroSection = () => {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  return (
    <section ref={heroRef} className="hero">

      {/* ── Parallax background ── */}
      <motion.div
        className="hero__bg"
        style={{ backgroundImage: `url(${heroBg})`, y: bgY }}
      />
      <div className="hero__overlay" />

      {/* ── Navbar ── */}
      <HeroNav />

      {/* ── Hero Body ── */}
      <div className="hero__body">
        <div className="container">
          <div className="hero__content">

            {/* Google rating badge */}
            <motion.div
              className="hero__badge"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="hero__badge-stars">
                {[1,2,3,4,5].map(s => <i key={s} className="fa-solid fa-star" />)}
              </div>
              <span className="hero__badge-text">
                Rated <strong>{hero.rating}</strong> Based On <strong>{hero.reviews}</strong> Reviews
              </span>
              <span className="hero__badge-google">
                <svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
              </span>
            </motion.div>
            {/* Main headline — animated as one block to keep bold inline */}
            <motion.h1
              className="hero__headline"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {hero.headline} <strong>{hero.headlineBold}</strong>
            </motion.h1>

            {/* Accent subheadline — word by word */}
            <h2 className="hero__subheadline">
              <SplitWords text={hero.subheadline} startDelay={0.45} className="hero__accent-word" />
            </h2>

            {/* CTAs */}
            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0, ease: 'easeOut' }}
            >
              <Button variant="primary" size="lg" href="/calculator">
                {hero.cta}
              </Button>
              <Button variant="secondary" size="lg" href="/contact">
                {hero.ctaSecondary} <i className="fa-solid fa-arrow-right" />
              </Button>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              className="hero__trust"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.15, ease: 'easeOut' }}
            >
              {hero.stats.map((stat, i) => (
                <div key={i} className="hero__stat">
                  <strong className="hero__stat-value">
                    <CountUp raw={stat.value} />
                  </strong>
                  <span className="hero__stat-label">{stat.label}</span>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="hero__scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <i className="fa-solid fa-chevron-down" />
        </motion.div>
      </motion.div>

    </section>
  )
}

export default HeroSection
