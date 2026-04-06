import './PartnersSection.css'

import vegaventures from '../../../../assets/images/carosuleimage/vegaventures-logo-1-690895649bfa6.webp'
import zLogo       from '../../../../assets/images/carosuleimage/z-1.png'
import sLogo       from '../../../../assets/images/carosuleimage/s-1.png'
import eLogo       from '../../../../assets/images/carosuleimage/e-1.png'
import cLogo       from '../../../../assets/images/carosuleimage/c-1.png'
import hLogo       from '../../../../assets/images/carosuleimage/h-1.png'
import kLogo       from '../../../../assets/images/carosuleimage/k-1.png'
import scooda      from '../../../../assets/images/carosuleimage/scooda-logo-white-1(1).png'
import tezz        from '../../../../assets/images/carosuleimage/tezz-logo__1.png'

const logos = [
  { src: vegaventures, alt: 'Vega Ventures' },
  { src: zLogo,        alt: 'Z' },
  { src: sLogo,        alt: 'S' },
  { src: eLogo,        alt: 'E' },
  { src: cLogo,        alt: 'C' },
  { src: hLogo,        alt: 'H' },
  { src: kLogo,        alt: 'K' },
  { src: scooda,       alt: 'Scooda' },
  { src: tezz,         alt: 'Tezz' },
]

// Duplicate for seamless infinite scroll
const track = [...logos, ...logos]

const PartnersSection = () => (
  <section className="partners section">
    <div className="container">
      <div className="partners__header">
        <h2 className="partners__heading">Our Partners</h2>
        <div className="partners__heading-line" />
      </div>
    </div>

    <div className="partners__track-wrap">
      <div className="partners__track">
        {track.map((logo, i) => (
          <div key={i} className="partners__item">
            <img src={logo.src} alt={logo.alt} />
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default PartnersSection
