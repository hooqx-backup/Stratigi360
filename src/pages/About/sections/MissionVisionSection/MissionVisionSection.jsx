import missionImg from '../../../../assets/images/about/Rectangle-356.webp'
import visionImg1  from '../../../../assets/images/about/Rectangle-352.webp'
import valuesImg   from '../../../../assets/images/about/Rectangle-354.webp'
import './MissionVisionSection.css'

const MissionVisionSection = () => (
  <section className="mv">

    {/* Row 1 — Mission text | Mission image */}
    <div className="mv__cell mv__cell--dark">
      <h2 className="mv__heading">Our Mission <span className="mv__title-line" /></h2>
      <p className="mv__body">
        We're here to empower startups, international businesses, and individuals alike.
        Our mission is to offer comprehensive legal and tax solutions and enhance your
        professional journey through effective and digital solutions.
      </p>
    </div>

    <div className="mv__cell mv__cell--img">
      <img src={missionImg} alt="Our Mission" className="mv__img" />
    </div>

    {/* Row 2 — Vision image | Vision text */}
    <div className="mv__cell mv__cell--img">
      <img src={visionImg1} alt="Our Vision" className="mv__img" />
    </div>

    <div className="mv__cell mv__cell--dark">
      <h2 className="mv__heading">Our Vision <span className="mv__title-line" /></h2>
      <p className="mv__body">
        Integrity, Innovation, Collaboration – We live by these values, ensuring the
        highest standards of integrity, fostering innovation, and achieving success
        through collaboration. Our vision is to be the leading global platform where
        every entrepreneur can navigate complex markets with ease and confidence.
      </p>
    </div>

    {/* Row 3 — Values text | Values image */}
    <div className="mv__cell mv__cell--dark">
      <h2 className="mv__heading">Our Values <span className="mv__title-line" /></h2>
      <p className="mv__body">
        Integrity, Innovation, Collaboration – these are the pillars we stand on. We believe
        trust is earned through transparency and lasting success is built on meaningful
        relationships with our clients and communities.
      </p>
    </div>

    <div className="mv__cell mv__cell--img">
      <img src={valuesImg} alt="Our Values" className="mv__img" />
    </div>

  </section>
)

export default MissionVisionSection
