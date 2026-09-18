import { useState, useMemo } from "react"
import { Trash2, Eye, EyeOff, Star, Search } from "lucide-react"
import { useCrud } from "../../hooks/useCrud"
import { reviewService } from "../../services/reviewService"
import ConfirmDialog from "../../components/admin/ConfirmDialog"
import Pagination from "../../components/admin/Pagination"

const PAGE_SIZE = 10

const FILTER_OPTIONS = [
  { value: "all", label: "Semua" },
  { value: "visible", label: "Ditampilkan" },
  { value: "hidden", label: "Disembunyikan" },
]

function StarRating({ value }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={13}
          className={s <= value ? "fill-yellow-400 text-yellow-400" : "fill-slate-200 text-slate-200"}
        />
      ))}
    </div>
  )
}

function formatDate(iso) {
  if (!iso) return "-"
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
}

export default function AdminFeedback() {
  const { data, loading, saving, update, remove } = useCrud(reviewService)

  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [deleting, setDeleting] = useState(null)

  const filtered = useMemo(() => {
    let result = data
    if (filter === "visible") result = result.filter((r) => !r.is_hidden)
    if (filter === "hidden") result = result.filter((r) => r.is_hidden)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (r) =>
          r.publication_title?.toLowerCase().includes(q) ||
          r.created_by?.toLowerCase().includes(q) ||
          r.comment?.toLowerCase().includes(q),
      )
    }
    return result
  }, [data, filter, search])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const handleSearch = (val) => { setSearch(val); setCurrentPage(1) }
  const handleFilterChange = (val) => { setFilter(val); setCurrentPage(1) }

  const handleToggleHide = async (row) => {
    await update(row.id, { is_hidden: !row.is_hidden })
  }

  const handleDelete = async () => {
    if (!deleting) return
    await remove(deleting.id)
    setDeleting(null)
  }

  const visibleCount = data.filter((r) => !r.is_hidden).length
  const hiddenCount = data.filter((r) => r.is_hidden).length
  const avgRating = data.length
    ? (data.reduce((sum, r) => sum + (r.rating || 0), 0) / data.length).toFixed(1)
    : "0"

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Customer Feedback</h2>
        <p className="text-sm text-slate-500 mt-1">Moderasi rating dan komentar dari pengguna.</p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Feedback", value: data.length, color: "bg-blue-50 text-blue-700" },
          { label: "Ditampilkan", value: visibleCount, color: "bg-green-50 text-green-700" },
          { label: "Disembunyikan", value: hiddenCount, color: "bg-yellow-50 text-yellow-700" },
          { label: "Rating Rata-rata", value: `${avgRating} / 5`, color: "bg-purple-50 text-purple-700" },
        ].map((card) => (
          <div key={card.label} className={`rounded-xl border p-4 ${card.color}`}>
            <p className="text-xs opacity-70">{card.label}</p>
            <p className="text-xl font-bold mt-1">{loading ? "…" : card.value}</p>
          </div>
        ))}
      </div>

      {/* TOOLBAR */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari publikasi, user, komentar..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full border rounded-lg pl-9 pr-4 py-2 text-sm"
          />
        </div>
        <div className="flex gap-1">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleFilterChange(opt.value)}
              className={`px-3 py-2 text-sm rounded-lg transition ${
                filter === opt.value
                  ? "bg-slate-800 text-white font-medium"
                  : "bg-gray-100 text-slate-600 hover:bg-gray-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b text-left text-slate-500">
                <th className="px-4 py-3 font-medium w-10">#</th>
                <th className="px-4 py-3 font-medium">Publikasi</th>
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Rating</th>
                <th className="px-4 py-3 font-medium">Komentar</th>
                <th className="px-4 py-3 font-medium">Tanggal</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-slate-400">Memuat...</td>
                </tr>
              )}
              {!loading && paginated.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-slate-400">Tidak ada data</td>
                </tr>
              )}
              {!loading && paginated.map((row, i) => (
                <tr key={row.id} className={`border-b last:border-0 hover:bg-gray-50 ${row.is_hidden ? "opacity-50" : ""}`}>
                  <td className="px-4 py-3 text-slate-400">{(currentPage - 1) * PAGE_SIZE + i + 1}</td>
                  <td className="px-4 py-3 font-medium text-slate-700 max-w-[160px]">
                    <span className="line-clamp-2">{row.publication_title || "-"}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.created_by || "-"}</td>
                  <td className="px-4 py-3">
                    <StarRating value={row.rating || 0} />
                  </td>
                  <td className="px-4 py-3 text-slate-500 max-w-[240px]">
                    <span className="line-clamp-2">{row.comment || "-"}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{formatDate(row.created_at)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      row.is_hidden
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}>
                      {row.is_hidden ? "Hidden" : "Visible"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleToggleHide(row)}
                        disabled={saving}
                        title={row.is_hidden ? "Tampilkan" : "Sembunyikan"}
                        className={`p-1.5 rounded-lg transition ${
                          row.is_hidden
                            ? "text-green-600 hover:bg-green-50"
                            : "text-yellow-600 hover:bg-yellow-50"
                        }`}
                      >
                        {row.is_hidden ? <Eye size={15} /> : <EyeOff size={15} />}
                      </button>
                      <button
                        onClick={() => setDeleting(row)}
                        title="Hapus"
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-400">
          Menampilkan {paginated.length} dari {filtered.length} feedback
        </p>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>

      <ConfirmDialog
        open={!!deleting}
        title="Hapus Feedback"
        message={`Hapus feedback dari "${deleting?.created_by}"? Tindakan ini tidak dapat dibatalkan.`}
        saving={saving}
        onCancel={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
    </div>
  )
}
