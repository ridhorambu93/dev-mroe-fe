import { useAuth } from "../store/AuthContext"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function Navbar() {
  const { user, logout } = useAuth()

  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)

  const menus = [
    {
      name: "Publikasi",
      path: "/publikasi",
    },
    {
      name: "Makroekonomi",
      path: "/makroekonomi",
    },
    {
      name: "Industry",
      path: "/industry",
    },
    {
      name: "Regional",
      path: "/regional",
    },
    {
      name: "Market Intelligence",
      path: "/market-intelligence",
    },
    {
      name: "Outlook Economic Forum",
      path: "/outlook-economic-forum",
    },
    {
      name: "Daily Market Dashboard",
      path: "/daily-market-dashboard",
    },
  ]

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="bg-[#00549F] text-white h-20 px-8 flex items-center justify-between">
      <div>
        <p className="text-xs">Research and Office of Economist</p>

        <h2 className="font-bold text-xl">bank bjb</h2>
      </div>

      <ul className="hidden lg:flex gap-8 text-sm">
        {menus.map((menu) => (
          <li key={menu.path}>
            <Link to={menu.path}>{menu.name}</Link>
          </li>
        ))}
      </ul>

      {/* Guest */}
      {!user && <div className="w-24" />}

      {/* User Login */}
      {user && (
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-medium">{user.username}</p>

            <p className="text-[10px] opacity-80">{user.role}</p>
          </div>

          <div className="relative">
            <button
              className="bg-yellow-400 text-black px-4 py-2 rounded"
              onClick={() => setIsOpen(!isOpen)}>
              Profil ▼
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50">
                <button
                  className="block w-full text-left px-4 py-3 hover:bg-gray-100"
                  onClick={() => {
                    navigate("/home")
                    setIsOpen(false)
                  }}>
                  Beranda
                </button>

                {user.role === "ADMIN" && (
                  <button
                    className="block w-full text-left px-4 py-3 hover:bg-gray-100"
                    onClick={() => {
                      navigate("/admin")
                      setIsOpen(false)
                    }}>
                    Dashboard Admin
                  </button>
                )}

                <div className="border-t" />

                <button
                  className="block w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100"
                  onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
