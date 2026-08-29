import { authStorage } from './authStorage'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'


export const apiClient = {
  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const token = authStorage.getToken()
    const headers = new Headers(options?.headers)
    if (token) headers.set('Authorization', `Bearer ${token}`)
    if (!headers.has('Content-Type') && !(options?.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json')
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers })
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'API Error' }))
      throw new Error(error.detail || error.message || 'API Error')
    }
    if (response.status === 204) {
      return null as any
    }
    return response.json()
  }
}
