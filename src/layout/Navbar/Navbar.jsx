import { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import content from '../../locales/en.json'
import Button from '../../components/ui/Button/Button'
import logoImg from '../../assets/images/STRATIGI-PNG-1.png'
import logoWhiteImg from '../../assets/images/STRATIGI-PNG-white-1.png'
import './Navbar.css'

const { nav } = content
const MENU_ANIMATION_MS = 600

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuClosing, setMenuClosing] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeTimerRef = useRef(null)

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const closeMenu = () => {
    if (!menuOpen) return
    setMenuOpen(false)
    setMenuClosing(true)
    clearCloseTimer()
    closeTimerRef.current = window.setTimeout(() => {
      setMenuClosing(false)
      closeTimerRef.current = null
    }, MENU_ANIMATION_MS)
  }

  const openMenu = () => {
    clearCloseTimer()
    setMenuClosing(false)
    setMenuOpen(true)
  }

  const toggleMenu = () => {
    if (menuOpen) {
      closeMenu()
      return
    }
    openMenu()
  }

  const menuVisualOpen = menuOpen || menuClosing

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuVisualOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuVisualOpen])

  useEffect(() => {
    return () => clearCloseTimer()
  }, [])

  return (
    <header className="header">

      {/* ── Navbar – sticky ── */}
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${menuVisualOpen ? 'navbar--menu-open' : ''}`}>
        <div className="container navbar__inner">

          {/* Logo */}
          <Link to="/" className="navbar__logo" onClick={closeMenu}>
            <img
              src={menuVisualOpen ? logoWhiteImg : logoImg}
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
              className={`hamburger ${menuVisualOpen ? 'hamburger--open' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={menuVisualOpen}
            >
              <span /><span /><span />
            </button>
          </div>

        </div>
      </nav>

      {/* ── Full-screen overlay — always mounted for smooth clip-path animation ── */}
      <div
        className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}
        aria-hidden={!menuVisualOpen}
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
