import { Link } from 'react-router-dom'
import { ArrowLeft, FileText } from 'lucide-react'
import { useSEO } from '../hooks/useSEO'

export default function Terms() {
  useSEO({ title: 'Terms of Service' })

  return (
    <div className="min-h-screen bg-[#edf4f9] py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-200/50 border border-slate-200/80">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-slate-900">
              Terms of Service
            </h1>
          </div>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 mb-8">
              Welcome to PortfoliAI. By using our service, you agree to these simple terms.
            </p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Acceptable Use</h2>
            <p className="text-slate-600 mb-4">
              You agree to only upload content (like resumes) that you own or have the right to use. PortfoliAI is intended for professional portfolios; do not host illegal, explicit, or malicious content on our platform.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Your Content & Privacy</h2>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
              <p className="text-emerald-800 font-medium m-0">
                <strong>We respect your privacy.</strong> As outlined in our <Link to="/privacy" className="underline">Privacy Policy</Link>, we will never sell your personal data or uploaded resume content. The data we collect is used strictly to power and improve your portfolio.
              </p>
            </div>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Portfolio Unpublishing and Domain Names</h2>
            <p className="text-slate-600 mb-4">
              You retain the right to unpublish your portfolio at any time. Unpublishing hides your portfolio from the public while securely reserving your custom domain name exclusively for your account. The domain name will only become available for other users to claim if you permanently delete the portfolio.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Service Availability</h2>
            <p className="text-slate-600 mb-4">
              We strive to keep PortfoliAI online and functional, but we provide the service "as is". We reserve the right to modify, pause, or discontinue features.
            </p>

            <p className="text-sm text-slate-500 mt-12 pt-6 border-t border-slate-100">
              Last updated: October 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
