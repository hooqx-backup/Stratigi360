import { Link } from 'react-router-dom'
import content from '../../locales/en.json'
import logoImg from '../../assets/images/STRATIGI-PNG-white-1.png'
import './Footer.css'

const { site, social, footer } = content

const SOCIALS = [
  { icon: 'fa-brands fa-facebook-f',  href: social.facebook,  label: 'Facebook' },
  { icon: 'fa-brands fa-instagram',   href: social.instagram, label: 'Instagram' },
  { icon: 'fa-brands fa-linkedin-in', href: social.linkedin,  label: 'LinkedIn' },
  { icon: 'fa-brands fa-youtube',     href: social.youtube,   label: 'YouTube' },
  { icon: 'fa-brands fa-x-twitter',   href: social.twitter,   label: 'Twitter' },
]

const CONTACT = [
  { icon: 'fa-solid fa-phone',       value: site.phone,  href: `tel:${site.phone}` },
  { icon: 'fa-solid fa-envelope',    value: site.email,  href: `mailto:${site.email}` },
  { icon: 'fa-solid fa-location-dot',value: '107 Al Ahli House C, Al Nahda, Dubai, UAE', href: null },
]


const Footer = () => (
  <footer className="footer">
    <div className="footer__overlay" />

    <div className="footer__main">
      <div className="container footer__grid">

        {/* Col 1 — Brand */}
        <div className="footer__col footer__col--brand">
          <img src={logoImg} alt="Stratigi360" className="footer__logo" />
          <p className="footer__desc">{footer.description}</p>
          <div className="footer__socials">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="footer__social"
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={s.icon} />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 — Quick Links */}
        <div className="footer__col">
          <h4 className="footer__heading">{footer.quick_links.heading}</h4>
          <ul className="footer__links">
            {footer.quick_links.links.map((link) => (
              <li key={link.label}>
                <Link to={link.href}>
                  <i className="fa-solid fa-angle-right" />
                  {link.label}
                </Link>
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
                <Link to={link.href}>
                  <i className="fa-solid fa-angle-right" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Contact */}
        <div className="footer__col">
          <h4 className="footer__heading">Contact Us</h4>
          <ul className="footer__contact">
            {CONTACT.map((item) => (
              <li key={item.value} className="footer__contact-item">
                <span className="footer__contact-icon">
                  <i className={item.icon} />
                </span>
                {item.href
                  ? <a href={item.href}>{item.value}</a>
                  : <span>{item.value}</span>
                }
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>

    {/* Bottom bar */}
    <div className="footer__bottom">
      <div className="container">
        <p>{site.copyright}</p>
      </div>
    </div>
  </footer>
)

export default Footer
