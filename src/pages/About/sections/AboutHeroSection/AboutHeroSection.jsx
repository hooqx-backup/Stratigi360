import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import content from '../../../../locales/en.json'
import Button from '../../../../components/ui/Button/Button'
import heroBg from '../../../../assets/images/hero-bg.webp'
import './AboutHeroSection.css'

const { nav } = content

const AboutHeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="about-hero" style={{ backgroundImage: `url(${heroBg})` }}>

      <nav className={`about-hero-nav ${scrolled ? 'about-hero-nav--scrolled' : ''}`}>
        <div className="container about-hero-nav__inner">

          <Link to="/" className="about-hero-nav__logo" onClick={closeMenu}>
            <span className="about-hero-nav__logo-text">STRATIGI</span>
            <span className="about-hero-nav__logo-360">360</span>
          </Link>

          <ul className="about-hero-nav__links">
            {nav.links.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `about-hero-nav__link ${isActive ? 'about-hero-nav__link--active' : ''}`
                  }
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="about-hero-nav__actions">
            <Button variant="primary" size="md" href="/calculator">
              {nav.cta}
            </Button>
            <button
              className={`about-hero-hamburger ${menuOpen ? 'about-hero-hamburger--open' : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>

        </div>

        {menuOpen && (
          <div className="about-hero-mobile-menu">
            <ul>
              {nav.links.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      `about-hero-nav__link ${isActive ? 'about-hero-nav__link--active' : ''}`
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

      <div className="container about-hero__content">
        <p className="about-hero__eyebrow">Who We Are</p>
        <h1 className="about-hero__heading">About Us</h1>
        <p className="about-hero__sub">
          Welcome to Stratigi360 – where your success is not just a goal; it's our mission!
        </p>
      </div>

    </section>
  )
}

export default AboutHeroSection
