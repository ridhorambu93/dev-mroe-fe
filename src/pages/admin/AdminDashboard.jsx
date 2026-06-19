import { useMemo } from "react"

const stats = [
  {
    id: 1,
    label: "Total Publikasi",
    value: 124,
    icon: "📄",
    color: "bg-blue-50 text-blue-700",
  },
  {
    id: 2,
    label: "Users Aktif",
    value: 38,
    icon: "👥",
    color: "bg-green-50 text-green-700",
  },
  {
    id: 3,
    label: "Upload Bulan Ini",
    value: 12,
    icon: "📤",
    color: "bg-yellow-50 text-yellow-700",
  },
  {
    id: 4,
    label: "Download",
    value: 1204,
    icon: "📥",
    color: "bg-purple-50 text-purple-700",
  },
]

const recentActivities = [
  {
    id: 1,
    action: "Upload dokumen",
    title: "Economic Outlook 2026",
    user: "admin",
    time: "2 jam lalu",
  },
  {
    id: 2,
    action: "Edit dokumen",
    title: "Makro Brief Januari",
    user: "admin",
    time: "5 jam lalu",
  },
  {
    id: 3,
    action: "Hapus dokumen",
    title: "Draft Report Q4",
    user: "admin",
    time: "1 hari lalu",
  },
]

const quickActions = [
  {
    label: "Upload Dokumen Baru",
    icon: "📤",
    className: "bg-blue-50 text-blue-700 hover:bg-blue-100",
  },
  {
    label: "Tambah User",
    icon: "👤",
    className: "bg-green-50 text-green-700 hover:bg-green-100",
  },
  {
    label: "Update Indikator",
    icon: "📊",
    className: "bg-yellow-50 text-yellow-700 hover:bg-yellow-100",
  },
  {
    label: "Lihat Laporan",
    icon: "📋",
    className: "bg-purple-50 text-purple-700 hover:bg-purple-100",
  },
]

export default function AdminDashboard() {
  const greeting = useMemo(() => {
    const hour = new Date().getHours()

    if (hour < 12) return "Selamat Pagi"
    if (hour < 17) return "Selamat Siang"

    return "Selamat Malam"
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{greeting} 👋</h1>

        <p className="mt-1 text-sm text-slate-500">
          Berikut ringkasan aktivitas terbaru di platform MROE.
        </p>
      </div>

      {/* Statistic */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div key={item.id} className={`rounded-xl border p-5 ${item.color}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">{item.label}</p>

                <h3 className="mt-1 text-2xl font-bold">
                  {item.value.toLocaleString()}
                </h3>
              </div>

              <span className="text-3xl">{item.icon}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Main Content */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Activity */}
        <div className="xl:col-span-2 rounded-xl border bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Aktivitas Terbaru</h2>

            <button className="text-sm text-blue-600 hover:text-blue-700">
              Lihat Semua
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-slate-500">
                  <th className="pb-3">Aksi</th>
                  <th className="pb-3">Dokumen</th>
                  <th className="pb-3">User</th>
                  <th className="pb-3">Waktu</th>
                </tr>
              </thead>

              <tbody>
                {recentActivities.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b last:border-none hover:bg-slate-50">
                    <td className="py-3">{item.action}</td>

                    <td className="py-3 font-medium text-slate-700">
                      {item.title}
                    </td>

                    <td className="py-3 text-slate-500">{item.user}</td>

                    <td className="py-3 text-slate-400">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Action */}
        <div className="rounded-xl border bg-white p-5">
          <h2 className="mb-4 font-semibold text-slate-800">Quick Actions</h2>

          <div className="space-y-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className={`w-full rounded-lg px-4 py-3 text-sm transition flex items-center gap-3 ${action.className}`}>
                <span>{action.icon}</span>
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
