import { useState } from 'react'
import content from '../../../../locales/en.json'
import './ContactFormSection.css'

const { contact, site, social } = content

const ContactFormSection = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    // form submission placeholder
  }

  return (
    <>
      {/* ── Form + Info ── */}
      <section className="ct-form-section section section--light">
        <div className="container ct-form-section__inner">

          {/* Left — Form */}
          <div className="ct-form-card">
            <h2 className="ct-form-card__heading">{contact.form.heading}</h2>
            <p className="ct-form-card__sub">{contact.form.sub}</p>

            <form className="ct-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="ct-form__input"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone No."
                className="ct-form__input"
                value={form.phone}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="ct-form__input"
                value={form.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                className="ct-form__textarea"
                value={form.message}
                onChange={handleChange}
                required
              />
              <button type="submit" className="ct-form__btn">
                <i className="fa-solid fa-paper-plane" />
                {contact.form.button}
              </button>
            </form>
          </div>

          {/* Right — Info */}
          <div className="ct-info">
            <h2 className="ct-info__heading">Get In Touch</h2>
            <p className="ct-info__sub">
              Our team is ready to assist you. Reach out via phone, email, or visit us in person.
            </p>

            <div className="ct-info__cards">
              <div className="ct-info__card">
                <div className="ct-info__icon"><i className="fa-solid fa-phone" /></div>
                <div>
                  <span className="ct-info__label">{contact.info.phone.label}</span>
                  <a href={`tel:${site.phone}`} className="ct-info__value">{contact.info.phone.value}</a>
                  <a href={`tel:${site.phone}`} className="ct-info__value">{contact.info.phone.value2}</a>
                </div>
              </div>

              <div className="ct-info__card">
                <div className="ct-info__icon"><i className="fa-solid fa-envelope" /></div>
                <div>
                  <span className="ct-info__label">{contact.info.email.label}</span>
                  <a href={`mailto:${site.email}`} className="ct-info__value">{contact.info.email.value}</a>
                </div>
              </div>

              <div className="ct-info__card">
                <div className="ct-info__icon"><i className="fa-solid fa-location-dot"/></div>
                <div>
                  <span className="ct-info__label">{contact.info.address.label}</span>
                  <span className="ct-info__value">{contact.info.address.value}</span>
                </div>
              </div>

              <div className="ct-info__card">
                <div className="ct-info__icon"><i className="fa-brands fa-whatsapp" /></div>
                <div>
                  <span className="ct-info__label">WhatsApp</span>
                  <a
                    href={`https://wa.me/${site.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="ct-info__value"
                  >
                    {site.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="ct-info__social">
              <a href={social.facebook}  target="_blank" rel="noreferrer" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a>
              <a href={social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a>
              <a href={social.twitter}   target="_blank" rel="noreferrer" aria-label="Twitter"><i className="fa-brands fa-x-twitter" /></a>
              <a href={social.linkedin}  target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" /></a>
              <a href={social.youtube}   target="_blank" rel="noreferrer" aria-label="YouTube"><i className="fa-brands fa-youtube" /></a>
            </div>
          </div>

        </div>
      </section>

      {/* ── Map ── */}
      <section className="ct-map-section">
        <div className="container ct-map-section__header">
          <h2 className="ct-map-section__heading">{contact.map.heading}</h2>
          <p className="ct-map-section__sub">{contact.map.sub}</p>
        </div>
        <div className="ct-map-section__embed">
          <iframe
            title="Stratigi360 Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.2!2d55.3707!3d25.2854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d3c8b2e6e3d%3A0xa1b2c3d4e5f60001!2sAl%20Nahda%2C%20Dubai!5e0!3m2!1sen!2sae!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  )
}

export default ContactFormSection
