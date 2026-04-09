import content from '../../locales/en.json'
import './Topbar.css'

const { site, social } = content

const Topbar = () => (
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
          target="_blank" rel="noreferrer"
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
)

export default Topbar
