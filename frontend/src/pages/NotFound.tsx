import { Link } from 'react-router-dom'
import { Home, AlertCircle, ArrowLeft } from 'lucide-react'
import { useSEO } from '../hooks/useSEO'

export default function NotFound() {
  useSEO({
    title: 'Page Not Found - PortfoliAI',
    description: 'The page you are looking for does not exist.',
  })

  return (
    <div className="min-h-screen flex flex-col bg-[#edf4f9] text-slate-900 selection:bg-slate-900 selection:text-white relative overflow-hidden">
      {/* Background Ambient Glows & Dot Pattern */}
      <div className="fixed inset-0 bg-dot-grid pointer-events-none opacity-60 z-0" />
      <div className="fixed top-[-10%] left-[15%] w-[500px] h-[500px] bg-blue-400/15 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[10%] right-[5%] w-[400px] h-[400px] bg-sky-300/15 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Navbar (Minimal) */}
      <header className="w-full px-4 sm:px-10 py-4 sm:py-5 flex items-center justify-between sticky top-0 z-50 backdrop-blur-xl bg-[#edf4f9]/80 border-b border-slate-200/60 shadow-xs">
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-xl bg-slate-950 text-white flex items-center justify-center shadow-md shadow-slate-950/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <AlertCircle className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-black text-xl sm:text-2xl text-slate-950 tracking-tight">
            PortfoliAI
          </span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 relative z-10 w-full py-20">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <div className="font-display text-9xl sm:text-[150px] font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-300 to-slate-400 drop-shadow-sm select-none mb-6">
            404
          </div>
          
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            Page not found
          </h1>
          
          <p className="text-slate-500 text-sm sm:text-lg mb-10 max-w-md">
            Oops! It seems you've ventured into uncharted territory. The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center w-full sm:w-auto">
            <button 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50 hover:text-slate-900 px-6 py-3.5 rounded-full font-bold text-sm shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-950 text-white hover:bg-slate-800 px-8 py-3.5 rounded-full font-bold text-sm shadow-xl shadow-slate-950/20 hover:shadow-2xl hover:shadow-slate-950/30 transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
