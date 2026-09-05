import { Navigate, Outlet, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Sparkles, LogOut, Settings } from 'lucide-react'

export default function AuthedLayout() {
  const { user, loading, logout } = useAuth()

  if (loading) return <div className="p-8 text-slate-500 font-medium">Loading...</div>
  if (!user) return <Navigate to="/login" />

  return (
    <div className="min-h-screen bg-[#edf4f9] flex flex-col selection:bg-slate-900 selection:text-white">
      <header className="w-full px-4 sm:px-10 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md bg-[#edf4f9]/85 border-b border-slate-200/60 transition-all">
        <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="font-display font-bold text-lg sm:text-xl text-slate-900 tracking-tight">
            PortfoliAI
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/dashboard" className="text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors">
            Dashboard
          </Link>
          <Link to="/account" className="text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors flex items-center gap-1.5 bg-white/80 border border-slate-200 px-2.5 sm:px-3.5 py-1.5 rounded-full shadow-xs hover:bg-slate-100">
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Hi, {user.name}</span>
          </Link>
          <button 
            onClick={logout} 
            className="text-sm font-medium text-slate-700 bg-white/80 border border-slate-200 hover:bg-slate-100 hover:text-red-600 px-2.5 sm:px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 shadow-xs"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  )
}
