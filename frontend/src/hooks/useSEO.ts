import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  canonicalUrl?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'profile'
  jsonLd?: Record<string, unknown>
  noIndex?: boolean
}

const SITE_NAME = 'PortfoliAI'
const DEFAULT_DESCRIPTION = 'Upload your resume and let AI instantly generate a beautiful, interactive portfolio website. 8+ designer templates, visual editor, and one-click publishing.'
const SITE_URL = 'https://portfolyo.works'

/**
 * Sets document <title>, meta description, Open Graph tags, and optionally
 * injects JSON-LD structured data into <head>.
 *
 * For AI search result visibility, JSON-LD structured data is the single
 * most impactful thing you can do — it gives AI models structured context
 * about the page content.
 */
export function useSEO({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  jsonLd,
  noIndex = false,
}: SEOProps) {
  useEffect(() => {
    // Title
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Turn Your Resume into a Stunning Portfolio`
    document.title = fullTitle

    // Helper to set/create a meta tag
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    const desc = description || DEFAULT_DESCRIPTION
    setMeta('name', 'description', desc)
    setMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1')

    // Open Graph
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:type', ogType)
    if (canonicalUrl) {
      setMeta('property', 'og:url', canonicalUrl)
    }
    if (ogImage) {
      setMeta('property', 'og:image', ogImage)
    }

    // Twitter
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', desc)
    if (ogImage) {
      setMeta('name', 'twitter:image', ogImage)
    }

    // Canonical
    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (canonicalUrl) {
      if (!canonicalEl) {
        canonicalEl = document.createElement('link')
        canonicalEl.setAttribute('rel', 'canonical')
        document.head.appendChild(canonicalEl)
      }
      canonicalEl.setAttribute('href', canonicalUrl)
    }

    // JSON-LD structured data
    let scriptEl = document.querySelector('script[data-seo-jsonld]') as HTMLScriptElement | null
    if (jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement('script')
        scriptEl.setAttribute('type', 'application/ld+json')
        scriptEl.setAttribute('data-seo-jsonld', 'true')
        document.head.appendChild(scriptEl)
      }
      scriptEl.textContent = JSON.stringify(jsonLd)
    } else if (scriptEl) {
      scriptEl.remove()
    }

    // Cleanup dynamic JSON-LD on unmount
    return () => {
      const el = document.querySelector('script[data-seo-jsonld]')
      if (el) el.remove()
    }
  }, [title, description, canonicalUrl, ogImage, ogType, jsonLd, noIndex])
}

/**
 * Build JSON-LD structured data for a public portfolio page.
 * This is what makes individual portfolios appear as rich results
 * in Google and as structured answers in AI search.
 */
export function buildPortfolioJsonLd(portfolio: {
  slug: string
  headline?: string
  summary?: string
  experience?: Array<{ company: string; role: string }>
  education?: Array<{ institution: string; degree: string }>
  skills?: Array<{ name: string }>
  links?: Array<{ label: string; url: string }>
}) {
  const url = `${SITE_URL}/p/${portfolio.slug}`

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    'url': url,
    'name': portfolio.headline || `${portfolio.slug}'s Portfolio`,
    'description': portfolio.summary || `Professional portfolio of ${portfolio.slug}`,
    'mainEntity': {
      '@type': 'Person',
      'name': portfolio.headline || portfolio.slug,
      'description': portfolio.summary || '',
      'url': url,
      ...(portfolio.skills && portfolio.skills.length > 0 && {
        'knowsAbout': portfolio.skills.map(s => s.name),
      }),
      ...(portfolio.links && portfolio.links.length > 0 && {
        'sameAs': portfolio.links.map(l => l.url),
      }),
    },
  }

  // Add work experience as structured data
  if (portfolio.experience && portfolio.experience.length > 0) {
    (jsonLd.mainEntity as Record<string, unknown>)['hasOccupation'] = portfolio.experience.map(exp => ({
      '@type': 'Occupation',
      'name': exp.role,
      'occupationLocation': {
        '@type': 'Organization',
        'name': exp.company,
      },
    }))
  }

  // Add education
  if (portfolio.education && portfolio.education.length > 0) {
    (jsonLd.mainEntity as Record<string, unknown>)['alumniOf'] = portfolio.education.map(edu => ({
      '@type': 'EducationalOrganization',
      'name': edu.institution,
    }))
  }

  return jsonLd
}
