import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import AuthedLayout from './components/layout/AuthedLayout'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import Dashboard from './pages/Dashboard'
import Upload from './pages/Upload'
import Editor from './pages/Editor'
import PublicPortfolio, { getSubdomainFromHostname } from './pages/PublicPortfolio'
import Demo from './pages/Demo'
import LivePreview from './pages/LivePreview'
import Account from './pages/Account'
import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'

export default function App() {
  const subdomain = getSubdomainFromHostname()

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={subdomain ? <PublicPortfolio subdomainSlug={subdomain} /> : <Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/p/:slug" element={<PublicPortfolio />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/live-preview" element={<LivePreview />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          
          {/* Protected Routes */}
          <Route element={<AuthedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/editor/:portfolioId" element={<Editor />} />
            <Route path="/account" element={<Account />} />
          </Route>

          {/* Catch-All */}
          <Route path="*" element={subdomain ? <PublicPortfolio subdomainSlug={subdomain} /> : <NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
