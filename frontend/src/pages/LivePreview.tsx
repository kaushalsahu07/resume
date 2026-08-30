import { useState, useEffect } from 'react'
import { getTemplateById } from '../components/templates'
import type { Portfolio } from '../types/portfolio'

export default function LivePreview() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)

  useEffect(() => {
    // Listen for updates from the parent Editor window
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'UPDATE_PORTFOLIO' && e.data?.portfolio) {
        setPortfolio(e.data.portfolio)
      }
    }

    window.addEventListener('message', handleMessage)
    
    // Notify parent that iframe is ready to receive data
    window.parent.postMessage({ type: 'PREVIEW_READY' }, '*')

    return () => window.removeEventListener('message', handleMessage)
  }, [])

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse flex gap-2">
          <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
          <div className="w-2 h-2 bg-slate-300 rounded-full animation-delay-150"></div>
          <div className="w-2 h-2 bg-slate-300 rounded-full animation-delay-300"></div>
        </div>
      </div>
    )
  }

  const activeTemplateId = portfolio.templateId || (portfolio as any).template_id || 'cosmic-violet'
  const Template = getTemplateById(activeTemplateId).component

  return <Template portfolio={portfolio} />
}
