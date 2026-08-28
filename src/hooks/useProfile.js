import { useState, useEffect } from "react"
import { useAuth } from "../store/AuthContext"
import { apiClient } from "../utils/apiClient"

export function useProfile() {
  const { user, login } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    apiClient.get("/api/profile")
      .then((res) => {
        if (!active) return
        const data = res.data
        const mapped = {
          username: data.username,
          fullName: data.full_name,
          email: data.email,
          divisi: data.divisi,
          role: data.role,
          status: data.status,
          createdAt: data.created_at,
        }
        setProfile(mapped)
        login({ ...user, ...mapped }, localStorage.getItem("token"))
      })
      .catch((err) => {
        if (active) setError(err.message || "Gagal memuat profil")
      })
      .finally(() => active && setLoading(false))

    return () => { active = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { profile, loading, error }
}
