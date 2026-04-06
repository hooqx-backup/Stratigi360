import content from '../../../../locales/en.json'
import mapAndBg from '../../../../assets/images/image-2.webp'
import './GlobalReachSection.css'

const { contactSite } = content

const GlobalReachSection = () => (
  <section className="global-reach">
    <div className="global-reach__inner">

      {/* Left — World Map Image */}
      <div className="global-reach__map">
        <img src={mapAndBg} alt="Global Reach Map" className="global-reach__map-img" />
      </div>

      {/* Right — Contact Panel */}
      <div
        className="global-reach__panel"
        style={{ backgroundImage: `url(${mapAndBg})` }}
      >
        <div className="global-reach__panel-overlay" />
        <div className="global-reach__panel-content">

          <h2 className="global-reach__contact-heading">Contact Us</h2>

          <ul className="global-reach__contact-list">
            <li>
              <i className="fa-solid fa-phone" />
              <a href={`tel:${contactSite.phone}`}>{contactSite.phone}</a>
            </li>
            <li>
              <i className="fa-brands fa-whatsapp" />
              <a href={`https://wa.me/${contactSite.whatsapp.replace(/\s/g, '')}`}>{contactSite.whatsapp}</a>
            </li>
            <li>
              <i className="fa-solid fa-envelope" />
              <a href={`mailto:${contactSite.email}`}>{contactSite.email}</a>
            </li>
          </ul>

          <h3 className="global-reach__social-heading">Follow Us</h3>

          <div className="global-reach__socials">
            <a href={contactSite.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <i className="fa-brands fa-facebook-f" />
            </a>
            <a href={contactSite.socials.twitter} target="_blank" rel="noreferrer" aria-label="Twitter">
              <i className="fa-brands fa-x-twitter" />
            </a>
            <a href={contactSite.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <i className="fa-brands fa-instagram" />
            </a>
            <a href={contactSite.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in" />
            </a>
            <a href={contactSite.socials.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
              <i className="fa-brands fa-youtube" />
            </a>
          </div>

        </div>
      </div>

    </div>
  </section>
)

export default GlobalReachSection
