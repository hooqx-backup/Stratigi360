import { motion, useReducedMotion } from 'framer-motion'
import { viewportOnce, staggerContainer, fadeUp } from '../../../../utils/motionVariants'
import missionImg from '../../../../assets/images/about/Rectangle-356.webp'
import visionImg  from '../../../../assets/images/about/Rectangle-352.webp'
import valuesImg  from '../../../../assets/images/about/Rectangle-354.webp'
import './MissionVisionSection.css'

const items = [
  {
    id:     'mission',
    num:    '01',
    icon:   'fa-solid fa-rocket',
    title:  'Our Mission',
    img:    missionImg,
    text:   "Empower startups, international businesses, and individuals alike. Offer comprehensive legal and tax solutions and enhance professional journeys through effective and digital solutions.",
    accent: '#dd3333',
    points: ['Streamlined company setup', 'Expert legal guidance', 'End-to-end compliance'],
  },
  {
    id:     'vision',
    num:    '02',
    icon:   'fa-solid fa-eye',
    title:  'Our Vision',
    img:    visionImg,
    text:   "Integrity, Innovation, Collaboration – ensuring the highest standards of integrity, fostering innovation, and promoting collaboration to deliver excellence in every service.",
    accent: '#6366f1',
    points: ['Highest integrity standards', 'Fostering innovation', 'Collaborative excellence'],
  },
  {
    id:     'values',
    num:    '03',
    icon:   'fa-solid fa-gem',
    title:  'Our Values',
    img:    valuesImg,
    text:   "We believe in building lasting relationships founded on trust and transparency. Our values guide every decision we make — ensuring that every client receives dedicated, honest, and professional service tailored to their unique journey.",
    accent: '#10b981',
    points: ['Trust & transparency', 'Client-first mindset', 'Long-term relationships'],
  },
]

const MissionVisionSection = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="mv2 section section--light">
      <div className="container">

        {/* Section header */}
        <motion.div
          className="mv2__header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className="mv2__label">
            <i className="fa-solid fa-compass" /> What Drives Us
          </span>
          <h2 className="mv2__heading">
            Mission, Vision &{' '}
            <span className="mv2__heading-accent">Core Values</span>
          </h2>
          <p className="mv2__sub">
            Our guiding principles shape everything we do — from how we serve our clients
            to how we grow as an organisation.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="mv2__grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              className="mv2__card"
              variants={fadeUp}
              whileHover={shouldReduceMotion ? undefined : { y: -8, transition: { duration: 0.25 } }}
            >
              {/* Image strip */}
              <div className="mv2__card-img-wrap">
                <img src={item.img} alt={item.title} className="mv2__card-img" />
                <div className="mv2__card-img-overlay" style={{ background: item.accent + '99' }} />

                {/* Floating number */}
                <span className="mv2__card-num">{item.num}</span>

                {/* Floating icon */}
                <motion.div
                  className="mv2__card-icon"
                  style={{ background: '#fff', color: item.accent }}
                  whileHover={shouldReduceMotion ? undefined : { rotate: -10, scale: 1.12 }}
                  transition={{ duration: 0.22 }}
                >
                  <i className={item.icon} />
                </motion.div>
              </div>

              {/* Body */}
              <div className="mv2__card-body">
                <h3 className="mv2__card-title" style={{ '--mv-accent': item.accent }}>
                  {item.title}
                </h3>
                <p className="mv2__card-text">{item.text}</p>

                {/* Bullet points */}
                <ul className="mv2__card-points">
                  {item.points.map((pt) => (
                    <li key={pt} className="mv2__card-point">
                      <span
                        className="mv2__card-point-dot"
                        style={{ background: item.accent }}
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Accent bottom bar */}
              <div className="mv2__card-bar" style={{ background: item.accent }} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default MissionVisionSection
