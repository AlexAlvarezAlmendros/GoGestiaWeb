import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Thanks from './pages/Thanks'
import Blog from './pages/Blog'
import PrivacyPolicy from './pages/legal/PrivacyPolicy'
import LegalNotice from './pages/legal/LegalNotice'
import CookiePolicy from './pages/legal/CookiePolicy'
import LoadingProvider from './hooks/LoadingProvider'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <LoadingProvider>
      <Router>
        <ScrollToTop />
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/gracias" element={<Thanks />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/legal/privacidad" element={<PrivacyPolicy />} />
            <Route path="/legal/aviso-legal" element={<LegalNotice />} />
            <Route path="/legal/cookies" element={<CookiePolicy />} />
          </Routes>
        </MainLayout>
      </Router>
    </LoadingProvider>
  )
}

export default App
