import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setInfo('')
    try {
      await register({ name, email, password })
      navigate('/dashboard')
    } catch (err: any) {
      const msg = err.message || 'Registration failed'
      // If the message is about email confirmation, show it as info not error
      if (msg.toLowerCase().includes('check your email') || msg.toLowerCase().includes('confirm')) {
        setInfo(msg)
      } else {
        setError(msg)
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#edf4f9] px-4 py-12">
      <Link to="/" className="flex items-center gap-2.5 mb-8 group">
        <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200">
          <Sparkles className="w-4 h-4 text-white fill-white" />
        </div>
        <span className="font-display font-bold text-2xl text-slate-900 tracking-tight">
          PortfoliAI
        </span>
      </Link>

      <div className="max-w-md w-full bg-white/80 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
            Create an Account
          </h2>
          <p className="text-slate-500 text-sm mt-1.5">
            Turn your resume into a stunning portfolio in seconds
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}
        {info && (
          <div className="mb-4 p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-sm">
            ✉️ {info}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
            <input 
              type="text" 
              required
              placeholder="Jane Doe"
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all text-sm"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
            <input 
              type="email" 
              required
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all text-sm"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all text-sm"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            className="w-full mt-2 bg-slate-950 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 group"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-slate-900 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
