import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useAuth } from "../../store/AuthContext"
import { userService } from "../../services/userService"
import Input from "../Input"
import Button from "../Button"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username || !password) {
      toast.error("Username dan password wajib diisi")
      return
    }

    setLoading(true)
    try {
      const users = await userService.getAll()
      const found = users.find((u) => u.username === username)
      if (!found) throw new Error("Username atau password salah")

      login({ username: found.username, role: found.role, fullName: found.fullName, divisi: found.divisi })
      toast.success(`Selamat datang, ${found.fullName || found.username}!`)
      navigate(found.role === "ADMIN" ? "/admin" : "/home")
    } catch (err) {
      toast.error(err.message || "Username atau password salah")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto py-8 animate-fade-in-up">
      <h1 className="text-4xl font-medium mb-4">
        Sistem Informasi <br/> Global Market & Analytics
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
            disabled={loading}
            className="bg-yellow-400 hover:bg-yellow-500 px-10 py-3 rounded-lg disabled:opacity-60 transition-all duration-200">
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Masuk...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
