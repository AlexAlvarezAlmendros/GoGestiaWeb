import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { AuthProvider } from './contexts/AuthContext'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Thanks from './pages/Thanks'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import CreateBlogPost from './pages/CreateBlogPost'
import AdminRoles from './pages/AdminRoles'
import AuthDebug from './pages/AuthDebug'
import AdminLogin from './pages/AdminLogin'
import AdminAccess from './pages/AdminAccess'
import NotFound from './pages/NotFound'
import PrivacyPolicy from './pages/legal/PrivacyPolicy'
import LegalNotice from './pages/legal/LegalNotice'
import CookiePolicy from './pages/legal/CookiePolicy'
import LoadingProvider from './hooks/LoadingProvider'
import ScrollToTop from './components/ScrollToTop'
import ProtectedRoute from './components/ProtectedRoute'
import auth0Config from './config/auth0Config'

function App() {
  return (
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        ...(auth0Config.audience && { audience: auth0Config.audience }),
        scope: "openid profile email read:posts create:posts edit:posts delete:posts"
      }}
      useRefreshTokens={false}
      cacheLocation="memory"
    >
      <AuthProvider>
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
                <Route 
                  path="/blog/crear" 
                  element={
                    <ProtectedRoute requiredPermission="create:posts">
                      <CreateBlogPost />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/roles" 
                  element={
                    <ProtectedRoute requiredRole="Admin">
                      <AdminRoles />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/debug/auth" element={<AuthDebug />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/access-info" element={<AdminAccess />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/legal/privacidad" element={<PrivacyPolicy />} />
                <Route path="/legal/aviso-legal" element={<LegalNotice />} />
                <Route path="/legal/cookies" element={<CookiePolicy />} />
                {/* Ruta catch-all para manejar 404s */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MainLayout>
          </Router>
        </LoadingProvider>
      </AuthProvider>
    </Auth0Provider>
  )
}

export default App
