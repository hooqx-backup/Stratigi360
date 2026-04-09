import { motion } from 'framer-motion'
import content from '../../../../locales/en.json'
import Button from '../../../../components/ui/Button/Button'
import aboutImg from '../../../../assets/images/Group-138.webp'
import './AboutSection.css'

const { about } = content

// --- Custom Smooth Variants ---
const smoothStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.1,
    },
  },
}

// Uses a gentle spring for a very fluid, "breathing" entrance
const smoothRevealLeft = {
  hidden: { opacity: 0, x: -50, y: 20 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 20,
      mass: 1,
    },
  },
}

const smoothRevealRight = {
  hidden: { opacity: 0, x: 50, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 20,
      mass: 1,
    },
  },
}

const AboutSection = () => {
  return (
    <section className="about section">
      <motion.div
        className="container about__inner"
        variants={smoothStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: '-100px' }} // Starts animating slightly before it hits the center
      >
        {/* Text Area */}
        <div className="about__text">
          <motion.h2 className="about__heading" variants={smoothRevealLeft}>
            {about.heading}
          </motion.h2>
          
          <motion.p className="about__body" variants={smoothRevealLeft}>
            {about.body}
          </motion.p>
          
          <motion.p className="about__body" variants={smoothRevealLeft}>
            {about.body2}
          </motion.p>
          
          <motion.div variants={smoothRevealLeft} className="about__btn-wrapper">
            <Button variant="primary" size="md" href="/about">
              {about.cta} &rarr;
            </Button>
          </motion.div>
        </div>

        {/* Image Area */}
        <motion.div className="about__image-wrap" variants={smoothRevealRight}>
          <div className="about__image-inner">
            <img
              src={aboutImg}
              alt="About Stratigi360"
              className="about__img"
              onError={(e) => {
                e.target.parentElement.classList.add('about__image-wrap--placeholder')
                e.target.style.display = 'none'
              }}
            />
          </div>
          {/* Subtle decorative glow behind the image */}
          <div className="about__image-glow" />
        </motion.div>

      </motion.div>
    </section>
  )
}

export default AboutSection