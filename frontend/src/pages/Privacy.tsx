import { Link } from 'react-router-dom'
import { ArrowLeft, Shield } from 'lucide-react'
import { useSEO } from '../hooks/useSEO'

export default function Privacy() {
  useSEO({ title: 'Privacy Policy' })

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
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-slate-900">
              Privacy Policy
            </h1>
          </div>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 mb-8">
              At PortfoliAI, we believe in being completely transparent about your data. Here is exactly what we collect, how we save it, and our guarantee to you.
            </p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">What Data We Collect & Save</h2>
            <ul className="space-y-3 text-slate-600 list-disc pl-5">
              <li><strong>Account Information:</strong> Your name and email address when you register.</li>
              <li><strong>Resume Data:</strong> The text extracted from resumes you upload. This is used solely to generate your portfolio website.</li>
              <li><strong>Portfolio Content:</strong> Any manual edits you make to your portfolio in the Studio Editor (e.g., changing job descriptions, updating skills).</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Our Data Promise</h2>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
              <p className="text-emerald-800 font-medium m-0">
                <strong>We will never sell your data to third parties.</strong> Your professional history belongs to you. We only use your information to provide and improve the PortfoliAI service.
              </p>
            </div>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Your Rights</h2>
            <ul className="space-y-3 text-slate-600 list-disc pl-5">
              <li>You can unpublish your portfolio at any time, making it completely inaccessible to the public immediately. When you unpublish, the custom domain URL remains exclusively reserved for you and will not be available to others.</li>
              <li>If you permanently delete a portfolio from your dashboard, only then will its domain name become available for others to claim.</li>
              <li>You can request account deletion, which will wipe all associated data from our servers.</li>
            </ul>

            <p className="text-sm text-slate-500 mt-12 pt-6 border-t border-slate-100">
              Last updated: October 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
