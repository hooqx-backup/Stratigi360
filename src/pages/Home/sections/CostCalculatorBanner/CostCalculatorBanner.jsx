import { motion } from 'framer-motion'
import bannerBg from '../../../../assets/images/hero-bg.webp'
import './CostCalculatorBanner.css'
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '../../../../utils/motionVariants'

const CostCalculatorBanner = () => (
  <section
    className="calc-banner"
    style={{ backgroundImage: `url(${bannerBg})` }}
  >
    <div className="calc-banner__overlay" />
    <motion.div
      className="calc-banner__content"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.h2 className="calc-banner__heading" variants={fadeUp}>
        Discover Your Business Setup Cost Instantly – Streamlined Solutions for Your Entrepreneurial Journey!
      </motion.h2>
      <motion.a
        href="/cost-calculator"
        className="calc-banner__btn"
        variants={scaleIn}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        COST CALCULATOR
      </motion.a>
    </motion.div>
  </section>
)

export default CostCalculatorBanner
