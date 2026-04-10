import { motion } from 'framer-motion'
import content from '../../../../locales/en.json'
import mapImg from '../../../../assets/images/image-2.webp'
import SectionTitle from '../../../../components/ui/SectionTitle/SectionTitle'
import './GlobalReachSection.css'
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewportOnce } from '../../../../utils/motionVariants'

const { global: globalContent, site, social } = content

/* Pulse dot positions (% from top-left of map) */
const DOTS = [
  { top: '52%', left: '62.5%', label: 'Dubai' },
  { top: '35.5%', left: '46.5%', label: 'UK' },
  { top: '33.5%', left: '17.5%', label: 'USA' },
  { top: '38%', left: '49.9%', label: 'India' },
  { top: '45%', left: '22.5%', label: 'Asia' },
  { top: '53%', left: '69%', label: 'Brazil' },
]

const CONTACT_ITEMS = [
  { icon: 'fa-phone',        value: site.phone,        href: `tel:${site.phone}` },
  { icon: 'fa-envelope',     value: site.email,        href: `mailto:${site.email}` },
  { icon: 'fa-brands fa-whatsapp', value: 'WhatsApp Us', href: `https://wa.me/${site.whatsapp}` },
]

const SOCIALS = [
  { icon: 'fa-brands fa-facebook-f',  href: social.facebook,  label: 'Facebook' },
  { icon: 'fa-brands fa-instagram',   href: social.instagram, label: 'Instagram' },
  { icon: 'fa-brands fa-linkedin-in', href: social.linkedin,  label: 'LinkedIn' },
  { icon: 'fa-brands fa-youtube',     href: social.youtube,   label: 'YouTube' },
  { icon: 'fa-brands fa-x-twitter',   href: social.twitter,   label: 'Twitter' },
]

const GlobalReachSection = () => (
  <section className="gr section">
    <div className="container">

      {/* ── Header ── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <SectionTitle
          label={globalContent.label}
          heading={globalContent.heading}
          subheading={globalContent.subheading}
          align="center"
        />
      </motion.div>

      {/* ── Map + dots ── */}
      <motion.div
        className="gr__map-wrap"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <img src={mapImg} alt="Global reach map" className="gr__map-img" />

        {DOTS.map((dot) => (
          <div
            key={dot.label}
            className="gr__dot"
            style={{ top: dot.top, left: dot.left }}
            title={dot.label}
          >
            <span className="gr__dot-ring" />
            <span className="gr__dot-ring gr__dot-ring--delay" />
            <span className="gr__dot-core" />
          </div>
        ))}
      </motion.div>

      {/* ── Stats strip ── */}
      <motion.div
        className="gr__stats"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {globalContent.stats.map((stat, i) => (
          <motion.div key={i} className="gr__stat" variants={fadeUp}>
            <strong className="gr__stat-value">{stat.value}</strong>
            <span className="gr__stat-label">{stat.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Contact + socials strip ── */}
      <motion.div
        className="gr__contact"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.div className="gr__contact-items" variants={fadeLeft}>
          {CONTACT_ITEMS.map((item) => (
            <a key={item.value} href={item.href} className="gr__contact-item">
              <span className="gr__contact-icon">
                <i className={item.icon.startsWith('fa-brands') ? item.icon : `fa-solid ${item.icon}`} />
              </span>
              <span className="gr__contact-value">{item.value}</span>
            </a>
          ))}
        </motion.div>

        <div className="gr__contact-divider" aria-hidden="true" />

        <motion.div className="gr__socials" variants={fadeRight}>
          <span className="gr__socials-label">Follow Us</span>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="gr__social"
              aria-label={s.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={s.icon} />
            </a>
          ))}
        </motion.div>
      </motion.div>

    </div>
  </section>
)

export default GlobalReachSection
