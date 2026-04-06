import content from '../../../../locales/en.json'
import workImg from '../../../../assets/images/Group-139.webp'
import './WorkProcess.css'

const { process } = content

const WorkProcess = () => {
  return (
    <section className="process section">
      <div className="container process__inner">

        {/* Left: title + steps */}
        <div className="process__left">
          <h2 className="process__heading">{process.heading}</h2>
          <div className="process__heading-line" />

          <div className="process__steps">
            {process.steps.map((step) => (
              <div key={step.number} className="process__step">
                <div className="process__step-num">{step.number}</div>
                <div className="process__step-content">
                  <h3 className="process__step-title">{step.title}</h3>
                  <p className="process__step-desc">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: image */}
        <div className="process__image-wrap">
          <img
            src={workImg}
            alt="Work Process"
            className="process__img"
            onError={(e) => { e.target.style.display = 'none' }}
          />
        </div>

      </div>
    </section>
  )
}

export default WorkProcess
