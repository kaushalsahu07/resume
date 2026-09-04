import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react'
import { apiClient } from '../lib/apiClient'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    try {
      await apiClient.request('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ email })
      })
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email. Please try again.')
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
            Reset Password
          </h2>
          <p className="text-slate-500 text-sm mt-1.5">
            Enter your email to receive a password reset link
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center">
            <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-semibold">
              Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.
            </div>
            <Link 
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to log in
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
              <input 
                type="email" 
                required
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all text-sm"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-2 bg-slate-950 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:scale-100"
            >
              <span>{loading ? 'Sending...' : 'Send Reset Link'}</span>
              {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
            </button>
          </form>
        )}

        {!success && (
          <p className="mt-6 text-center text-sm text-slate-500">
            Remember your password?{' '}
            <Link to="/login" className="font-semibold text-slate-900 hover:underline">
              Log in
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}
