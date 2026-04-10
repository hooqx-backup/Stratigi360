import { motion } from 'framer-motion'
import bannerBg from '../../../../assets/images/hero-bg.webp'
import content from '../../../../locales/en.json'
import Button from '../../../../components/ui/Button/Button'
import './CostCalculatorBanner.css'
import { viewportOnce } from '../../../../utils/motionVariants'

const { 'calc-banner': banner } = content

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay },
  },
})

const floatIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay },
  },
})

const CostCalculatorBanner = () => (
  <section
    className="calc-banner"
    style={{ backgroundImage: `url(${bannerBg})` }}
  >
    <div className="calc-banner__overlay" />
    {/* Decorative background shapes */}
    <div className="calc-banner__bg-circle calc-banner__bg-circle--1" />
    <div className="calc-banner__bg-circle calc-banner__bg-circle--2" />
    <div className="calc-banner__bg-grid" />

    <div className="calc-banner__inner container">
      {/* ---- Left: Copy ---- */}
      <div className="calc-banner__left">
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className="calc-banner__label">
            <i className="fa-solid fa-calculator" />
            {banner.label}
          </span>
        </motion.div>

        <motion.h2
          className="calc-banner__heading"
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {banner.heading}{' '}
          <span className="calc-banner__heading-accent">{banner.headingAccent}</span>
        </motion.h2>

        <motion.p
          className="calc-banner__subheading"
          variants={fadeUp(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {banner.subheading}
        </motion.p>

        <motion.div
          className="calc-banner__ctas"
          variants={fadeUp(0.3)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Button
            variant="primary"
            size="md"
            href="/cost-calculator"
            className="calc-banner__cta--shimmer"
          >
            {banner.cta}
            <i className="fa-solid fa-arrow-right" />
          </Button>
          <Button variant="outline-white" size="md" href="/contact">
            {banner.ctaSecondary}
          </Button>
        </motion.div>

        <motion.div
          className="calc-banner__trust"
          variants={fadeUp(0.4)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {banner.trust.map((item) => (
            <span key={item.text} className="calc-banner__trust-pill">
              <i className={`fa-solid ${item.icon}`} />
              {item.text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ---- Right: Floating stat cards ---- */}
      <div className="calc-banner__right">
        {/* Stat badges */}
        <div className="calc-banner__stats">
          {banner.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="calc-banner__stat"
              variants={floatIn(0.25 + i * 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <span className="calc-banner__stat-value">{stat.value}</span>
              <span className="calc-banner__stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Floating badge */}
        <motion.div
          className="calc-banner__badge"
          variants={floatIn(0.5)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <i className="fa-solid fa-circle-check" />
          <span>No obligation · 100% Free</span>
        </motion.div>
      </div>
    </div>
  </section>
)

export default CostCalculatorBanner
