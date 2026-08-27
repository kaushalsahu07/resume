import { authStorage } from './authStorage'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

// Mock data for development
const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' }

export const apiClient = {
  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const token = authStorage.getToken()
    const headers = new Headers(options?.headers)
    if (token) headers.set('Authorization', `Bearer ${token}`)
    if (!headers.has('Content-Type') && !(options?.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json')
    }

    // MOCK RESPONSES FOR NOW
    if (endpoint === '/auth/login' || endpoint === '/auth/register') {
      return new Promise((resolve) => setTimeout(() => resolve({ token: 'mock-token', user: mockUser } as any), 500))
    }
    if (endpoint === '/me') {
      return new Promise((resolve) => setTimeout(() => resolve(mockUser as any), 300))
    }
    
    // REAL REQUEST (uncomment when backend is ready)
    /*
    const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers })
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'API Error' }))
      throw new Error(error.message || 'API Error')
    }
    return response.json()
    */
    
    return {} as T
  }
}
