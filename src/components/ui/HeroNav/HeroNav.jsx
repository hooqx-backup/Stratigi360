import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink } from 'react-router-dom'
import content from '../../../locales/en.json'
import Button from '../Button/Button'
import logoDark  from '../../../assets/images/STRATIGI-PNG-1.png'
import logoWhite from '../../../assets/images/STRATIGI-PNG-white-1.png'
import './HeroNav.css'

const { nav } = content

/**
 * Shared sticky navbar used by every page/hero section.
 *
 * Props
 * ─────
 * dark  {boolean}  Pass when the hero background is dark (links and logo
 *                  start white and transition to dark on scroll).
 */
const HeroNav = ({ dark = false }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const currentLogo =
    menuOpen          ? logoWhite :
    dark && !scrolled ? logoWhite :
                        logoDark

  const navClass = [
    'hn',
    dark    && 'hn--dark',
    scrolled && 'hn--scrolled',
    menuOpen && 'hn--menu-open',
  ].filter(Boolean).join(' ')

  const overlay = (
    <div
      className={`hn__overlay ${menuOpen ? 'hn__overlay--open' : ''}`}
      aria-hidden={!menuOpen}
    >
      <span className="hn__ring hn__ring--1" aria-hidden="true" />
      <span className="hn__ring hn__ring--2" aria-hidden="true" />
      <span className="hn__ring hn__ring--3" aria-hidden="true" />

      <nav className="hn__mobile-nav" aria-label="Mobile navigation">
        {nav.links.map((link, i) => (
          <div
            key={link.label}
            className="hn__mobile-item"
            style={{ '--i': i }}
          >
            <NavLink
              to={link.href}
              className={({ isActive }) =>
                `hn__mobile-link${isActive ? ' hn__mobile-link--active' : ''}`
              }
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          </div>
        ))}
      </nav>

      <div className="hn__mobile-footer" style={{ '--total': nav.links.length }}>
        <Button variant="primary" size="sm" href="/calculator" onClick={closeMenu}>
          {nav.cta}
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <nav className={navClass} aria-label="Main navigation">
        <div className="container hn__inner">

          <Link to="/" className="hn__logo" onClick={closeMenu} aria-label="Stratigi360 home">
            <img src={currentLogo} alt="Stratigi360" className="hn__logo-img" />
          </Link>

          <ul className="hn__links" role="list">
            {nav.links.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `hn__link${isActive ? ' hn__link--active' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hn__actions">
            <Button variant="primary" size="md" href="/calculator">
              {nav.cta}
            </Button>
            <button
              className={`hn__hamburger${menuOpen ? ' hn__hamburger--open' : ''}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-overlay"
            >
              <span />
              <span />
              <span />
            </button>
          </div>

        </div>
      </nav>

      {createPortal(overlay, document.body)}
    </>
  )
}

export default HeroNav
