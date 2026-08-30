import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { apiClient } from '../lib/apiClient'
import type { Portfolio } from '../types/portfolio'
import { getTemplateById } from '../components/templates'
import { Sparkles, ArrowRight } from 'lucide-react'

export function getSubdomainFromHostname(hostname = window.location.hostname): string | null {
  const parts = hostname.split('.')
  if (parts.length >= 2 && !hostname.match(/^\d+\.\d+\.\d+\.\d+$/)) {
    const isLocalhost = hostname.includes('localhost')
    if (isLocalhost && parts.length >= 2 && parts[0] !== 'localhost') {
      return parts[0].toLowerCase()
    }
    if (!isLocalhost && parts.length >= 3) {
      const sub = parts[0].toLowerCase()
      if (!['www', 'app', 'api', 'admin', 'portfolio'].includes(sub)) {
        return sub
      }
    }
  }
  return null
}

export default function PublicPortfolio({ subdomainSlug }: { subdomainSlug?: string }) {
  const { slug: paramSlug } = useParams()
  const slug = subdomainSlug || paramSlug || getSubdomainFromHostname()
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!slug) {
      setError(true)
      setLoading(false)
      return
    }
    const fetchPortfolio = async () => {
      try {
        const data = await apiClient.request<Portfolio>(`/p/${slug}`)
        setPortfolio(data)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchPortfolio()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#edf4f9] text-slate-800 font-medium">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-slate-900 animate-spin" />
          <span>Loading portfolio...</span>
        </div>
      </div>
    )
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#edf4f9] text-center p-6">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-200">
          <Sparkles className="w-8 h-8 text-slate-700" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mb-3 tracking-tight">
          Portfolio Not Found
        </h1>
        <p className="text-slate-500 max-w-sm mb-8 leading-relaxed text-sm sm:text-base">
          The portfolio you're looking for doesn't exist yet or has not been published to the public.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white px-6 py-3 rounded-full font-semibold text-sm shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          <span>Create Your Own with PortfoliAI</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

<<<<<<< HEAD
  const activeTemplateId = portfolio.templateId || (portfolio as any).template_id || 'cosmic-violet'
=======
  const activeTemplateId = portfolio.templateId || (portfolio as any).template_id || 'dark-grid'
>>>>>>> origin/master
  const TemplateComponent = getTemplateById(activeTemplateId)?.component

  return (
    <div className="min-h-screen relative">
      {TemplateComponent ? (
        <TemplateComponent portfolio={portfolio} />
      ) : (
        <div className="p-8 text-center text-red-500">Template not found</div>
      )}

      {/* Floating PortfoliAI badge */}
      <div className="fixed bottom-5 right-5 z-40">
        <Link
          to="/"
          className="flex items-center gap-2 bg-slate-950/90 hover:bg-slate-950 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-xl border border-white/10 hover:scale-105 transition-all group"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400 group-hover:rotate-12 transition-transform" />
          <span>Made with PortfoliAI</span>
        </Link>
      </div>
    </div>
  )
}
