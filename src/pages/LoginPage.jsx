import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../store/AuthContext"

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = () => {
    login(username)

    if (username === "admin") {
      navigate("/admin")
    } else {
      navigate("/home")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border p-6 rounded w-80">
        <input
          className="border w-full p-2 mb-4"
          placeholder="username (admin / user)"
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white w-full p-2"
          onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  )
}

export default LoginPage
