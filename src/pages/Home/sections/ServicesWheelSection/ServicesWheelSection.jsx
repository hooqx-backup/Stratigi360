import { useEffect, useRef } from 'react'
import './ServicesWheelSection.css'
import content from '../../../../locales/en.json'
import mobileImage from '../../../../assets/images/stratigi-360-services-1.webp'
import center360 from '../../../../assets/images/360.png'

const imageModules = import.meta.glob('../../../../assets/images/*.png', {
  eager: true,
  import: 'default'
})

const wheelImages = Object.entries(imageModules).reduce((acc, [path, src]) => {
  const filename = path.split('/').pop()?.replace('.png', '')
  if (filename) acc[filename] = src
  return acc
}, {})

const serviceLabels = content.services.items.slice(0, 9).map((item) => item.title)

const TOTAL = 9
const ROTATION_MS = 35000

const orbitItems = Array.from({ length: TOTAL }, (_, i) => ({
  id: i + 1,
  src: wheelImages[String(i + 1)] || null,
  label: serviceLabels[i] || `Service ${i + 1}`,
  initialAngle: i * (360 / TOTAL),
}))

const ServicesWheelSection = () => {
  const orbitRef   = useRef(null)
  const itemRefs   = useRef([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf
    let running = true
    let angle = 0
    const degPerMs = 360 / ROTATION_MS
    let prevTime = null

    function positionItems(rotation) {
      const orbit = orbitRef.current
      if (!orbit) return
      const orbitSize = orbit.offsetWidth
      if (!orbitSize) return
      const itemSize = itemRefs.current[0]?.offsetWidth ?? 80
      const R = (orbitSize - itemSize) / 2

      orbitItems.forEach((item, i) => {
        const el = itemRefs.current[i]
        if (!el) return
        const rad = ((item.initialAngle + rotation) * Math.PI) / 180
        const x = Math.sin(rad) * R
        const y = -Math.cos(rad) * R
        el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
      })
    }

    function frame(time) {
      if (!running) return
      if (prevTime !== null) {
        angle = (angle + degPerMs * (time - prevTime)) % 360
      }
      prevTime = time
      positionItems(angle)
      raf = requestAnimationFrame(frame)
    }

    positionItems(0)

    if (!prefersReduced) {
      raf = requestAnimationFrame(frame)
    }

    return () => {
      running = false
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="services-wheel-section">
      <div className="services-wheel-container">

        {/* ── Desktop: animated wheel ── */}
        <div className="swl-wheel">
          <div className="swl-orbit" ref={orbitRef}>
            {orbitItems.map((item, i) => (
              <div
                key={item.id}
                className="swl-item"
                ref={(el) => { itemRefs.current[i] = el }}
              >
                {item.src
                  ? <img src={item.src} alt={item.label} className="swl-item-image" />
                  : <div className="swl-item-fallback">{item.id}</div>
                }
                <span className="swl-label">{item.label}</span>
              </div>
            ))}

            <div className="swl-center">
              <img src={center360} alt="360" className="swl-center-image" />
            </div>
          </div>
        </div>

        {/* ── Mobile: static image ── */}
        <div className="swl-mobile">
          <img src={mobileImage} alt="Stratigi 360 Services" className="swl-mobile-image" />
        </div>

      </div>
    </section>
  )
}

export default ServicesWheelSection
