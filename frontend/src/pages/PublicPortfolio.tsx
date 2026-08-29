import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiClient } from '../lib/apiClient'
import type { Portfolio } from '../types/portfolio'
import { getTemplateById } from '../components/templates'
import { Loader2 } from 'lucide-react'

export default function PublicPortfolio() {
  const { slug } = useParams()
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await apiClient.request<Portfolio>(`/p/${slug}`)
        setPortfolio(data)
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchPortfolio()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-primary">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-6">
        <h1 className="text-4xl font-display font-bold mb-4">Portfolio Not Found</h1>
        <p className="text-muted-foreground">The portfolio you are looking for doesn't exist or is not public.</p>
      </div>
    )
  }

  const TemplateComponent = getTemplateById(portfolio.templateId)?.component

  return (
    <div className="min-h-screen">
      {TemplateComponent ? (
        <TemplateComponent portfolio={portfolio} />
      ) : (
        <div className="p-8 text-center text-red-500">Template not found</div>
      )}
    </div>
  )
}
