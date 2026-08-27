import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiClient } from '../lib/apiClient'
import type { Portfolio } from '../types/portfolio'
import FreshMinimalTemplate from '../components/templates/FreshMinimalTemplate'
import ClassicProfessionalTemplate from '../components/templates/ClassicProfessionalTemplate'
import { Loader2 } from 'lucide-react'

export default function PublicPortfolio() {
  const { slug } = useParams()
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        // Mock fetch for public portfolio by slug
        // const data = await apiClient.request<Portfolio>(`/p/${slug}`)
        // Mocking failure since backend is not there, or we could just show the demo mock
        // For testing purposes, we'll wait a bit and show error to pretend it's live
        await new Promise(resolve => setTimeout(resolve, 800))
        throw new Error('Not found')
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

  return (
    <div className="min-h-screen">
      {portfolio.templateId === 'classic-professional' ? (
        <ClassicProfessionalTemplate portfolio={portfolio} />
      ) : (
        <FreshMinimalTemplate portfolio={portfolio} />
      )}
    </div>
  )
}
