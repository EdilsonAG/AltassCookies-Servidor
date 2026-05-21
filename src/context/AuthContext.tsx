// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext<any>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null)
  const [logado, setLogado] = useState(false)

  useEffect(() => {
    if (user != null) {
      setLogado(true)
    }
  }, [])
  
  const login = (userData: any) => setUser(userData)
  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout, logado }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)