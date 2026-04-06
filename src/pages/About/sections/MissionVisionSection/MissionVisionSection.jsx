import missionImg from '../../../../assets/images/Group-147-1.webp'
import visionImg1  from '../../../../assets/images/Group-144.webp'
import visionImg2  from '../../../../assets/images/Group-146-e1705781502877.webp'
import './MissionVisionSection.css'

const MissionVisionSection = () => (
  <section className="mv section section--light">
    <div className="container mv__inner">

      {/* Mission */}
      <div className="mv__block">
        <div className="mv__img-wrap">
          <img src={missionImg} alt="Our Mission" className="mv__img" />
        </div>
        <div className="mv__text">
          <h2 className="mv__heading">Our Mission</h2>
          <div className="mv__line" />
          <p className="mv__body">
            Our mission is to empower startups, international businesses, and individuals with
            comprehensive legal, tax, and digital solutions — delivering clarity and confidence at
            every stage of their journey. We strive to make world-class business support accessible,
            transparent, and results-driven.
          </p>
        </div>
      </div>

      {/* Vision */}
      <div className="mv__block mv__block--reverse">
        <div className="mv__text">
          <h2 className="mv__heading">Our Vision</h2>
          <div className="mv__line" />
          <p className="mv__body">
            To be the leading global platform for business setup and professional services —
            recognized for integrity, innovation, and collaboration. We envision a world where every
            entrepreneur and enterprise can navigate complex markets with ease and confidence.
          </p>
          <ul className="mv__values-list">
            {['Integrity', 'Innovation', 'Collaboration'].map((v) => (
              <li key={v}>
                <i className="fa-solid fa-circle-check" />
                {v}
              </li>
            ))}
          </ul>
        </div>
        <div className="mv__img-pair">
          <img src={visionImg1} alt="Vision" className="mv__img-pair-item" />
          <img src={visionImg2} alt="Vision" className="mv__img-pair-item mv__img-pair-item--offset" />
        </div>
      </div>

    </div>
  </section>
)

export default MissionVisionSection
