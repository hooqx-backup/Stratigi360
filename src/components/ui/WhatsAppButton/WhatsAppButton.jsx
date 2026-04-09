import content from '../../../locales/en.json'
import './WhatsAppButton.css'

const WhatsAppButton = () => {
  const { whatsapp } = content.site
  const url = `https://wa.me/${whatsapp.replace(/\D/g, '')}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="Chat on WhatsApp"
    >
      <i className="fa-brands fa-whatsapp" />
    </a>
  )
}

export default WhatsAppButton
