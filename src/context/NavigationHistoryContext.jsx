import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ROUTE_LABELS = {
  '/':               'Home',
  '/about':          'About Us',
  '/services':       'Services',
  '/contact':        'Contact Us',
  '/calculator':     'Cost Calculator',
  '/cost-calculator':'Cost Calculator',
  '/privacy-policy': 'Privacy Policy',
  '/terms':          'Terms & Conditions',
  '/payment-policy': 'Payment Policy',
}

const NavHistoryCtx = createContext([])

export const NavHistoryProvider = ({ children }) => {
  const location = useLocation()
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('s360_nav_history') || '[]')
    } catch {
      return []
    }
  })
  const prevPath = useRef(null)

  useEffect(() => {
    const path = location.pathname
    if (path === prevPath.current) return
    prevPath.current = path

    setHistory(prev => {
      const label = ROUTE_LABELS[path] || path
      const last = prev[prev.length - 1]
      if (last?.path === path) return prev
      const next = [...prev, { path, label }].slice(-8)
      try { sessionStorage.setItem('s360_nav_history', JSON.stringify(next)) } catch {}
      return next
    })
  }, [location.pathname])

  return (
    <NavHistoryCtx.Provider value={history}>
      {children}
    </NavHistoryCtx.Provider>
  )
}

/**
 * Returns an array of breadcrumb items (max 3).
 * Always starts with Home. Middle crumb is the actual page
 * the user navigated from (if it wasn't Home itself).
 *
 * Shape: [{ path, label, isCurrent }]
 */
export const useBreadcrumbs = () => {
  const history = useContext(NavHistoryCtx)
  const { pathname } = useLocation()

  const currentLabel = ROUTE_LABELS[pathname] || pathname

  // Find the entry immediately before the current page in history
  const currentIdx = history.findLastIndex(h => h.path === pathname)
  const prevEntry = currentIdx > 0 ? history[currentIdx - 1] : null

  const crumbs = [{ path: '/', label: 'Home', isCurrent: pathname === '/' }]

  if (pathname !== '/') {
    // Only show the middle crumb if the user actually came from a real page
    if (prevEntry && prevEntry.path !== '/') {
      crumbs.push({ path: prevEntry.path, label: prevEntry.label, isCurrent: false })
    }
    crumbs.push({ path: pathname, label: currentLabel, isCurrent: true })
  }

  return crumbs
}
