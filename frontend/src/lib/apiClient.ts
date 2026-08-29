import { authStorage } from './authStorage'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

let remainingAiRequests = 1000;


export const apiClient = {
  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const token = authStorage.getToken()
    const headers = new Headers(options?.headers)
    if (token) headers.set('Authorization', `Bearer ${token}`)
    if (!headers.has('Content-Type') && !(options?.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json')
    }

    if (endpoint.includes('/chat')) {
      const body = options?.body ? JSON.parse(options.body as string) : {};
      remainingAiRequests = Math.max(0, remainingAiRequests - 1);
      
      const newPortfolio = { ...body.currentPortfolio };
      // Simulate an AI update (just changing the headline to show it works)
      if (body.message?.toLowerCase().includes('change template')) {
        newPortfolio.templateId = newPortfolio.templateId === 'fresh-minimal' ? 'classic-professional' : 'fresh-minimal';
      }
      
      return new Promise((resolve) => setTimeout(() => resolve({ 
        reply: "I have processed your request and updated the portfolio.", 
        updatedPortfolio: newPortfolio,
        remainingRequests: remainingAiRequests
      } as any), 1500))
    }
    
    // REAL REQUEST
    const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers })
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'API Error' }))
      throw new Error(error.detail || error.message || 'API Error')
    }
    return response.json()
  }
}
