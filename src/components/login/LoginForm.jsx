import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../store/AuthContext"
import { userService } from "../../services/userService"

import Input from "../Input"
import Button from "../Button"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username || !password) {
      alert("Username dan password wajib diisi")
      return
    }

    const users = await userService.getAll()
    const found = users.find((u) => u.username === username)

    if (!found) {
      alert("Username atau password salah")
      return
    }

    login({
      username: found.username,
      role: found.role,
      fullName: found.fullName,
      divisi: found.divisi,
    })

    navigate(found.role === "ADMIN" ? "/admin" : "/home")
  }

  return (
    <div className="max-w-md mx-auto py-8">
      <h1 className="text-4xl font-medium mb-4">
        Selamat datang di situs Research and Office of Economist bank bjb
      </h1>

      <p className="text-gray-600 mb-10">
        Silakan masuk untuk mengakses materi kajian.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          label="Kata Sandi"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-center">
          <Button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 px-10 py-3 rounded-lg">
            Sign In
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
