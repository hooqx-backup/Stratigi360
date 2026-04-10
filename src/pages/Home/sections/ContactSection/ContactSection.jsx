import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import content from '../../../../locales/en.json'
import Button from '../../../../components/ui/Button/Button'
import './ContactSection.css'
import { fadeLeft, fadeRight, staggerContainer, viewportOnce } from '../../../../utils/motionVariants'

const { contact, site, social } = content

const INFO_ITEMS = [
  { icon: 'fa-phone',         label: 'Phone',    value: site.phone,   href: `tel:${site.phone}` },
  { icon: 'fa-envelope',      label: 'Email',    value: site.email,   href: `mailto:${site.email}` },
  { icon: 'fa-location-dot',  label: 'Address',  value: '107 Al Ahli House C, Al Nahda, Dubai, UAE', href: null },
  { icon: 'fa-whatsapp fab',  label: 'WhatsApp', value: 'Chat with us', href: `https://wa.me/${site.whatsapp}` },
]

const SOCIALS = [
  { icon: 'fa-brands fa-facebook-f', href: social.facebook,  label: 'Facebook' },
  { icon: 'fa-brands fa-instagram',  href: social.instagram, label: 'Instagram' },
  { icon: 'fa-brands fa-linkedin-in',href: social.linkedin,  label: 'LinkedIn' },
  { icon: 'fa-brands fa-youtube',    href: social.youtube,   label: 'YouTube' },
]

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) {
      toast.error('Please fill in your name and email.')
      return
    }
    toast.success("Message sent! We'll get back to you shortly.")
    setForm({ name: '', phone: '', email: '', message: '' })
  }

  return (
    <section className="cs section">
      <div className="container">
        <motion.div
          className="cs__card"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* ── Left: info panel ── */}
          <motion.div className="cs__info" variants={fadeLeft}>
            <span className="cs__label">{contact.label}</span>
            <h2 className="cs__heading">{contact.heading}</h2>
            <p className="cs__subheading">{contact.subheading}</p>

            <ul className="cs__info-list">
              {INFO_ITEMS.map((item) => (
                <li key={item.label} className="cs__info-item">
                  <div className="cs__info-icon">
                    <i className={`fa-solid ${item.icon}`} />
                  </div>
                  <div className="cs__info-text">
                    <span className="cs__info-label">{item.label}</span>
                    {item.href
                      ? <a href={item.href} className="cs__info-value">{item.value}</a>
                      : <span className="cs__info-value">{item.value}</span>
                    }
                  </div>
                </li>
              ))}
            </ul>

            <div className="cs__socials">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} className="cs__social" aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div className="cs__form-wrap" variants={fadeRight}>
            <h3 className="cs__form-title">Send Us a Message</h3>
            <p className="cs__form-sub">Fill in the form and our team will get back to you within 24 hours.</p>

            <form className="cs__form" onSubmit={handleSubmit} noValidate>
              <div className="cs__form-row">
                <div className="cs__field">
                  <label className="cs__field-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Mohammed Al Rashid"
                    className="cs__input"
                    required
                  />
                </div>
                <div className="cs__field">
                  <label className="cs__field-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+971 50 000 0000"
                    className="cs__input"
                  />
                </div>
              </div>

              <div className="cs__field">
                <label className="cs__field-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="cs__input"
                  required
                />
              </div>

              <div className="cs__field">
                <label className="cs__field-label">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your business goals..."
                  className="cs__textarea"
                  rows={5}
                />
              </div>

              <Button variant="primary" type="submit" className="cs__submit">
                Send Message
                <i className="fa-solid fa-paper-plane" />
              </Button>
            </form>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection
