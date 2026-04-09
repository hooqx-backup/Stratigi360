import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import content from '../../../../locales/en.json'
import Button from '../../../../components/ui/Button/Button'
import heroBg from '../../../../assets/images/contact/Group-193.webp'
import logoImg from '../../../../assets/images/STRATIGI-PNG-1.png'
import './ContactHeroSection.css'

const { nav, contact } = content

const ContactHeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="ct-hero" style={{ backgroundImage: `url(${heroBg})` }}>

      <nav className={`ct-hero-nav ${scrolled ? 'ct-hero-nav--scrolled' : ''}`}>
        <div className="container ct-hero-nav__inner">

          <Link to="/" className="ct-hero-nav__logo" onClick={closeMenu}>
            <img src={logoImg} alt="Stratigi360" className="ct-hero-nav__logo-img" />
          </Link>

          <ul className="ct-hero-nav__links">
            {nav.links.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `ct-hero-nav__link ${isActive ? 'ct-hero-nav__link--active' : ''}`
                  }
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="ct-hero-nav__actions">
            <Button variant="primary" size="md" href="/calculator">
              {nav.cta}
            </Button>
            <button
              className={`ct-hero-hamburger ${menuOpen ? 'ct-hero-hamburger--open' : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>

        </div>

        {menuOpen && (
          <div className="ct-hero-mobile-menu">
            <ul>
              {nav.links.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      `ct-hero-nav__link ${isActive ? 'ct-hero-nav__link--active' : ''}`
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

      <div className="container ct-hero__content">
        <h1 className="ct-hero__heading">{contact.hero.heading}</h1>
        <p className="ct-hero__sub">{contact.hero.sub}</p>
        <div className="ct-hero__divider" />
      </div>

    </section>
  )
}

export default ContactHeroSection
