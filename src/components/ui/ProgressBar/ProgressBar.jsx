import { useState, useEffect } from 'react'
import './ProgressBar.css'

const ProgressBar = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="progress-bar-wrap">
      <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
    </div>
  )
}

export default ProgressBar
