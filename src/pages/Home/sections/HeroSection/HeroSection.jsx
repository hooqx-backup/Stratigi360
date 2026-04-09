import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import content from '../../../../locales/en.json'
import Button from '../../../../components/ui/Button/Button'
import heroBg from '../../../../assets/images/hero-bg.webp'
import logoImg from '../../../../assets/images/STRATIGI-PNG-1.png'
import './HeroSection.css'
import { fadeDown, fadeUp, staggerContainer, viewportOnce } from '../../../../utils/motionVariants'

const { nav, hero } = content

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* ── Navbar – transparent, hero bg shows through ── */}
      <nav className={`hero-nav ${scrolled ? 'hero-nav--scrolled' : ''}`}>
        <div className="container hero-nav__inner">

          <Link to="/" className="hero-nav__logo" onClick={closeMenu}>
            <img src={logoImg} alt="Stratigi360" className="hero-nav__logo-img" />
          </Link>

          <ul className="hero-nav__links">
            {nav.links.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `hero-nav__link ${isActive ? 'hero-nav__link--active' : ''}`
                  }
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hero-nav__actions">
            <Button variant="primary" size="md" href="/calculator">
              {nav.cta}
            </Button>
            <button
              className={`hero-hamburger ${menuOpen ? 'hero-hamburger--open' : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>

        </div>

        {menuOpen && (
          <div className="hero-mobile-menu">
            <ul>
              {nav.links.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      `hero-nav__link ${isActive ? 'hero-nav__link--active' : ''}`
                    }
                    onClick={closeMenu}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <Button variant="primary" size="md" href="/calculator" onClick={closeMenu}>
                  {nav.cta}
                </Button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* ── Hero Content ── */}
      <motion.div
        className="container hero__content"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero__badge" variants={fadeDown}>
          <div className="hero__badge-stars">
            {[1,2,3,4,5].map((s) => <i key={s} className="fa-solid fa-star" />)}
          </div>
          <span className="hero__badge-text">
            Rated <strong>{hero.rating}</strong> Based On <strong>{hero.reviews}</strong> Reviews
          </span>
          <span className="hero__badge-google">
            <svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
          </span>
        </motion.div>

        <motion.h2 className="hero__headline" variants={fadeUp}>
          Want a swift and effective business <strong>setup?</strong>
        </motion.h2>

        <motion.h1 className="hero__subheadline" variants={fadeUp}>
          {hero.subheadline}
        </motion.h1>

        <motion.div variants={fadeUp}>
          <Button variant="primary" size="lg" href="/calculator">
            {hero.cta}
          </Button>
        </motion.div>

      </motion.div>
    </section>
  )
}

export default HeroSection
