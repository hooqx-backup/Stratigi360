import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import './NotFound.css'

/* ── Floating particles config ── */
const particles = [
  { size: 6,  top: '14%', left: '9%',   dur: '7s',  del: '0s'   },
  { size: 4,  top: '58%', left: '5%',   dur: '9s',  del: '1.4s' },
  { size: 8,  top: '25%', right: '12%', dur: '6s',  del: '0.6s' },
  { size: 5,  top: '72%', right: '7%',  dur: '10s', del: '2.2s' },
  { size: 3,  top: '42%', left: '50%',  dur: '5s',  del: '0.9s' },
  { size: 7,  top: '85%', left: '28%',  dur: '8s',  del: '1.8s' },
  { size: 4,  top: '33%', left: '72%',  dur: '7.5s',del: '0.3s' },
  { size: 5,  top: '65%', left: '38%',  dur: '6.5s',del: '3s'   },
]

/* ── Quick-links ── */
const links = [
  { icon: 'fa-house',        label: 'Home',     to: '/'        },
  { icon: 'fa-circle-info',  label: 'About',    to: '/about'   },
  { icon: 'fa-briefcase',    label: 'Services', to: '/services'},
  { icon: 'fa-envelope',     label: 'Contact',  to: '/contact' },
]

/* ── Glitch letters ── */
const digits = ['4', '0', '4']

const NotFound = () => (
  <section className="nf">
    {/* Background layers */}
    <div className="nf__overlay" />
    <div className="nf__pattern" />
    <div className="nf__glow nf__glow--tr" />
    <div className="nf__glow nf__glow--bl" />
    <div className="nf__glow nf__glow--center" />

    {/* Floating particles */}
    <div className="nf__particles" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className="nf__particle"
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

    {/* Content */}
    <div className="container nf__content">

      {/* Badge */}
      <motion.span
        className="nf__badge"
        initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 240 }}
      >
        <i className="fa-solid fa-triangle-exclamation nf__badge-icon" />
        Page Not Found
      </motion.span>

      {/* 404 glitch digits */}
      <div className="nf__digits" aria-label="404">
        {digits.map((d, i) => (
          <motion.span
            key={i}
            className={`nf__digit${i === 1 ? ' nf__digit--zero' : ''}`}
            data-text={d}
            initial={{ opacity: 0, y: 60, rotateX: 50 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.7, delay: 0.22 + i * 0.14, type: 'spring', stiffness: 140 }}
          >
            {d}
          </motion.span>
        ))}
      </div>

      {/* Divider line */}
      <motion.div
        className="nf__divider"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.7, ease: 'easeOut' }}
      />

      {/* Headline */}
      <motion.h1
        className="nf__heading"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.82 }}
      >
        Oops! You've Wandered Off the Map
      </motion.h1>

      {/* Subtext */}
      <motion.p
        className="nf__sub"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.96 }}
      >
        The page you're looking for doesn't exist or has been moved. Let us guide
        you back to the right destination.
      </motion.p>

      {/* Primary CTA */}
      <motion.div
        className="nf__actions"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 1.1 }}
      >
        <Link to="/" className="nf__btn nf__btn--primary">
          <span className="nf__btn-shine" />
          <i className="fa-solid fa-house" />
          Back to Home
          <i className="fa-solid fa-arrow-right nf__btn-arrow" />
        </Link>
        <Link to="/contact" className="nf__btn nf__btn--ghost">
          <i className="fa-solid fa-headset" />
          Talk to Us
        </Link>
      </motion.div>

      {/* Quick nav */}
      <motion.div
        className="nf__quick"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.28 }}
      >
        <span className="nf__quick-label">Or explore</span>
        <div className="nf__quick-links">
          {links.map((l, i) => (
            <motion.div
              key={l.to}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.38 + i * 0.08 }}
            >
              <Link to={l.to} className="nf__quick-link">
                <span className="nf__quick-icon">
                  <i className={`fa-solid ${l.icon}`} />
                </span>
                {l.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>

    {/* Corner decoration */}
    <div className="nf__corner nf__corner--tl" aria-hidden="true" />
    <div className="nf__corner nf__corner--br" aria-hidden="true" />
  </section>
)

export default NotFound
