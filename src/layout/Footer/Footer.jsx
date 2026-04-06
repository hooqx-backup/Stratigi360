import { Link } from 'react-router-dom'
import content from '../../locales/en.json'
import './Footer.css'

const { site, footer } = content

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

const Footer = () => (
  <footer className="footer">
    <div className="footer__main">
      <div className="container footer__grid">

        {/* Col 1 — Brand */}
        <div className="footer__col footer__col--brand">
          <div className="footer__logo-text">STRATIGI<span>.</span></div>
          <p className="footer__desc">
            Stratigi360 is a tech-powered company designed to cater to both start ups and international businesses' legal &amp; tax necessities globally.
          </p>
          <button className="footer__scroll-top" onClick={scrollToTop} aria-label="Back to top">
            <i className="fa-solid fa-arrow-up" />
          </button>
        </div>

        {/* Col 2 — Quick Links */}
        <div className="footer__col">
          <h4 className="footer__heading">{footer.quick_links.heading}</h4>
          <ul className="footer__links">
            {footer.quick_links.links.map((link) => (
              <li key={link.label}>
                <Link to={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Important Links */}
        <div className="footer__col">
          <h4 className="footer__heading footer__heading--accent">
            {footer.important_links.heading}
          </h4>
          <ul className="footer__links">
            {footer.important_links.links.map((link) => (
              <li key={link.label}>
                <Link to={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>

    {/* Copyright bar — white bg */}
    <div className="footer__bottom">
      <div className="container">
        <p>{site.copyright}</p>
      </div>
    </div>
  </footer>
)

export default Footer
