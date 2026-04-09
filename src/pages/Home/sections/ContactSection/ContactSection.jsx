import content from '../../../../locales/en.json'
import './ContactSection.css'

const { contact } = content

const ContactSection = () => {
  return (
    <section className="contact section section--light">
      <div className="container">
        <div className="contact-form-container">
          <h2 className="contact-form__title">Let's Talk - Stratigi Conversations!</h2>
          
          <form className="contact-form">
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
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection