import { useAuth } from "../store/AuthContext"

export function useProfile() {
  const { user, authReady } = useAuth()

  return {
    profile: user,
    loading: !authReady,
    error: null,
  }
}
