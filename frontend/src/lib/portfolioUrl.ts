export function getPortfolioPublicUrl(slug: string): string {
  if (!slug) return '#'
  const hostname = window.location.hostname
  const port = window.location.port ? `:${window.location.port}` : ''
  const protocol = window.location.protocol

  // Localhost development
  if (hostname.includes('localhost') || hostname === '127.0.0.1') {
    return `http://${slug}.localhost${port}`
  }

  // Production domain
  const rootDomain = hostname.replace(/^(www\.|app\.)/, '')
  const baseDomain = rootDomain || 'portfolio.me'
  return `${protocol}//${slug}.${baseDomain}`
}
