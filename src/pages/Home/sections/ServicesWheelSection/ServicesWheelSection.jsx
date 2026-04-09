import './ServicesWheelSection.css'
import servicewheele from '../../../../assets/images/stratigi-360-services-1.webp'

const ServicesWheelSection = () => {
  return (
    <section className="services-wheel-section">
      <div className="services-wheel-container ">
        {/* Assets coming soon */}
        <img src={servicewheele} width="800"  alt="Services Wheel" className="services-wheel-image" />
      </div>
    </section>
  )
}

export default ServicesWheelSection
