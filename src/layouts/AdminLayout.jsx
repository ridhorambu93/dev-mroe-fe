import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../store/AuthContext"

const sidebarMenus = [
  { label: "Dashboard", path: "/admin", icon: "📊" },
  { label: "Kelola Konten", path: "/admin/publikasi", icon: "📄" },
  { label: "Users", path: "/admin/users", icon: "👥" },
  { label: "Profil", path: "/admin/profile", icon: "👤" },
  { label: "Settings", path: "/admin/settings", icon: "⚙️" },
]

const AdminLayout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const activeMenu =
    [...sidebarMenus]
      .sort((a, b) => b.path.length - a.path.length)
      .find((m) => location.pathname === m.path || location.pathname.startsWith(`${m.path}/`)) ||
    sidebarMenus[0]

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="min-h-screen flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        {/* Sidebar Header */}
        <div className="px-5 py-5 border-b border-slate-700">
          <h2 className="font-bold text-lg">Admin Panel</h2>
          <p className="text-xs text-slate-400 mt-1">BJB MROE</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarMenus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              end={menu.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  isActive
                    ? "bg-blue-600 text-white font-medium"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <span>{menu.icon}</span>
              <span>{menu.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-4 py-4 border-t border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
              {user?.username?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.username}</p>
              <p className="text-[10px] text-slate-400">{user?.role}</p>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <button
              onClick={() => navigate("/home")}
              className="w-full text-left text-xs text-slate-300 hover:text-white"
            >
              🏠 Ke Beranda
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left text-xs text-red-400 hover:text-red-300"
            >
              ← Logout
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-gray-50 overflow-auto">
        {/* Top Bar */}
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-slate-800">{activeMenu.label}</h1>
          <div className="text-sm text-slate-500">
            {new Date().toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout
