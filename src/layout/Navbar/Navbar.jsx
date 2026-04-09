import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import content from '../../locales/en.json'
import Button from '../../components/ui/Button/Button'
import logoImg from '../../assets/images/STRATIGI-PNG-1.png'
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

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="header">

      {/* ── Navbar – sticky ── */}
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="container navbar__inner">

          {/* Logo */}
          <Link to="/" className="navbar__logo" onClick={closeMenu}>
            <img src={logoImg} alt="Stratigi360" className="navbar__logo-img" />
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
            >
              <span /><span /><span />
            </button>
          </div>

        </div>

        {/* Mobile overlay */}
        {menuOpen && (
          <div className="mobile-menu">
            <ul>
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
              <li>
                <Button variant="primary" size="md" href="/calculator" onClick={closeMenu}>
                  {nav.cta}
                </Button>
              </li>
            </ul>
          </div>
        )}
      </nav>

    </header>
  )
}

export default Navbar
