import { useState, useEffect } from 'react'
import './ScrollToTop.css'

const ScrollToTop = () => {
  const [pastHalf, setPastHalf] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      
      if (docHeight > 0) {
        const progress = scrolled / docHeight
        setPastHalf(progress >= 0.5)
        setScrollProgress(progress * 100)
      }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // Fire once on mount to set initial state
    
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = () => {
    if (pastHalf) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
    }
  }

  // Math for the SVG Progress Ring
  const radius = 26; // Radius of the circle
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      className="scroll-to-top"
      onClick={handleClick}
      aria-label={pastHalf ? 'Scroll to top' : 'Scroll to bottom'}
    >
      {/* Dynamic Scroll Progress Ring */}
      <svg className="scroll-to-top__progress" width="56" height="56" viewBox="0 0 56 56">
        <circle
          className="scroll-to-top__progress-bg"
          cx="28" cy="28" r={radius}
        />
        <circle
          className="scroll-to-top__progress-bar"
          cx="28" cy="28" r={radius}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset
          }}
        />
      </svg>

      {/* Icon Container with Bouncy Rotation */}
      <span className={`scroll-to-top__rotate ${pastHalf ? 'scroll-to-top__rotate--up' : 'scroll-to-top__rotate--down'}`}>
        <i className="fa-solid fa-chevron-up scroll-to-top__icon" />
      </span>
    </button>
  )
}

export default ScrollToTop