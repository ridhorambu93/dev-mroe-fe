import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "../Input"
import Button from "../Button"

const LoginForm = () => {
  const navigate = useNavigate()

  const DUMMY_USER = [
    {
      username: "admin",
      password: "admin123",
    },
    {
      username: "user",
      password: "user123",
    },
  ]

  const [form, setForm] = useState({
    username: "",
    password: "",
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = DUMMY_USER.find(
      (u) => u.username === form.username && u.password === form.password,
    )

    if (user) {
      navigate("/home")
    } else {
      alert("Username atau password salah")
    }
  }

  return (
    <div className="max-w-md">
      <h1 className="text-4xl font-medium mb-4">
        Selamat datang di situs Research and Office of Economist bank bjb
      </h1>

      <p className="text-gray-600 mb-10">
        Silakan masuk untuk mengakses materi kajian.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="User"
          name="username"
          value={form.username}
          onChange={handleChange}
        />

        <Input
          label="Kata Sandi"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <Button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 transition px-10 py-3 rounded-lg">
          Sign In
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
