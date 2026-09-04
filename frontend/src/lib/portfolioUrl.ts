export function getPortfolioPublicUrl(slug: string): string {
  if (!slug) return '#'
  const hostname = window.location.hostname
  const port = window.location.port ? `:${window.location.port}` : ''
  const protocol = window.location.protocol

  // Localhost development
  if (hostname.includes('localhost') || hostname === '127.0.0.1') {
    return `http://${slug}.localhost${port}`
  }

  // Check if we are on a PaaS domain that doesn't support wildcard subdomains
  const isPaas = hostname.endsWith('.onrender.com') || 
                 hostname.endsWith('.vercel.app') || 
                 hostname.endsWith('.netlify.app') ||
                 hostname.endsWith('.pages.dev')

  if (isPaas) {
    // For Vercel/Render, we must use the path-based routing
    return `${protocol}//${hostname}${port}/p/${slug}`
  }

  // Production custom domain (e.g. portfolyo.works)
  const rootDomain = hostname.replace(/^(www\.|app\.)/, '')
  const baseDomain = rootDomain || 'portfolyo.works'
  return `${protocol}//${slug}.${baseDomain}${port}`
}
