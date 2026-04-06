import { useState, useEffect } from 'react'
import './ScrollToTop.css'

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      className={`scroll-to-top ${visible ? 'scroll-to-top--visible' : ''}`}
      onClick={scrollUp}
      aria-label="Scroll to top"
    >
      <i className="fa-solid fa-chevron-up" />
    </button>
  )
}

export default ScrollToTop
