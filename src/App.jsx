import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home       from './pages/Home/Home'
import About      from './pages/About/About'
import Services   from './pages/Services/Services'
import Contact    from './pages/Contact/Contact'
import Calculator from './pages/Calculator/Calculator'
import Topbar from './layout/Topbar/Topbar'
import Footer from './layout/Footer/Footer'
import ScrollToTop from './components/ui/ScrollToTop/ScrollToTop'
import ProgressBar from './components/ui/ProgressBar/ProgressBar'
import WhatsAppButton from './components/ui/WhatsAppButton/WhatsAppButton'

function App() {
  return (
    <BrowserRouter>
      <ProgressBar />
      <Topbar />
      <main>
        <Routes>
          <Route path="/"                element={<Home />} />
          <Route path="/about"           element={<About />} />
          <Route path="/services"        element={<Services />} />
          <Route path="/contact"         element={<Contact />} />
          <Route path="/calculator"      element={<Calculator />} />
          <Route path="/cost-calculator" element={<Calculator />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </BrowserRouter>
  )
}

export default App
