import content from '../../../../locales/en.json'
import './ValuesSection.css'

const { values } = content

const getImg = (filename) => {
  try {
    return new URL(`../../../../assets/images/${filename}`, import.meta.url).href
  } catch {
    return null
  }
}

const ValuesSection = () => (
  <section className="values section">
    <div className="container">
      <div className="values__header">
        <h2 className="values__heading">{values.heading}</h2>
        <div className="values__heading-line" />
      </div>
      <div className="values__grid">
        {values.items.map((item) => (
          <div key={item.title} className="values__card">
            <div className="values__card-img-wrap">
              <img
                src={getImg(item.image)}
                alt={item.title}
                className="values__card-img"
                onError={(e) => { e.target.parentElement.classList.add('values__card-img-wrap--empty'); e.target.style.display = 'none' }}
              />
            </div>
            <h3 className="values__card-title">{item.title}</h3>
            <p className="values__card-desc">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default ValuesSection
