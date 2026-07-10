import { useAuth } from "../store/AuthContext"
import { useState, useRef, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { NAV_MENUS } from "../config/navConfig"
import roeLogo from "../assets/images/logo-home-roe.png"
import bjbLogo from "../assets/images/bjb-logo.png"

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const menus = NAV_MENUS

  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [mobileSubmenu, setMobileSubmenu] = useState(null)

  const desktopProfileRef = useRef(null)
  const mobileProfileRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      const inDesktop = desktopProfileRef.current?.contains(e.target)
      const inMobile = mobileProfileRef.current?.contains(e.target)
      if (!inDesktop && !inMobile) {
        setProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const toggleMobileSubmenu = (label) => {
    setMobileSubmenu((prev) => (prev === label ? null : label))
  }

  const profileDropdown = (
    <div className="absolute right-0 mt-2 w-44 bg-white text-slate-800 rounded-lg shadow-lg overflow-hidden z-50">
      <button
        className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-100"
        onClick={() => { navigate("/home"); setProfileOpen(false) }}>
        Beranda
      </button>
      {user?.role === "ADMIN" && (
        <button
          className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-100"
          onClick={() => { navigate("/admin"); setProfileOpen(false) }}>
          Dashboard Admin
        </button>
      )}
      <div className="border-t" />
      <button
        className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-gray-100"
        onClick={handleLogout}>
        Logout
      </button>
    </div>
  )

  return (
    <nav className="bg-[#00549F] text-white">
      <div className="px-6 py-3 flex items-center justify-between">
        {/* Logo Brand */}
        <Link to="/home" className="shrink-0 flex items-center">
          <img src={roeLogo} alt="Research Office Economist" className="h-10 object-contain" />
          <p className="text-[10px] leading-tight">
            Research and <br />
            Office of <br />
            Economist
          </p>
          <div className="border-l border-white pl-1 h-10 ml-1"></div>
          <img src={bjbLogo} alt="Bank BJB" className="h-10 object-contain" />
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden lg:flex items-center gap-6 text-sm">
          {menus.map((menu) => (
            <li key={menu.label} className="relative group">
              <Link to={menu.path} className="hover:text-yellow-300 transition">
                {menu.label}
                {menu.children && <span className="ml-1 text-[10px]">▼</span>}
              </Link>

              {menu.children && (
                <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50">
                  <div className="min-w-[200px] bg-white text-slate-800 rounded-lg shadow-lg overflow-hidden">
                    {menu.children.map((child) => (
                      <Link
                        key={child.tab}
                        to={`${menu.path}?tab=${child.tab}`}
                        className="block px-4 py-3 text-sm hover:bg-gray-100 transition">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          {/* PROFILE (Desktop) */}
          {user && (
            <div className="hidden lg:flex items-center gap-3" ref={desktopProfileRef}>
              <div className="text-right">
                <p className="text-xs font-medium">{user.username}</p>
                <p className="text-[10px] opacity-80">{user.role}</p>
              </div>
              <div className="relative">
                <button
                  className="bg-yellow-400 text-black px-3 py-1.5 rounded text-sm font-medium"
                  onClick={() => setProfileOpen(!profileOpen)}>
                  Profil ▼
                </button>
                {profileOpen && profileDropdown}
              </div>
            </div>
          )}

          {/* PROFILE BUTTON (Mobile) */}
          {user && (
            <div className="lg:hidden relative" ref={mobileProfileRef}>
              <button
                className="bg-yellow-400 text-black px-3 py-1.5 rounded text-sm font-medium"
                onClick={() => setProfileOpen(!profileOpen)}>
                Profil ▼
              </button>
              {profileOpen && profileDropdown}
            </div>
          )}

          {/* HAMBURGER (Mobile) */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu">
            <span className={`block w-6 h-0.5 bg-white transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-blue-400 px-6 pb-4">
          <ul className="space-y-1 pt-3">
            {menus.map((menu) => (
              <li key={menu.label}>
                {menu.children ? (
                  <>
                    <button
                      className="w-full flex justify-between items-center py-2 text-sm hover:text-yellow-300"
                      onClick={() => toggleMobileSubmenu(menu.label)}>
                      {menu.label}
                      <span className="text-[10px]">
                        {mobileSubmenu === menu.label ? "▲" : "▼"}
                      </span>
                    </button>

                    {mobileSubmenu === menu.label && (
                      <ul className="pl-4 space-y-1">
                        {menu.children.map((child) => (
                          <li key={child.tab}>
                            <Link
                              to={`${menu.path}?tab=${child.tab}`}
                              className="block py-1.5 text-sm text-blue-200 hover:text-yellow-300"
                              onClick={() => setMobileOpen(false)}>
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={menu.path}
                    className="block py-2 text-sm hover:text-yellow-300"
                    onClick={() => setMobileOpen(false)}>
                    {menu.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* MOBILE PROFILE */}
          {user && (
            <div className="border-t border-blue-400 mt-3 pt-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium">{user.username}</p>
                <p className="text-[10px] opacity-80">{user.role}</p>
              </div>
              <button
                className="text-sm text-red-300 hover:text-red-100"
                onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
