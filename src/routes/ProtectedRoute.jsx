import { Navigate } from "react-router-dom"
import { useAuth } from "../store/AuthContext"

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useAuth()

  // belum login
  if (!user) {
    return <Navigate to="/" replace />
  }

  // role tidak sesuai
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/home" replace />
  }

  return children
}

export default ProtectedRoute
