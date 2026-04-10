import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import content from '../../locales/en.json'
import Button from '../../components/ui/Button/Button'
import logoImg from '../../assets/images/STRATIGI-PNG-1.png'
import logoWhiteImg from '../../assets/images/STRATIGI-PNG-white-1.png'
import './Navbar.css'

const { nav } = content

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="header">

      {/* ── Navbar – sticky ── */}
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${menuOpen ? 'navbar--menu-open' : ''}`}>
        <div className="container navbar__inner">

          {/* Logo */}
          <Link to="/" className="navbar__logo" onClick={closeMenu}>
            <img
              src={menuOpen ? logoWhiteImg : logoImg}
              alt="Stratigi360"
              className="navbar__logo-img"
            />
          </Link>

          {/* Desktop Links */}
          <ul className="navbar__links">
            {nav.links.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                  }
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="navbar__actions">
            <Button variant="primary" size="md" href="/calculator">
              {nav.cta}
            </Button>
            <button
              className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>

        </div>
      </nav>

      {/* ── Full-screen overlay — always mounted for smooth clip-path animation ── */}
      <div
        className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        {/* Decorative rings */}
        <span className="mobile-menu__ring mobile-menu__ring--1" />
        <span className="mobile-menu__ring mobile-menu__ring--2" />
        <span className="mobile-menu__ring mobile-menu__ring--3" />

        {/* Nav links */}
        <nav className="mobile-menu__nav">
          {nav.links.map((link, i) => (
            <div
              key={link.label}
              className="mobile-menu__item"
              style={{ '--i': i }}
            >
              <span className="mobile-menu__num">0{i + 1}</span>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  `mobile-menu__link ${isActive ? 'mobile-menu__link--active' : ''}`
                }
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            </div>
          ))}
        </nav>

        {/* CTA */}
        <div className="mobile-menu__footer" style={{ '--total': nav.links.length }}>
          <Button variant="primary" size="lg" href="/calculator" onClick={closeMenu}>
            {nav.cta}
          </Button>
        </div>
      </div>

    </header>
  )
}

export default Navbar
