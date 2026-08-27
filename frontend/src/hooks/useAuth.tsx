import { useState, useEffect, createContext, useContext } from 'react'
import { apiClient } from '../lib/apiClient'
import { authStorage } from '../lib/authStorage'
import type { User, AuthResponse } from '../types/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (data: any) => Promise<void>
  register: (data: any) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = authStorage.getToken()
      if (token) {
        try {
          const user = await apiClient.request<User>('/me')
          setUser(user)
        } catch (e) {
          authStorage.clearToken()
        }
      }
      setLoading(false)
    }
    initAuth()
  }, [])

  const login = async (data: any) => {
    const res = await apiClient.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    authStorage.setToken(res.token)
    setUser(res.user)
  }

  const register = async (data: any) => {
    const res = await apiClient.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    authStorage.setToken(res.token)
    setUser(res.user)
  }

  const logout = () => {
    authStorage.clearToken()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
