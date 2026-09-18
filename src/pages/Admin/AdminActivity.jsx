import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../../utils/apiClient"
import Pagination from "../../components/admin/Pagination"

const PAGE_SIZE = 20

function formatDate(iso) {
  if (!iso) return "-"
  return new Date(iso).toLocaleString("id-ID", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  })
}

const ACTION_COLORS = {
  create: "bg-green-100 text-green-700",
  update: "bg-blue-100 text-blue-700",
  delete: "bg-red-100 text-red-700",
  login: "bg-purple-100 text-purple-700",
  logout: "bg-slate-100 text-slate-600",
  download: "bg-yellow-100 text-yellow-700",
}

export default function AdminActivity() {
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const { data: res, isLoading } = useQuery({
    queryKey: ["admin-activities"],
    queryFn: () => apiClient.get("/api/admin/activities"),
  })

  const activities = res?.data ?? []

  const filtered = useMemo(() => {
    if (!search.trim()) return activities
    const q = search.toLowerCase()
    return activities.filter(
      (a) =>
        a.username?.toLowerCase().includes(q) ||
        a.action?.toLowerCase().includes(q) ||
        a.description?.toLowerCase().includes(q),
    )
  }, [activities, search])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const handleSearch = (val) => { setSearch(val); setCurrentPage(1) }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Activity Log</h2>
        <p className="text-sm text-slate-500 mt-1">Riwayat semua perubahan dan aktivitas pengguna.</p>
      </div>

      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Cari user, aksi, deskripsi..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full border rounded-lg pl-9 pr-4 py-2 text-sm"
        />
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b text-left text-slate-500">
                <th className="px-4 py-3 font-medium w-10">#</th>
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Aksi</th>
                <th className="px-4 py-3 font-medium">Deskripsi</th>
                <th className="px-4 py-3 font-medium whitespace-nowrap">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-slate-400">Memuat...</td></tr>
              )}
              {!isLoading && paginated.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-slate-400">Tidak ada data</td></tr>
              )}
              {!isLoading && paginated.map((row, i) => (
                <tr key={row.id ?? i} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 text-slate-400">{(currentPage - 1) * PAGE_SIZE + i + 1}</td>
                  <td className="px-4 py-3 font-medium text-slate-700 whitespace-nowrap">{row.username || "-"}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${ACTION_COLORS[row.action?.toLowerCase()] ?? "bg-gray-100 text-gray-600"}`}>
                      {row.action || "-"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 max-w-xs">
                    <span className="line-clamp-2">{row.description || "-"}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                    {row.time_ago || formatDate(row.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-400">Menampilkan {paginated.length} dari {filtered.length} aktivitas</p>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  )
}
