import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { publicationService } from "../../services/publicationService"
import { makroEkonomiService } from "../../services/makroEkonomiService"
import { industriService } from "../../services/industriService"
import { regionalService } from "../../services/regionalService"
import { userService } from "../../services/userService"
import { dailyMarketService } from "../../services/dailyMarketService"

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return "Selamat Pagi"
  if (hour < 17) return "Selamat Siang"
  return "Selamat Malam"
}

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [greeting] = useState(getGreeting)
  const [counts, setCounts] = useState({
    publikasi: 0,
    makro: 0,
    industri: 0,
    regional: 0,
    users: 0,
  })
  const [loading, setLoading] = useState(true)
  const [recent, setRecent] = useState([])

  useEffect(() => {
    let active = true
    Promise.all([
      publicationService.getAll(),
      makroEkonomiService.getAll(),
      industriService.getAll(),
      regionalService.getAll(),
      userService.getAll(),
    ])
      .then(([pub, makro, industri, regional, users]) => {
        if (!active) return
        setCounts({
          publikasi: pub.length,
          makro: makro.length,
          industri: industri.length,
          regional: regional.length,
          users: users.length,
        })
        // "Aktivitas terbaru" diambil dari 5 dokumen dengan id terbesar (terbaru dibuat)
        const merged = [
          ...pub.map((d) => ({ ...d, domain: "Publikasi" })),
          ...makro.map((d) => ({ ...d, domain: "Makro Ekonomi" })),
          ...industri.map((d) => ({ ...d, domain: "Industri" })),
          ...regional.map((d) => ({ ...d, domain: "Regional" })),
        ]
          .sort((a, b) => b.id - a.id)
          .slice(0, 5)
        setRecent(merged)
      })
      .finally(() => active && setLoading(false))

    return () => {
      active = false
    }
  }, [])

  const totalDokumen = counts.publikasi + counts.makro + counts.industri + counts.regional

  const stats = [
    { label: "Total Dokumen", value: totalDokumen, icon: "📄", color: "bg-blue-50 text-blue-700" },
    { label: "Publikasi", value: counts.publikasi, icon: "📚", color: "bg-green-50 text-green-700" },
    { label: "Makro + Industri", value: counts.makro + counts.industri, icon: "📈", color: "bg-yellow-50 text-yellow-700" },
    { label: "Users", value: counts.users, icon: "👥", color: "bg-purple-50 text-purple-700" },
  ]

  const quickActions = [
    { label: "Kelola Konten", icon: "📚", color: "bg-blue-50 text-blue-700 hover:bg-blue-100", path: "/admin/publikasi" },
    { label: "Kelola Users", icon: "👥", color: "bg-green-50 text-green-700 hover:bg-green-100", path: "/admin/users" },
    { label: "Settings", icon: "⚙️", color: "bg-yellow-50 text-yellow-700 hover:bg-yellow-100", path: "/admin/settings" },
  ]

  const handleResetAll = async () => {
    if (!window.confirm("Reset semua data ke default? Data yang ditambahkan akan hilang.")) return
    await Promise.all([
      publicationService.reset(),
      makroEkonomiService.reset(),
      industriService.reset(),
      regionalService.reset(),
      dailyMarketService.reset(),
    ])
    window.location.reload()
  }

  return (
    <div className="space-y-6">
      {/* GREETING */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{greeting} 👋</h2>
        <p className="text-slate-500 text-sm mt-1">
          Berikut ringkasan konten terbaru di platform MROE.
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`rounded-xl p-5 ${stat.color} border`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{loading ? "…" : stat.value}</p>
              </div>
              <span className="text-3xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RECENT DOCUMENTS */}
        <div className="lg:col-span-2 bg-white rounded-xl border p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Dokumen Terbaru</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-slate-500">
                  <th className="pb-2 font-medium">Judul</th>
                  <th className="pb-2 font-medium">Kategori</th>
                  <th className="pb-2 font-medium">Bagian</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={3} className="py-6 text-center text-slate-400">
                      Memuat...
                    </td>
                  </tr>
                )}
                {!loading &&
                  recent.map((item) => (
                    <tr key={`${item.domain}-${item.id}`} className="border-b last:border-0">
                      <td className="py-3 font-medium text-slate-700">{item.title}</td>
                      <td className="py-3 text-slate-500">{item.category}</td>
                      <td className="py-3 text-slate-400">{item.domain}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white rounded-xl border p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Quick Actions</h3>

          <div className="space-y-3">
            {quickActions.map((action) => (
              <button
                key={action.path}
                onClick={() => navigate(action.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm ${action.color}`}>
                <span>{action.icon}</span>
                <span>{action.label}</span>
              </button>
            ))}

            <button
              onClick={handleResetAll}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm bg-red-50 text-red-700 hover:bg-red-100">
              <span>🔄</span>
              <span>Reset Semua Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
