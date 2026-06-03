import { Navigate } from "react-router-dom"
import { useAuth } from "../store/AuthContext"

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/" replace />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/home" replace />
  }

  return children
}

export default ProtectedRoute
