import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { apiClient, setCsrfToken, clearCsrfToken } from "../utils/apiClient"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)

  // Saat app load, verifikasi session ke BE via /api/auth/me
  // Ini satu-satunya sumber kebenaran — tidak bergantung localStorage
  const fetchMe = useCallback(async () => {
    try {
      const res = await apiClient.get("/api/auth/me")
      const u = res.data
      setUser({
        id: u.id,
        username: u.username,
        role: u.role,
        fullName: u.full_name,
        email: u.email,
        jabatan: u.jabatan,
      })
    } catch {
      // 401 = tidak ada session aktif, biarkan user null
      setUser(null)
    } finally {
      setAuthReady(true)
    }
  }, [])

  useEffect(() => {
    fetchMe()
  }, [fetchMe])

  const login = (userData, csrfToken) => {
    // csrf_token disimpan di memory via apiClient, bukan localStorage
    setCsrfToken(csrfToken)
    setUser(userData)
  }

  const logout = async () => {
    // BE clear semua cookie, tidak perlu kirim body apapun
    await apiClient.post("/api/auth/logout").catch(() => {})
    clearCsrfToken()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, authReady, login, logout, fetchMe }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)
