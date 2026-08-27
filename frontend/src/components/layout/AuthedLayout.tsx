import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function AuthedLayout() {
  const { user, loading } = useAuth()

  if (loading) return <div className="p-8">Loading...</div>
  if (!user) return <Navigate to="/login" />

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border p-4 flex justify-between items-center">
        <div className="font-display font-bold text-xl">Portfolio AI</div>
        <div className="text-muted-foreground">{user.name}</div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
