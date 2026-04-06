import { Link } from 'react-router-dom'
import content from '../../../../locales/en.json'
import './GlobalContactSection.css'

const { footer } = content

const GlobalContactSection = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <div className="container site-footer__grid">

          {/* Col 1 — Brand */}
          <div className="site-footer__brand">
            <div className="site-footer__logo">STRATIGI<span>.</span></div>
            <p className="site-footer__desc">
              Stratigi360 is a tech-powered company designed to cater to both start ups and international businesses' legal &amp; tax necessities globally.
            </p>
            <button className="site-footer__scroll-top" onClick={scrollToTop} aria-label="Back to top">
              <i className="fa-solid fa-arrow-up" />
            </button>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="site-footer__col">
            <h3 className="site-footer__col-heading">{footer.quick_links.heading}</h3>
            <ul className="site-footer__links">
              {footer.quick_links.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Important Links */}
          <div className="site-footer__col">
            <h3 className="site-footer__col-heading site-footer__col-heading--accent">
              {footer.important_links.heading}
            </h3>
            <ul className="site-footer__links">
              {footer.important_links.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="site-footer__bottom">
        <p>Stratigi 360 @ copyright 2024-2025</p>
      </div>
    </footer>
  )
}

export default GlobalContactSection
