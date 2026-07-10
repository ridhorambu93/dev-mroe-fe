import { useState, useMemo } from "react"
import { usePages, useDocuments, useDocumentMutations } from "../../hooks/useQueryHooks"
import { buildPeriodFields, PERIOD_TYPES, DEFAULT_SUBSECTION_PERIODS } from "../../config/periodConfig"
import { Plus, Pencil, Trash2, Search, Info } from "lucide-react"
import FormModal from "../../components/admin/FormModal"
import ConfirmDialog from "../../components/admin/ConfirmDialog"
import Pagination from "../../components/admin/Pagination"
import HomeConfigEditor from "../../components/admin/HomeConfigEditor"

const PAGE_SIZE = 10

export default function AdminPublikasi() {
  const { data: pages = [] } = usePages()
  const sortedPages = useMemo(() => [...pages].sort((a, b) => a.id - b.id), [pages])

  const [activeSection, setActiveSection] = useState("beranda")

  const tabs = [
    { key: "beranda", label: "⚙️ Beranda" },
    ...sortedPages.map((p) => ({ key: p.slug, label: p.name })),
  ]

  return (
    <div className="space-y-6">
      {/* TABS */}
      <div className="flex gap-1 border-b pb-3 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveSection(tab.key)}
            className={`px-3 py-2 text-sm rounded-t-lg transition whitespace-nowrap ${
              activeSection === tab.key
                ? "bg-blue-600 text-white font-medium"
                : "bg-gray-100 text-slate-600 hover:bg-gray-200"
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeSection === "beranda" && <HomeConfigEditor />}

      {sortedPages.find((p) => p.slug === activeSection) && (
        <SectionContent page={sortedPages.find((p) => p.slug === activeSection)} />
      )}
    </div>
  )
}

function Toast({ message, type, onClose }) {
  return (
    <div className={`fixed top-6 right-6 z-[100] px-5 py-3 rounded-lg shadow-lg text-sm font-medium text-white animate-fade-in ${
      type === "success" ? "bg-green-600" : "bg-red-600"
    }`}>
      {message}
      <button onClick={onClose} className="ml-3 opacity-70 hover:opacity-100">✕</button>
    </div>
  )
}

function SectionContent({ page }) {
  const { data: docs = [], isLoading } = useDocuments(page.slug)
  const { createDoc, updateDoc, removeDoc } = useDocumentMutations(page.slug)

  const [activeSubsection, setActiveSubsection] = useState(page.categories?.[0] || null)
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [toast, setToast] = useState(null)

  const showToast = (message, type = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const subsections = page.categories || []
  const subsectionPeriods = page.subsectionPeriods || {}

  const periodType = subsectionPeriods[activeSubsection]
    || DEFAULT_SUBSECTION_PERIODS[activeSubsection]
    || "monthly"

  const fields = useMemo(() => {
    const base = [
      { name: "title", label: "Judul", type: "text", required: true, table: true },
    ]
    if (subsections.length > 1) {
      base.push({ name: "category", label: "Subsection", type: "select", required: true, table: true, options: subsections })
    }
    base.push({ name: "description", label: "Deskripsi", type: "text", table: true })
    base.push(...buildPeriodFields(periodType))
    base.push(
      { name: "author", label: "Penyusun", type: "text", required: true, table: true },
      { name: "file", label: "File (PDF)", type: "file" },
    )
    return base
  }, [subsections, periodType])

  const tableFields = useMemo(() => fields.filter((f) => f.table), [fields])

  const filtered = useMemo(() => {
    let result = docs
    if (activeSubsection && subsections.length > 1) {
      result = result.filter((d) => d.category === activeSubsection)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((d) =>
        tableFields.some((f) => String(d[f.name] ?? "").toLowerCase().includes(q))
      )
    }
    return result
  }, [docs, activeSubsection, search, subsections, tableFields])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const handleSearch = (val) => { setSearch(val); setCurrentPage(1) }
  const openCreate = () => { setEditing(null); setModalOpen(true) }
  const openEdit = (row) => { setEditing(row); setModalOpen(true) }

  const handleSubmit = async (form) => {
    try {
      if (subsections.length === 1) form.category = subsections[0]
      if (editing) await updateDoc.mutateAsync({ id: editing.id, data: form })
      else await createDoc.mutateAsync(form)
      setModalOpen(false)
      setEditing(null)
      showToast(editing ? "Data berhasil diperbarui!" : "Data berhasil ditambahkan!")
    } catch {
      showToast("Gagal menyimpan data.", "error")
    }
  }

  const handleDelete = async () => {
    if (!deleting) return
    try {
      await removeDoc.mutateAsync(deleting.id)
      setDeleting(null)
      showToast("Data berhasil dihapus!")
    } catch {
      showToast("Gagal menghapus data.", "error")
    }
  }

  const saving = createDoc.isPending || updateDoc.isPending || removeDoc.isPending

  return (
    <div className="space-y-5">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{page.name}</h2>
      </div>

      {/* SUBSECTION INFO */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b text-left text-slate-500">
              <th className="px-4 py-2 font-medium">Subsection</th>
              <th className="px-4 py-2 font-medium">Periode</th>
              <th className="px-4 py-2 font-medium">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {subsections.map((sub) => {
              const pt = subsectionPeriods[sub] || DEFAULT_SUBSECTION_PERIODS[sub] || "monthly"
              const count = docs.filter((d) => d.category === sub).length
              return (
                <tr key={sub} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium text-slate-700">{sub}</td>
                  <td className="px-4 py-2 text-slate-500">{PERIOD_TYPES[pt]?.label || pt}</td>
                  <td className="px-4 py-2 text-slate-500">{count}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* SUBSECTION TABS */}
      {subsections.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {subsections.map((sub) => (
            <button
              key={sub}
              onClick={() => { setActiveSubsection(sub); setCurrentPage(1) }}
              className={`px-3 py-1.5 text-sm rounded-lg transition ${
                activeSubsection === sub ? "bg-slate-800 text-white" : "bg-gray-100 text-slate-600 hover:bg-gray-200"
              }`}>
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* PERIOD INFO */}
      <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">
        <Info size={16} />
        <span>Periode: <strong>{PERIOD_TYPES[periodType]?.label}</strong></span>
      </div>

      {/* TOOLBAR */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Cari data..." value={search} onChange={(e) => handleSearch(e.target.value)} className="w-full border rounded-lg pl-9 pr-4 py-2 text-sm" />
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition self-start">
          <Plus size={16} /> Tambah Data
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b text-left text-slate-500">
                <th className="px-4 py-3 font-medium w-12">#</th>
                {tableFields.map((f) => <th key={f.name} className="px-4 py-3 font-medium">{f.label}</th>)}
                <th className="px-4 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && <tr><td colSpan={tableFields.length + 2} className="px-4 py-10 text-center text-slate-400">Memuat...</td></tr>}
              {!isLoading && paginated.length === 0 && <tr><td colSpan={tableFields.length + 2} className="px-4 py-10 text-center text-slate-400">Tidak ada data</td></tr>}
              {!isLoading && paginated.map((row, i) => (
                <tr key={row.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 text-slate-400">{(currentPage - 1) * PAGE_SIZE + i + 1}</td>
                  {tableFields.map((f) => <td key={f.name} className="px-4 py-3 text-slate-700"><span className="line-clamp-2">{row[f.name] || "-"}</span></td>)}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(row)} className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50"><Pencil size={16} /></button>
                      <button onClick={() => setDeleting(row)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-400">Menampilkan {paginated.length} dari {filtered.length} data</p>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>

      {modalOpen && (
        <FormModal
          key={editing ? `edit-${editing.id}` : "create"}
          title={editing ? `Edit ${activeSubsection || page.name}` : `Tambah ${activeSubsection || page.name}`}
          fields={fields}
          initialValues={editing}
          saving={saving}
          onClose={() => { setModalOpen(false); setEditing(null) }}
          onSubmit={handleSubmit}
        />
      )}

      <ConfirmDialog open={!!deleting} title="Hapus Data" message={`Hapus "${deleting?.title || "data ini"}"?`} saving={saving} onCancel={() => setDeleting(null)} onConfirm={handleDelete} />
    </div>
  )
}
