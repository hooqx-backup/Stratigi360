import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import content from '../../../../locales/en.json'
import Button from '../../../../components/ui/Button/Button'
import './ContactFormSection.css'
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewportOnce } from '../../../../utils/motionVariants'

const { contact, site, social } = content

const QUICK_CONTACTS = [
  { icon: 'fa-solid fa-phone',         label: 'Call Us',    value: site.phone,  href: `tel:${site.phone}` },
  { icon: 'fa-solid fa-envelope',      label: 'Email Us',   value: site.email,  href: `mailto:${site.email}` },
  { icon: 'fa-brands fa-whatsapp',     label: 'WhatsApp',   value: 'Chat Now',  href: `https://wa.me/${site.whatsapp.replace(/\D/g,'')}` },
]

const SOCIALS = [
  { icon: 'fa-brands fa-facebook-f',  href: social.facebook,  label: 'Facebook' },
  { icon: 'fa-brands fa-instagram',   href: social.instagram, label: 'Instagram' },
  { icon: 'fa-brands fa-linkedin-in', href: social.linkedin,  label: 'LinkedIn' },
  { icon: 'fa-brands fa-youtube',     href: social.youtube,   label: 'YouTube' },
  { icon: 'fa-brands fa-x-twitter',  href: social.twitter,   label: 'Twitter' },
]

const ContactFormSection = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const onChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) {
      toast.error('Please fill in your name and email.')
      return
    }
    toast.success("Message sent! We'll get back to you shortly.")
    setForm({ name: '', phone: '', email: '', message: '' })
  }

  return (
    <>
      {/* ── Quick contact strip ── */}
      <section className="ctf-strip">
        <div className="container">
          <motion.div
            className="ctf-strip__inner"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {QUICK_CONTACTS.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="ctf-strip__item"
                variants={fadeUp}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <span className="ctf-strip__icon">
                  <i className={item.icon} />
                </span>
                <div>
                  <span className="ctf-strip__label">{item.label}</span>
                  <span className="ctf-strip__value">{item.value}</span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Form + Info ── */}
      <section className="ctf section">
        <div className="container">
          <motion.div
            className="ctf__grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >

            {/* Left — Form */}
            <motion.div className="ctf__form-wrap" variants={fadeLeft}>
              <span className="ctf__label">{contact.form.heading}</span>
              <h2 className="ctf__heading">Send Us a Message</h2>
              <p className="ctf__sub">{contact.form.sub}</p>

              <form className="ctf__form" onSubmit={onSubmit} noValidate>
                <div className="ctf__row">
                  <div className="ctf__field">
                    <label className="ctf__field-label">Full Name</label>
                    <input type="text" name="name" value={form.name} onChange={onChange}
                      placeholder="Mohammed Al Rashid" className="ctf__input" required />
                  </div>
                  <div className="ctf__field">
                    <label className="ctf__field-label">Phone Number</label>
                    <input type="tel" name="phone" value={form.phone} onChange={onChange}
                      placeholder="+971 50 000 0000" className="ctf__input" />
                  </div>
                </div>

                <div className="ctf__field">
                  <label className="ctf__field-label">Email Address</label>
                  <input type="email" name="email" value={form.email} onChange={onChange}
                    placeholder="you@example.com" className="ctf__input" required />
                </div>

                <div className="ctf__field">
                  <label className="ctf__field-label">Your Message</label>
                  <textarea name="message" value={form.message} onChange={onChange}
                    placeholder="Tell us about your business goals..." className="ctf__textarea" rows={5} />
                </div>

                <Button variant="primary" type="submit" className="ctf__submit">
                  <i className="fa-solid fa-paper-plane" />
                  {contact.form.button}
                </Button>
              </form>
            </motion.div>

            {/* Right — Info */}
            <motion.div className="ctf__info" variants={fadeRight}>
              <h2 className="ctf__info-heading">Get In Touch</h2>
              <p className="ctf__info-sub">Our team is ready to assist you every step of the way.</p>

              <div className="ctf__info-cards">
                <div className="ctf__info-card">
                  <div className="ctf__info-icon"><i className="fa-solid fa-phone" /></div>
                  <div>
                    <span className="ctf__info-label">{contact.info.phone.label}</span>
                    <a href={`tel:${site.phone}`} className="ctf__info-value">{contact.info.phone.value}</a>
                    <a href={`tel:${site.phone}`} className="ctf__info-value">{contact.info.phone.value2}</a>
                  </div>
                </div>

                <div className="ctf__info-card">
                  <div className="ctf__info-icon"><i className="fa-solid fa-envelope" /></div>
                  <div>
                    <span className="ctf__info-label">{contact.info.email.label}</span>
                    <a href={`mailto:${site.email}`} className="ctf__info-value">{contact.info.email.value}</a>
                  </div>
                </div>

                <div className="ctf__info-card">
                  <div className="ctf__info-icon"><i className="fa-solid fa-location-dot" /></div>
                  <div>
                    <span className="ctf__info-label">{contact.info.address.label}</span>
                    <span className="ctf__info-value">{contact.info.address.value}</span>
                  </div>
                </div>

                <div className="ctf__info-card">
                  <div className="ctf__info-icon"><i className="fa-brands fa-whatsapp" /></div>
                  <div>
                    <span className="ctf__info-label">WhatsApp</span>
                    <a href={`https://wa.me/${site.whatsapp.replace(/\D/g,'')}`}
                      target="_blank" rel="noreferrer" className="ctf__info-value">
                      {site.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Working hours */}
              <div className="ctf__hours">
                <i className="fa-regular fa-clock" />
                <div>
                  <span className="ctf__hours-title">Working Hours</span>
                  <span className="ctf__hours-value">Mon – Sat: 9:00 AM – 6:00 PM</span>
                </div>
              </div>

              {/* Socials */}
              <div className="ctf__socials">
                <span className="ctf__socials-label">Follow Us</span>
                <div className="ctf__socials-row">
                  {SOCIALS.map(s => (
                    <a key={s.label} href={s.href} className="ctf__social"
                      aria-label={s.label} target="_blank" rel="noopener noreferrer">
                      <i className={s.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="ctf-map">
        {/* Top bar */}
        <motion.div
          className="ctf-map__bar"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={viewportOnce}
        >
          <div className="container ctf-map__bar-inner">
            <div className="ctf-map__bar-left">
              <span className="ctf-map__bar-badge">
                <i className="fa-solid fa-location-dot" /> Our Location
              </span>
              <h3 className="ctf-map__bar-title">Find Us in Dubai</h3>
            </div>
            <div className="ctf-map__bar-pills">
              <div className="ctf-map__pill">
                <i className="fa-solid fa-location-dot" />
                <span>{contact.info.address.value}</span>
              </div>
              <div className="ctf-map__pill">
                <i className="fa-solid fa-phone" />
                <a href={`tel:${site.phone}`}>{site.phone}</a>
              </div>
              <div className="ctf-map__pill">
                <i className="fa-regular fa-clock" />
                <span>Mon – Sat: 9 AM – 6 PM</span>
              </div>
            </div>
            <Button
              href="https://maps.google.com/?q=25.2854,55.3707"
              variant="primary"
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
              className="ctf-map__bar-cta"
            >
              <i className="fa-solid fa-diamond-turn-right" />
              Get Directions
            </Button>
          </div>
        </motion.div>

        {/* Full-width map */}
        <div className="ctf-map__iframe">
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
