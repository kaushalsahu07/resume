import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import AuthedLayout from './components/layout/AuthedLayout'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Upload from './pages/Upload'
import Editor from './pages/Editor'
import PublicPortfolio from './pages/PublicPortfolio'
import Demo from './pages/Demo'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/p/:slug" element={<PublicPortfolio />} />
          <Route path="/demo" element={<Demo />} />
          
          {/* Protected Routes */}
          <Route element={<AuthedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/editor/:portfolioId" element={<Editor />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
