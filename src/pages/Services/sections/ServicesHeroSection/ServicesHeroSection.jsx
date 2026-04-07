import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import content from '../../../../locales/en.json'
import Button from '../../../../components/ui/Button/Button'
import heroBg from '../../../../assets/images/hero-bg.webp'
import './ServicesHeroSection.css'

const { nav } = content

const ServicesHeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="svc-hero" style={{ backgroundImage: `url(${heroBg})` }}>

      <nav className={`svc-hero-nav ${scrolled ? 'svc-hero-nav--scrolled' : ''}`}>
        <div className="container svc-hero-nav__inner">

          <Link to="/" className="svc-hero-nav__logo" onClick={closeMenu}>
            <span className="svc-hero-nav__logo-text">STRATIGI</span>
            <span className="svc-hero-nav__logo-360">360</span>
          </Link>

          <ul className="svc-hero-nav__links">
            {nav.links.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `svc-hero-nav__link ${isActive ? 'svc-hero-nav__link--active' : ''}`
                  }
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="svc-hero-nav__actions">
            <Button variant="primary" size="md" href="/calculator">
              {nav.cta}
            </Button>
            <button
              className={`svc-hero-hamburger ${menuOpen ? 'svc-hero-hamburger--open' : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>

        </div>

        {menuOpen && (
          <div className="svc-hero-mobile-menu">
            <ul>
              {nav.links.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      `svc-hero-nav__link ${isActive ? 'svc-hero-nav__link--active' : ''}`
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

      <div className="container svc-hero__content">
        <h1 className="svc-hero__heading">SERVICES</h1>
        <p className="svc-hero__sub">
          Comprehensive solutions for every stage of your business journey in Dubai and beyond.
        </p>
        <div className="svc-hero__divider" />
      </div>

    </section>
  )
}

export default ServicesHeroSection
