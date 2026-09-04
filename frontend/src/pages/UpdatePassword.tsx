import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'
import { apiClient } from '../lib/apiClient'

export default function UpdatePassword() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    // Supabase returns the token in the URL hash like #access_token=...&type=recovery
    const hash = window.location.hash.substring(1)
    const params = new URLSearchParams(hash)
    const accessToken = params.get('access_token')
    
    if (accessToken) {
      setToken(accessToken)
    } else {
      setError('Invalid or missing recovery token. Please request a new password reset link.')
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    setError('')
    setLoading(true)

    try {
      await apiClient.request('/auth/update-password', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ password })
      })
      setSuccess(true)
      // Clear hash to hide the token
      window.history.replaceState(null, '', window.location.pathname)
    } catch (err: any) {
      setError(err.message || 'Failed to update password. Your link might have expired.')
    } finally {
      setLoading(false)
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
            New Password
          </h2>
          <p className="text-slate-500 text-sm mt-1.5">
            Enter your new password below
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center">
            <div className="mb-6 p-6 rounded-xl bg-green-50 border border-green-200 flex flex-col items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
              <span className="text-green-800 font-semibold">Password updated successfully!</span>
            </div>
            <Link 
              to="/login"
              className="w-full bg-slate-950 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
            >
              Go to log in
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">New Password</label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all text-sm"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading || !token}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading || !token}
              className="w-full mt-2 bg-slate-950 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:scale-100"
            >
              <span>{loading ? 'Updating...' : 'Update Password'}</span>
              {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
