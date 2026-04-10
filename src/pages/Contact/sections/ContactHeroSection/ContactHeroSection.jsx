import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import content from '../../../../locales/en.json'
import Button from '../../../../components/ui/Button/Button'
import HeroNav from '../../../../components/ui/HeroNav/HeroNav'
import heroBg from '../../../../assets/images/contact/Group-193.webp'
import './ContactHeroSection.css'

const { contact } = content

const ContactHeroSection = () => {
  return (
    <section className="ct-hero" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="ct-hero__overlay" />

      {/* ── Navbar ── */}
      <HeroNav dark />

      {/* ── Hero Content ── */}
      <div className="ct-hero__body">
        <div className="container">

          {/* Breadcrumb */}
          <motion.div
            className="ct-hero__breadcrumb"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link to="/">Home</Link>
            <i className="fa-solid fa-angle-right" />
            <span>Contact Us</span>
          </motion.div>

          <motion.span
            className="ct-hero__label"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {contact.label}
          </motion.span>

          <motion.h1
            className="ct-hero__heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            {contact.heading}
          </motion.h1>

          <motion.p
            className="ct-hero__sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {contact.subheading}
          </motion.p>

        </div>
      </div>

    </section>
  )
}

export default ContactHeroSection
