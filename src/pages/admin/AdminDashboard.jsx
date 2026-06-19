import { useState, useEffect } from "react"

const stats = [
  { label: "Total Publikasi", value: "124", icon: "📄", color: "bg-blue-50 text-blue-700" },
  { label: "Users Aktif", value: "38", icon: "👥", color: "bg-green-50 text-green-700" },
  { label: "Upload Bulan Ini", value: "12", icon: "📤", color: "bg-yellow-50 text-yellow-700" },
  { label: "Download", value: "1,204", icon: "📥", color: "bg-purple-50 text-purple-700" },
]

const recentActivities = [
  { id: 1, action: "Upload dokumen", title: "Economic Outlook 2026", user: "admin", time: "2 jam lalu" },
  { id: 2, action: "Edit dokumen", title: "Makro Brief Januari", user: "admin", time: "5 jam lalu" },
  { id: 3, action: "Hapus dokumen", title: "Draft Report Q4", user: "admin", time: "1 hari lalu" },
  { id: 4, action: "Upload dokumen", title: "Kajian NPL Konstruksi", user: "admin", time: "2 hari lalu" },
  { id: 5, action: "User baru", title: "user_ridho", user: "system", time: "3 hari lalu" },
]

const AdminDashboard = () => {
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Selamat Pagi")
    else if (hour < 17) setGreeting("Selamat Siang")
    else setGreeting("Selamat Malam")
  }, [])

  return (
    <div className="space-y-6">
      {/* GREETING */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{greeting} 👋</h2>
        <p className="text-slate-500 text-sm mt-1">
          Berikut ringkasan aktivitas terbaru di platform MROE.
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl p-5 ${stat.color} border`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <span className="text-3xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RECENT ACTIVITY TABLE */}
        <div className="lg:col-span-2 bg-white rounded-xl border p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Aktivitas Terbaru</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-slate-500">
                  <th className="pb-2 font-medium">Aksi</th>
                  <th className="pb-2 font-medium">Dokumen</th>
                  <th className="pb-2 font-medium">User</th>
                  <th className="pb-2 font-medium">Waktu</th>
                </tr>
              </thead>
              <tbody>
                {recentActivities.map((activity) => (
                  <tr key={activity.id} className="border-b last:border-0">
                    <td className="py-3">{activity.action}</td>
                    <td className="py-3 font-medium text-slate-700">{activity.title}</td>
                    <td className="py-3 text-slate-500">{activity.user}</td>
                    <td className="py-3 text-slate-400">{activity.time}</td>
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
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition text-sm">
              <span>📤</span>
              <span>Upload Dokumen Baru</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition text-sm">
              <span>👤</span>
              <span>Tambah User</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition text-sm">
              <span>📊</span>
              <span>Update Indikator</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition text-sm">
              <span>📋</span>
              <span>Lihat Laporan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
