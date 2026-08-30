import { Link } from 'react-router-dom'
import { Plus, FileText, ArrowRight, ExternalLink, Trash2, LayoutDashboard, Globe, PenTool } from 'lucide-react'
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
    <div className="max-w-6xl w-full mx-auto p-6 py-12">
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
    <div className="max-w-6xl w-full mx-auto p-6 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 opacity-0 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-blue-600" />
            Your Portfolios
          </h1>
          <p className="text-slate-500 text-sm mt-2">Manage, edit, and publish your generated portfolio websites</p>
        </div>
        <Link
          to="/upload"
          className="group relative inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
          <span className="relative z-10">New Portfolio</span>
        </Link>
      </div>

      {portfolios.length === 0 ? (
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-[2rem] p-12 sm:p-20 text-center flex flex-col items-center shadow-2xl shadow-slate-200/40 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mb-6 text-blue-600 animate-float shadow-inner border border-white mx-auto">
                <FileText className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-display font-bold text-slate-900 mb-3">No portfolios yet</h2>
              <p className="text-slate-500 mb-10 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                Upload your resume to instantly generate a beautiful, interactive portfolio. It takes less than 30 seconds!
              </p>
              <Link
                to="/upload"
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-blue-600/20 hover:shadow-2xl hover:shadow-blue-600/30 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 group/btn"
              >
                <span>Create Your First Portfolio</span>
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio, idx) => (
            <div 
              key={portfolio.id} 
              className="group relative bg-white border border-slate-200 hover:border-blue-300/50 rounded-3xl p-1 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 flex flex-col justify-between overflow-hidden opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${idx * 100 + 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-white rounded-[22px] h-full flex flex-col justify-between p-6 z-10 transition-colors duration-300 group-hover:bg-transparent">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-bold shadow-sm ${
                      portfolio.isPublished 
                        ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {portfolio.isPublished ? (
                        <>
                          <Globe className="w-3.5 h-3.5" />
                          Published
                        </>
                      ) : 'Draft'}
                    </span>
                    <button
                      onClick={(e) => handleDelete(portfolio.id, e)}
                      className="text-slate-300 hover:text-red-500 transition-all duration-300 p-2 rounded-xl hover:bg-red-50 hover:scale-110 active:scale-95"
                      title="Delete portfolio"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="font-display font-black text-xl text-slate-900 mb-2 group-hover:text-blue-950 transition-colors group-hover:translate-x-1 duration-300">
                    {portfolio.slug || 'Untitled Portfolio'}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-6 group-hover:text-slate-600 transition-colors">
                    {portfolio.headline || 'Interactive Resume Portfolio'}
                  </p>
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-100 group-hover:border-slate-200 transition-colors">
                  <Link
                    to={`/editor/${portfolio.id}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 py-3 rounded-xl text-sm font-bold transition-all duration-300 border border-slate-200 hover:border-blue-200 group/edit"
                  >
                    <PenTool className="w-4 h-4 group-hover/edit:scale-110 transition-transform" />
                    <span>Edit</span>
                  </Link>
                  {portfolio.isPublished && (
                    <a
                      href={getPortfolioPublicUrl(portfolio.slug)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 px-5 bg-slate-900 hover:bg-black text-white py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-md hover:shadow-xl group/view"
                    >
                      <span>View</span>
                      <ExternalLink className="w-4 h-4 group-hover/view:translate-x-1 group-hover/view:-translate-y-1 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
