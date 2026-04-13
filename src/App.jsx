import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { NavHistoryProvider } from './context/NavigationHistoryContext'

const ScrollToTopOnNavigate = () => {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}
import Home       from './pages/Home/Home'
import About      from './pages/About/About'
import Services   from './pages/Services/Services'
import Contact    from './pages/Contact/Contact'
import Calculator    from './pages/Calculator/Calculator'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions/TermsConditions'
import PaymentPolicy from './pages/PaymentPolicy/PaymentPolicy'
import NotFound from './pages/NotFound/NotFound'
import Topbar from './layout/Topbar/Topbar'
import Footer from './layout/Footer/Footer'
import ScrollToTop from './components/ui/ScrollToTop/ScrollToTop'
import ProgressBar from './components/ui/ProgressBar/ProgressBar'
import WhatsAppButton from './components/ui/WhatsAppButton/WhatsAppButton'

function App() {
  return (
    <BrowserRouter>
      <NavHistoryProvider>
      <ScrollToTopOnNavigate />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.88rem',
            fontWeight: 600,
            borderRadius: '10px',
            padding: '14px 18px',
          },
          success: {
            style: {
              background: '#252b3b',
              color: '#ffffff',
              border: '1px solid rgba(221,51,51,0.35)',
            },
            iconTheme: { primary: '#dd3333', secondary: '#ffffff' },
          },
          error: {
            style: {
              background: '#252b3b',
              color: '#ffffff',
              border: '1px solid rgba(221,51,51,0.6)',
            },
            iconTheme: { primary: '#dd3333', secondary: '#ffffff' },
          },
        }}
      />
      <ProgressBar />
      <Topbar />
      <main>
        <Routes>
          <Route path="/"                element={<Home />} />
          <Route path="/about"           element={<About />} />
          <Route path="/services"        element={<Services />} />
          <Route path="/contact"         element={<Contact />} />
          <Route path="/calculator"      element={<Calculator />} />
          <Route path="/cost-calculator"  element={<Calculator />} />
          <Route path="/privacy-policy"  element={<PrivacyPolicy />} />
          <Route path="/terms"           element={<TermsConditions />} />
          <Route path="/payment-policy"  element={<PaymentPolicy />} />
          <Route path="*"               element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
      </NavHistoryProvider>
    </BrowserRouter>
  )
}

export default App
