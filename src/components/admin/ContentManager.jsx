import { useMemo, useState } from "react"
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import { useCrud } from "../../hooks/useCrud"
import FormModal from "./FormModal"
import ConfirmDialog from "./ConfirmDialog"
import Pagination from "./Pagination"

const PAGE_SIZE = 10

export default function ContentManager({ title, description, service, fields }) {
  const { data, loading, error, saving, create, update, remove } = useCrud(service)

  const [search, setSearch] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const tableFields = useMemo(() => fields.filter((f) => f.table), [fields])
  const searchKeys = useMemo(() => tableFields.map((f) => f.name), [tableFields])

  const filtered = useMemo(() => {
    if (!search.trim()) return data
    const q = search.toLowerCase()
    return data.filter((row) =>
      searchKeys.some((key) => String(row[key] ?? "").toLowerCase().includes(q)),
    )
  }, [data, search, searchKeys])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, currentPage])

  // Reset page saat search berubah
  const handleSearch = (val) => {
    setSearch(val)
    setCurrentPage(1)
  }

  const openCreate = () => { setEditing(null); setModalOpen(true) }
  const openEdit = (row) => { setEditing(row); setModalOpen(true) }

  const handleSubmit = async (form) => {
    if (editing) await update(editing.id, form)
    else await create(form)
    setModalOpen(false)
    setEditing(null)
  }

  const handleDelete = async () => {
    if (!deleting) return
    await remove(deleting.id)
    setDeleting(null)
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
          {description && <p className="text-slate-500 text-sm mt-1">{description}</p>}
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition self-start">
          <Plus size={16} />
          Tambah Data
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Cari data..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full border rounded-lg pl-9 pr-4 py-2 text-sm"
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>
      )}

      {/* TABLE */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b text-left text-slate-500">
                <th className="px-4 py-3 font-medium w-12">#</th>
                {tableFields.map((f) => (
                  <th key={f.name} className="px-4 py-3 font-medium">{f.label}</th>
                ))}
                <th className="px-4 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={tableFields.length + 2} className="px-4 py-10 text-center text-slate-400">
                    Memuat data...
                  </td>
                </tr>
              )}

              {!loading && paginated.length === 0 && (
                <tr>
                  <td colSpan={tableFields.length + 2} className="px-4 py-10 text-center text-slate-400">
                    Tidak ada data
                  </td>
                </tr>
              )}

              {!loading &&
                paginated.map((row, index) => (
                  <tr key={row.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="px-4 py-3 text-slate-400">
                      {(currentPage - 1) * PAGE_SIZE + index + 1}
                    </td>
                    {tableFields.map((f) => (
                      <td key={f.name} className="px-4 py-3 text-slate-700">
                        <span className="line-clamp-2">{row[f.name] || "-"}</span>
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(row)}
                          title="Edit"
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50">
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => setDeleting(row)}
                          title="Hapus"
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER: count + pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-400">
          Menampilkan {paginated.length} dari {filtered.length} data
        </p>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* MODALS */}
      {modalOpen && (
        <FormModal
          key={editing ? `edit-${editing.id}` : "create"}
          title={editing ? `Edit ${title}` : `Tambah ${title}`}
          fields={fields}
          initialValues={editing}
          saving={saving}
          onClose={() => { setModalOpen(false); setEditing(null) }}
          onSubmit={handleSubmit}
        />
      )}

      <ConfirmDialog
        open={!!deleting}
        title="Hapus Data"
        message={`Yakin ingin menghapus "${deleting?.title || deleting?.username || "data ini"}"? Tindakan ini tidak dapat dibatalkan.`}
        saving={saving}
        onCancel={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
    </div>
  )
}
