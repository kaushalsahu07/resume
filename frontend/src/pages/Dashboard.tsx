import { Link } from 'react-router-dom'
import { Plus, FileText, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { apiClient } from '../lib/apiClient'
import type { Portfolio } from '../types/portfolio'

export default function Dashboard() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        // Mocking API call for now
        // const data = await apiClient.request<Portfolio[]>('/portfolios')
        const data: Portfolio[] = [] 
        setPortfolios(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPortfolios()
  }, [])

  if (loading) return <div className="p-8">Loading portfolios...</div>

  return (
    <div className="max-w-5xl mx-auto p-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold">Your Portfolios</h1>
        <Link 
          to="/upload" 
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          New Portfolio
        </Link>
      </div>

      {portfolios.length === 0 ? (
        <div className="bg-muted/30 border border-border rounded-xl p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-display font-semibold mb-2">No portfolios yet</h2>
          <p className="text-muted-foreground mb-6 max-w-sm">
            Upload your resume to instantly generate a beautiful, interactive portfolio.
          </p>
          <Link 
            to="/upload" 
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Create Your First Portfolio <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {portfolios.map(portfolio => (
            <div key={portfolio.id} className="border border-border rounded-xl p-6 bg-background shadow-sm hover:shadow-md transition-shadow group">
              <h3 className="font-semibold text-lg mb-1">{portfolio.slug || 'Untitled Portfolio'}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {portfolio.isPublished ? 'Published' : 'Draft'} • {portfolio.viewCount} views
              </p>
              <div className="flex gap-2">
                <Link 
                  to={`/editor/${portfolio.id}`}
                  className="flex-1 text-center bg-muted hover:bg-muted/80 text-foreground py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Edit
                </Link>
                {portfolio.isPublished && (
                  <Link 
                    to={`/p/${portfolio.slug}`}
                    className="flex-1 text-center bg-primary/10 text-primary hover:bg-primary/20 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    View
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
