import { Link } from 'react-router-dom'
import { 
  Plus, ArrowRight, ExternalLink, Trash2, LayoutDashboard, 
  PenTool, Copy, Check, Eye, Sparkles, Wand2
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { apiClient } from '../lib/apiClient'
import { getPortfolioPublicUrl } from '../lib/portfolioUrl'
import type { Portfolio } from '../types/portfolio'

export default function Dashboard() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const data = await apiClient.request<Portfolio[]>('/portfolios')
        setPortfolios(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPortfolios()
  }, [])

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!window.confirm('Are you sure you want to delete this portfolio? This action cannot be undone.')) {
      return
    }
    
    try {
      await apiClient.request(`/portfolios/${id}`, { method: 'DELETE' })
      setPortfolios(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      console.error('Failed to delete portfolio:', err)
      alert('Failed to delete portfolio. Please try again.')
    }
  }

  const handleCopyLink = (slug: string, id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const url = getPortfolioPublicUrl(slug)
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  const publishedCount = portfolios.filter(p => p.isPublished).length
  const totalViews = portfolios.reduce((acc, p) => acc + (p.viewCount || 0), 0)

  if (loading) return (
    <div className="max-w-6xl w-full mx-auto p-4 sm:p-6 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 animate-pulse">
        <div className="space-y-3">
          <div className="h-10 w-64 bg-slate-200 rounded-xl" />
          <div className="h-4 w-48 bg-slate-200 rounded-md" />
        </div>
        <div className="h-12 w-40 bg-slate-200 rounded-full" />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-shimmer h-[220px] rounded-3xl border border-slate-200 shadow-sm" />
        ))}
      </div>
    </div>
  )

  return (
    <div className="max-w-6xl w-full mx-auto p-4 sm:p-6 py-12 relative">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-slate-950 tracking-tight flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-blue-600" />
            Your Studio Dashboard
          </h1>
          <p className="text-slate-500 text-sm mt-1.5">Manage, customize, and publish your interactive portfolio websites</p>
        </div>
        <Link
          to="/upload"
          className="group relative inline-flex items-center justify-center gap-2.5 bg-slate-950 hover:bg-slate-800 text-white px-6 py-3.5 rounded-full font-bold text-sm shadow-xl shadow-slate-950/20 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
          <span>New Portfolio</span>
        </Link>
      </div>

      {/* Metrics Row */}
      {portfolios.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 opacity-0 animate-fade-in-up" style={{ animationDelay: '80ms' }}>
          <div className="glass-card bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Portfolios</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 block">{portfolios.length}</span>
          </div>
          <div className="glass-card bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Live Sites</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1 block">{publishedCount}</span>
          </div>
          <div className="glass-card bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Views</span>
            <span className="text-2xl sm:text-3xl font-black text-blue-600 mt-1 block">{totalViews}</span>
          </div>
          <div className="glass-card bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">AI Status</span>
            <span className="text-sm font-black text-slate-900 mt-2 block flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Copilot Ready
            </span>
          </div>
        </div>
      )}

      {portfolios.length === 0 ? (
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="glass-card bg-white/90 rounded-[2.5rem] p-10 sm:p-16 text-center flex flex-col items-center shadow-2xl shadow-slate-300/60 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mb-6 text-slate-950 animate-float shadow-inner border border-white mx-auto">
                <Wand2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-display font-black text-slate-950 mb-3">No portfolios created yet</h2>
              <p className="text-slate-500 mb-8 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                Upload your resume or try a sample to instantly generate your interactive AI portfolio website in seconds!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/upload"
                  className="inline-flex items-center gap-2.5 bg-slate-950 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-slate-950/20 hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300 group/btn"
                >
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>Create Your First Portfolio</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                </Link>
                <Link
                  to="/demo"
                  className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-6 py-4 rounded-full font-bold transition-all"
                >
                  <Eye className="w-4 h-4" />
                  <span>Explore Demo</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio, idx) => (
            <div 
              key={portfolio.id} 
              className="group relative glass-card bg-white border border-slate-200/90 hover:border-slate-400/90 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:shadow-slate-300/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${idx * 80 + 100}ms` }}
            >
              <div>
                {/* Top Status & Delete */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-bold shadow-2xs ${
                    portfolio.isPublished 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80' 
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {portfolio.isPublished ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Live</span>
                      </>
                    ) : 'Draft'}
                  </span>

                  <div className="flex items-center gap-1">
                    {portfolio.isPublished && (
                      <button
                        onClick={(e) => handleCopyLink(portfolio.slug, portfolio.id, e)}
                        className="text-slate-400 hover:text-slate-900 transition-colors p-1.5 rounded-lg hover:bg-slate-100 relative"
                        title="Copy live link"
                      >
                        {copiedId === portfolio.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    )}
                    <button
                      onClick={(e) => handleDelete(portfolio.id, e)}
                      className="text-slate-300 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                      title="Delete portfolio"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Slug & Headline */}
                <h3 className="font-display font-black text-xl text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                  {portfolio.slug || 'Untitled Portfolio'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                  {portfolio.headline || 'Interactive Resume Portfolio'}
                </p>

                {/* Meta details */}
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
                  <span className="capitalize">{portfolio.templateId?.replace('-', ' ')}</span>
                  <span>•</span>
                  <span>{portfolio.experience?.length || 0} jobs</span>
                  <span>•</span>
                  <span>{portfolio.skills?.length || 0} skills</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2.5 pt-4 border-t border-slate-100">
                <Link
                  to={`/editor/${portfolio.id}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98]"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Open Studio</span>
                </Link>
                {portfolio.isPublished && (
                  <a
                    href={getPortfolioPublicUrl(portfolio.slug)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-[1.02]"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

