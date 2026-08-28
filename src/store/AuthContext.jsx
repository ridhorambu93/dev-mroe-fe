import { createContext, useContext, useState } from "react"
import { apiClient } from "../utils/apiClient"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user")) } catch { return null }
  })

  const login = (userData, token = null, refreshToken = null) => {
    localStorage.setItem("user", JSON.stringify(userData))
    if (token) localStorage.setItem("token", token)
    if (refreshToken) localStorage.setItem("refresh_token", refreshToken)
    setUser(userData)
  }

  const logout = async () => {
    const refreshToken = localStorage.getItem("refresh_token")
  
  if (refreshToken) {
      await apiClient
        .post("/api/auth/logout", { refresh_token: refreshToken })
        .catch(() => {})
    }
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)
