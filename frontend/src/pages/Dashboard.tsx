import { Link } from 'react-router-dom'
import { Plus, FileText, ArrowRight, ExternalLink, Sparkles, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { apiClient } from '../lib/apiClient'
import { getPortfolioPublicUrl } from '../lib/portfolioUrl'
import type { Portfolio } from '../types/portfolio'

export default function Dashboard() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)

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

  if (loading) return (
    <div className="flex-1 flex items-center justify-center p-12 text-slate-500 font-medium">
      <div className="animate-pulse flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-slate-700 animate-spin" />
        <span>Loading your portfolios...</span>
      </div>
    </div>
  )

  return (
    <div className="max-w-5xl w-full mx-auto p-6 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">Your Portfolios</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and edit your generated portfolio websites</p>
        </div>
        <Link
          to="/upload"
          className="flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-sm hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>New Portfolio</span>
        </Link>
      </div>

      {portfolios.length === 0 ? (
        <div className="bg-white/70 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-12 sm:p-16 text-center flex flex-col items-center shadow-lg shadow-slate-200/40">
          <div className="w-16 h-16 bg-slate-200/60 rounded-2xl flex items-center justify-center mb-5 text-slate-700">
            <FileText className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-display font-bold text-slate-900 mb-2">No portfolios yet</h2>
          <p className="text-slate-500 mb-8 max-w-sm text-sm sm:text-base leading-relaxed">
            Upload your resume to instantly generate a beautiful, interactive portfolio.
          </p>
          <Link
            to="/upload"
            className="flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white px-7 py-3.5 rounded-full font-semibold shadow-sm hover:shadow-xl hover:shadow-slate-900/10 hover:-translate-y-0.5 active:translate-y-0 transition-all group"
          >
            <span>Create Your First Portfolio</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {portfolios.map(portfolio => (
            <div 
              key={portfolio.id} 
              className="group bg-white/70 hover:bg-white backdrop-blur-sm border border-slate-200/80 hover:border-slate-300 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${portfolio.isPublished ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                    {portfolio.isPublished ? 'Published' : 'Draft'}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-medium">
                      {portfolio.viewCount} views
                    </span>
                    <button
                      onClick={(e) => handleDelete(portfolio.id, e)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50"
                      title="Delete portfolio"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 mb-1 group-hover:text-black transition-colors">
                  {portfolio.slug || 'Untitled Portfolio'}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-6">
                  {portfolio.headline || 'Interactive Resume Portfolio'}
                </p>
              </div>

              <div className="flex gap-2.5 pt-4 border-t border-slate-100">
                <Link
                  to={`/editor/${portfolio.id}`}
                  className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-xs"
                >
                  Edit
                </Link>
                {portfolio.isPublished && (
                  <a
                    href={getPortfolioPublicUrl(portfolio.slug)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 px-4 bg-slate-950 hover:bg-slate-800 text-white py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-xs"
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
