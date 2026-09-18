import { useState, useEffect } from "react"
import { useAuth } from "../store/AuthContext"

export function useProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) { setLoading(false); return }
    setProfile({
      username: user.username,
      fullName: user.fullName,
      email: user.email || "-",
      divisi: user.divisi || "-",
      role: user.role,
    })
    setLoading(false)
  }, [user])

  return { profile, loading, error }
}
