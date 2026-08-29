import { Navigate, Outlet, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { LogOut } from 'lucide-react'

export default function AuthedLayout() {
  const { user, loading, logout } = useAuth()

  if (loading) return <div className="p-8">Loading...</div>
  if (!user) return <Navigate to="/login" />

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border p-4 flex justify-between items-center shrink-0">
        <Link to="/" className="font-display font-bold text-xl hover:opacity-80 transition-opacity">PortfoliAI</Link>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-muted-foreground">Hi, {user.name}</span>
          <button onClick={logout} className="text-sm font-medium bg-muted text-foreground px-3 py-1.5 rounded-md hover:bg-muted/80 transition-opacity flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </nav>
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  )
}
