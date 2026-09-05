import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { apiClient } from '../lib/apiClient'
import { Settings, Mail, Lock, ArrowRight, CheckCircle2, AlertCircle, Eye, EyeOff, Shield } from 'lucide-react'

export default function Account() {
  const { user } = useAuth()

  // Email change state
  const [emailPassword, setEmailPassword] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [emailSuccess, setEmailSuccess] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)
  const [showEmailPassword, setShowEmailPassword] = useState(false)

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError('')
    setEmailSuccess(false)
    setEmailLoading(true)

    try {
      await apiClient.request('/auth/change-email', {
        method: 'POST',
        body: JSON.stringify({
          current_password: emailPassword,
          new_email: newEmail
        })
      })
      setEmailSuccess(true)
      setEmailPassword('')
      setNewEmail('')
      // Auto-reload after a brief delay so the new email shows everywhere
      setTimeout(() => window.location.reload(), 1500)
    } catch (err: any) {
      setEmailError(err.message || 'Failed to change email. Please try again.')
    } finally {
      setEmailLoading(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordSuccess(false)
    setPasswordLoading(true)

    try {
      await apiClient.request('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({
          current_password: currentPassword
        })
      })
      setPasswordSuccess(true)
      setCurrentPassword('')
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to send reset email. Please try again.')
    } finally {
      setPasswordLoading(false)
    }
  }

  return (
    <div className="max-w-3xl w-full mx-auto p-4 sm:p-6 py-12">
      {/* Page Header */}
      <div className="mb-10 opacity-0 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
        <h1 className="text-3xl sm:text-4xl font-display font-black text-slate-950 tracking-tight flex items-center gap-3">
          <Settings className="w-8 h-8 text-blue-600" />
          Account Settings
        </h1>
        <p className="text-slate-500 text-sm mt-1.5">Manage your email address and password</p>
      </div>

      {/* Current Account Info */}
      <div className="mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '60ms' }}>
        <div className="glass-card bg-white/90 rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-500/20">
            {user?.name?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold text-slate-900 text-lg truncate">{user?.name}</p>
            <p className="text-slate-500 text-sm truncate">{user?.email}</p>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700">Verified</span>
          </div>
        </div>
      </div>

      {/* Change Email Section */}
      <div className="mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '120ms' }}>
        <div className="glass-card bg-white/90 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/30 overflow-hidden">
          <div className="px-6 sm:px-8 py-5 border-b border-slate-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
              <Mail className="w-4.5 h-4.5 text-blue-600" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-slate-900 text-lg">Change Email</h2>
              <p className="text-xs text-slate-400 mt-0.5">A confirmation will be sent to your new email</p>
            </div>
          </div>
          <div className="px-6 sm:px-8 py-6">
            {emailError && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{emailError}</span>
              </div>
            )}

            {emailSuccess ? (
              <div className="text-center py-4">
                <div className="p-6 rounded-2xl bg-green-50 border border-green-200 flex flex-col items-center gap-3">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                  <span className="text-green-800 font-bold text-sm">
                    Your email has been changed successfully. Please log in again with your new email.
                  </span>
                </div>
                <button
                  onClick={() => setEmailSuccess(false)}
                  className="mt-4 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Change again
                </button>
              </div>
            ) : (
              <form onSubmit={handleEmailChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Current Password</label>
                  <div className="relative">
                    <input
                      type={showEmailPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter your current password"
                      className="w-full px-3.5 py-2.5 pr-10 border border-slate-200 rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all text-sm"
                      value={emailPassword}
                      onChange={e => setEmailPassword(e.target.value)}
                      disabled={emailLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowEmailPassword(!showEmailPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showEmailPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">New Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="newemail@example.com"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all text-sm"
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                    disabled={emailLoading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={emailLoading}
                  className="w-full mt-2 bg-slate-950 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:scale-100"
                >
                  <span>{emailLoading ? 'Sending confirmation...' : 'Change Email'}</span>
                  {!emailLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '180ms' }}>
        <div className="glass-card bg-white/90 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/30 overflow-hidden">
          <div className="px-6 sm:px-8 py-5 border-b border-slate-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
              <Lock className="w-4.5 h-4.5 text-amber-600" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-slate-900 text-lg">Change Password</h2>
              <p className="text-xs text-slate-400 mt-0.5">You'll receive a reset link via email</p>
            </div>
          </div>
          <div className="px-6 sm:px-8 py-6">
            {passwordError && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess ? (
              <div className="text-center py-4">
                <div className="p-6 rounded-2xl bg-green-50 border border-green-200 flex flex-col items-center gap-3">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                  <span className="text-green-800 font-bold text-sm">
                    A password reset link has been sent to your email. Check your inbox to set a new password.
                  </span>
                </div>
                <button
                  onClick={() => setPasswordSuccess(false)}
                  className="mt-4 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Try again
                </button>
              </div>
            ) : (
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter your current password"
                      className="w-full px-3.5 py-2.5 pr-10 border border-slate-200 rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all text-sm"
                      value={currentPassword}
                      onChange={e => setCurrentPassword(e.target.value)}
                      disabled={passwordLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="w-full mt-2 bg-slate-950 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:scale-100"
                >
                  <span>{passwordLoading ? 'Sending reset link...' : 'Send Password Reset Link'}</span>
                  {!passwordLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
