import { motion, useReducedMotion } from 'framer-motion'
import { viewportOnce, staggerContainer, fadeUp } from '../../../../utils/motionVariants'
import simplifiedImg  from '../../../../assets/images/Simplified-Success.webp'
import excellenceImg  from '../../../../assets/images/Comprehensive-Excellence.webp'
import partnershipImg from '../../../../assets/images/Personalized-Partnership.webp'
import './AboutWhyUsSection.css'

const cards = [
  {
    num:   '01',
    img:   simplifiedImg,
    icon:  'fa-solid fa-bolt',
    tag:   'Efficiency',
    title: 'Simplified Success',
    desc:  'Choose us for effortless solutions, from setting up your company to seamless compliance — your journey simplified.',
    perks: ['One-stop solution', 'Fast turnaround', 'Zero paperwork stress'],
  },
  {
    num:   '02',
    img:   excellenceImg,
    icon:  'fa-solid fa-star',
    tag:   'Quality',
    title: 'Comprehensive Excellence',
    desc:  'Opt for 360 Stratigi for all-encompassing services, ensuring success with innovative solutions and unwavering integrity.',
    perks: ['Full-service coverage', 'Proven track record', 'Transparent pricing'],
  },
  {
    num:   '03',
    img:   partnershipImg,
    icon:  'fa-solid fa-handshake',
    tag:   'Partnership',
    title: 'Personalized Partnership',
    desc:  "Select us to experience a dynamic partnership. We're not just about business; we're here to make every professional aspect of your life excellent.",
    perks: ['Dedicated consultant', 'Tailored strategies', 'Long-term support'],
  },
]

const AboutWhyUsSection = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="ab-why2 section">
      <div className="container">

        {/* Header */}
        <motion.div
          className="ab-why2__header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className="ab-why2__label">
            <i className="fa-solid fa-shield-halved" /> Our Advantage
          </span>
          <h2 className="ab-why2__heading">
            Why Businesses Choose{' '}
            <span className="ab-why2__heading-accent">Stratigi360</span>
          </h2>
          <p className="ab-why2__sub">
            Three core pillars that make us the preferred choice for businesses
            across the UAE and beyond.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="ab-why2__grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              className="ab-why2__card"
              variants={fadeUp}
              whileHover={shouldReduceMotion ? undefined : { y: -8, transition: { duration: 0.25 } }}
            >
              {/* Image */}
              <div className="ab-why2__img-wrap">
                <img src={card.img} alt={card.title} className="ab-why2__img" />
                <div className="ab-why2__img-overlay" />

                {/* Number badge */}
                <span className="ab-why2__num">{card.num}</span>

                {/* Tag chip */}
                <span className="ab-why2__tag">{card.tag}</span>

                {/* Icon bubble */}
                <motion.div
                  className="ab-why2__icon"
                  whileHover={shouldReduceMotion ? undefined : { rotate: -10, scale: 1.12 }}
                  transition={{ duration: 0.22 }}
                >
                  <i className={card.icon} />
                </motion.div>
              </div>

              {/* Body */}
              <div className="ab-why2__body">
                <h3 className="ab-why2__title">{card.title}</h3>
                <p className="ab-why2__desc">{card.desc}</p>

                <ul className="ab-why2__perks">
                  {card.perks.map((perk, i) => (
                    <motion.li
                      key={perk}
                      className="ab-why2__perk"
                      initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.06 }}
                      viewport={viewportOnce}
                    >
                      <i className="fa-solid fa-check ab-why2__perk-check" />
                      {perk}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Hover accent line at bottom */}
              <div className="ab-why2__accent-line" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default AboutWhyUsSection
