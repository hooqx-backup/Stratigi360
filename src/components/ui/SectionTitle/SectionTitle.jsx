import './SectionTitle.css'

const SectionTitle = ({
  label,
  heading,
  subheading,
  align = 'center',
  light = false,
}) => {
  return (
    <div className={`section-title section-title--${align} ${light ? 'section-title--light' : ''}`}>
      {label && <span className="section-title__label">{label}</span>}
      {heading && <h2 className="section-title__heading">{heading}</h2>}
      {subheading && <p className="section-title__sub">{subheading}</p>}
    </div>
  )
}

export default SectionTitle
