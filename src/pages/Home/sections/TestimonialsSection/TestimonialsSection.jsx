import content from '../../../../locales/en.json'
import SectionTitle from '../../../../components/ui/SectionTitle/SectionTitle'
import './TestimonialsSection.css'

const { testimonials } = content

const StarRating = ({ rating }) => (
  <div className="stars" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fa-solid fa-star ${i < rating ? 'stars__star--filled' : 'stars__star--empty'}`}
      />
    ))}
  </div>
)

const TestimonialsSection = () => {
  return (
    <section className="testimonials section section--light">
      <div className="container">
        {/* The Title Section */}
        <div className="testimonials__header">
            <h2 className="testimonials__title">Testimonials</h2>
            <div className="testimonials__underline"></div>
        </div>

        <div className="testimonials__grid">
          {testimonials.items.map((item) => (
            <div key={item.name} className="testimonial-card">
              {/* 1. Avatar at the top */}
              <div className="testimonial-card__avatar">
                {item.image ? (
                   <img src={item.image} alt={item.name} />
                ) : (
                   item.name.charAt(0)
                )}
              </div>

              {/* 2. Name */}
              <h3 className="testimonial-card__name">{item.name}</h3>

              {/* 3. Stars */}
              <StarRating rating={item.rating} />

              {/* 4. Review Text */}
              <p className="testimonial-card__review">{item.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection