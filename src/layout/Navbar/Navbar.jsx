import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import content from '../../locales/en.json'
import Button from '../../components/ui/Button/Button'
import './Navbar.css'

const { site, nav, social } = content

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

      {/* ── Top Bar – normal flow, above hero ── */}
      <div className="topbar">
        <div className="container topbar__inner">

          {/* Social – left */}
          <div className="topbar__social">
            <a href={social.facebook}  target="_blank" rel="noreferrer" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a>
            <a href={social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a>
            <a href={social.twitter}   target="_blank" rel="noreferrer" aria-label="Twitter"><i className="fa-brands fa-x-twitter" /></a>
            <a href={social.linkedin}  target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" /></a>
            <a href={social.youtube}   target="_blank" rel="noreferrer" aria-label="YouTube"><i className="fa-brands fa-youtube" /></a>
          </div>

          {/* Contact – right */}
          <div className="topbar__contact">
            <a href={`tel:${site.phone}`} className="topbar__item">
              <i className="fa-solid fa-phone" />
              <span>{site.phone_display}</span>
            </a>
            <span className="topbar__divider" />
            <a
              href={`https://wa.me/${site.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="topbar__item"
            >
              <i className="fa-brands fa-whatsapp" />
              <span>{site.phone}</span>
            </a>
            <span className="topbar__divider" />
            <a href={`mailto:${site.email}`} className="topbar__item">
              <i className="fa-regular fa-envelope" />
              <span>{site.email}</span>
            </a>
          </div>

        </div>
      </div>

      {/* ── Navbar – sticky, overlaps hero below ── */}
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="container navbar__inner">

          {/* Logo */}
          <Link to="/" className="navbar__logo" onClick={closeMenu}>
            <span className="navbar__logo-stratigi">STRATIGI</span>
            <span className="navbar__logo-360">360</span>
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
