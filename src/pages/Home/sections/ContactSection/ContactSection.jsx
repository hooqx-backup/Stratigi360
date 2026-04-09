import { motion } from 'framer-motion'
import './ContactSection.css'
import { fadeUp, staggerContainer, viewportOnce } from '../../../../utils/motionVariants'

const ContactSection = () => {
  return (
    <section className="contact section section--light">
      <div className="container">
        <motion.div
          className="contact-form-container"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.h2 className="contact-form__title" variants={fadeUp}>
            Let's Talk - Stratigi Conversations!
          </motion.h2>

          <motion.form className="contact-form" variants={fadeUp}>
            <div className="form-group">
              <input type="text" placeholder="Name" className="form-input" />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Phone No." className="form-input" />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email" className="form-input" />
            </div>
            <div className="form-group">
              <textarea placeholder="Message Us" className="form-textarea"></textarea>
            </div>
            <button type="submit" className="form-submit-btn">
              <span>➔</span> Send
            </button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection
