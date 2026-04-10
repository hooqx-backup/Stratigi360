import { motion } from 'framer-motion'
import content from '../../../../locales/en.json'
import SectionTitle from '../../../../components/ui/SectionTitle/SectionTitle'
import './PartnersSection.css'
import { fadeUp, viewportOnce } from '../../../../utils/motionVariants'

import vegaventures from '../../../../assets/images/carosuleimage/vega-logo.png'
import zLogo        from '../../../../assets/images/carosuleimage/z-1.png'
import sLogo        from '../../../../assets/images/carosuleimage/s-1.png'
import eLogo        from '../../../../assets/images/carosuleimage/e-1.png'
import cLogo        from '../../../../assets/images/carosuleimage/c-1.png'
import hLogo        from '../../../../assets/images/carosuleimage/h-1.png'
import kLogo        from '../../../../assets/images/carosuleimage/k-1.png'
import scooda       from '../../../../assets/images/carosuleimage/scooda-logo.png'
import tezz         from '../../../../assets/images/carosuleimage/tezz-logo.png'

const { partners } = content

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

const track = [...logos, ...logos]

const PartnersSection = () => (
  <section className="partners section">
    <div className="container">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <SectionTitle
          label={partners.label}
          heading={partners.heading}
          subheading={partners.subheading}
          align="center"
        />
      </motion.div>
    </div>

    <motion.div
      className="partners__ticker-wrap"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="partners__track">
        {track.map((logo, i) => (
          <div key={i} className="partners__item">
            <img src={logo.src} alt={logo.alt} />
          </div>
        ))}
      </div>
    </motion.div>
  </section>
)

export default PartnersSection
