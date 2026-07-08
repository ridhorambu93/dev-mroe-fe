import { useState } from "react"
import { Plus, Pencil, Trash2, Image, Link, Tag, ChevronDown, ChevronUp } from "lucide-react"
import { useCrud } from "../../hooks/useCrud"
import { pageService } from "../../services/pageService"
import ImageUpload from "./ImageUpload"
import ConfirmDialog from "./ConfirmDialog"

export default function PageManager() {
  const { data: pages, loading, saving, create, update, remove } = useCrud(pageService)

  const [expanded, setExpanded] = useState(null)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const [form, setForm] = useState({ name: "", slug: "", banner: "", categories: "", gridCategories: "", layout: "default", gallery: [] })
  const [errors, setErrors] = useState({})

  const resetForm = () => {
    setForm({ name: "", slug: "", banner: "", categories: "", gridCategories: "", layout: "default", gallery: [] })
    setErrors({})
    setEditing(null)
    setFormOpen(false)
  }

  const openCreate = () => {
    resetForm()
    setFormOpen(true)
  }

  const openEdit = (page) => {
    setEditing(page)
    setForm({
      name: page.name,
      slug: page.slug,
      banner: page.banner || "",
      categories: (page.categories || []).join(", "),
      gridCategories: (page.gridCategories || []).join(", "),
      layout: page.layout || "default",
      gallery: page.gallery || [],
    })
    setErrors({})
    setFormOpen(true)
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = "Nama halaman wajib diisi"
    if (!form.slug.trim()) e.slug = "Slug wajib diisi"
    if (form.layout !== "forum" && !form.categories.trim()) e.categories = "Minimal 1 kategori"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    // Pastikan slug diawali /
    let slug = form.slug.trim()
    if (!slug.startsWith("/")) slug = "/" + slug
    const payload = {
      name: form.name.trim(),
      slug,
      banner: (form.banner || "").trim(),
      categories: form.categories.split(",").map((c) => c.trim()).filter(Boolean),
      gridCategories: form.gridCategories.split(",").map((c) => c.trim()).filter(Boolean),
      layout: form.layout,
      gallery: form.gallery || [],
    }
    if (editing) await update(editing.id, payload)
    else await create(payload)
    resetForm()
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
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Halaman</h2>
          <p className="text-slate-500 text-sm mt-1">
            Kelola halaman publikasi: nama, slug/URL, banner, dan kategori.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition self-start">
          <Plus size={16} />
          Tambah Halaman
        </button>
      </div>

      {/* FORM (inline) */}
      {formOpen && (
        <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-5 space-y-4">
          <h3 className="font-semibold text-slate-800">
            {editing ? `Edit: ${editing.name}` : "Tambah Halaman Baru"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Nama Halaman <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Contoh: Publikasi"
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Slug / URL Path <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="Contoh: /publikasi"
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
              {errors.slug && <p className="text-xs text-red-500 mt-1">{errors.slug}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Tipe Layout
              </label>
              <select
                value={form.layout}
                onChange={(e) => setForm({ ...form, layout: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-white">
                <option value="default">Default (Accordion)</option>
                <option value="regional">Regional (Triwulan)</option>
                <option value="forum">Forum / Event (Slider + Materi)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Kategori / Tab <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.categories}
                onChange={(e) => setForm({ ...form, categories: e.target.value })}
                placeholder="Pisahkan dengan koma"
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
              {errors.categories && <p className="text-xs text-red-500 mt-1">{errors.categories}</p>}
              <p className="text-xs text-slate-400 mt-1">
                {form.layout === "forum" ? "Digunakan sebagai nama pembicara/section" : "Digunakan sebagai tab filter"}
              </p>
            </div>

            {form.layout === "default" && (
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Kategori Layout Grid
                </label>
                <input
                  type="text"
                  value={form.gridCategories}
                  onChange={(e) => setForm({ ...form, gridCategories: e.target.value })}
                  placeholder="Kategori yg pakai grid (kosong = semua list)"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            )}

            {form.layout !== "forum" && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Banner / Hero Image
                </label>
                <ImageUpload
                  value={form.banner}
                  onChange={(url) => setForm({ ...form, banner: url })}
                />
              </div>
            )}

            {form.layout === "forum" && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Gallery / Slider Images
                </label>
                <div className="space-y-2">
                  {form.gallery.map((img, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <img src={img} alt={`Slide ${i+1}`} className="h-16 w-24 object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, gallery: form.gallery.filter((_, idx) => idx !== i) })}
                        className="text-xs text-red-500 hover:underline">
                        Hapus
                      </button>
                    </div>
                  ))}
                  <ImageUpload
                    value=""
                    onChange={(url) => setForm({ ...form, gallery: [...form.gallery, url] })}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60">
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 text-sm rounded-lg bg-gray-100 text-slate-700 hover:bg-gray-200">
              Batal
            </button>
          </div>
        </form>
      )}

      {/* LOADING */}
      {loading && <div className="text-center text-slate-400 py-10">Memuat data...</div>}

      {/* PAGE LIST */}
      {!loading && (
        <div className="space-y-3">
          {pages.map((page) => (
            <div key={page.id} className="bg-white border rounded-xl overflow-hidden">
              {/* Page Header */}
              <div
                className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setExpanded(expanded === page.id ? null : page.id)}>
                <div className="flex items-center gap-3">
                  <span className="text-lg">📄</span>
                  <div>
                    <p className="font-semibold text-slate-800">{page.name}</p>
                    <p className="text-xs text-slate-400">{page.slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); openEdit(page) }}
                    className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50">
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeleting(page) }}
                    className="p-1.5 rounded-lg text-red-600 hover:bg-red-50">
                    <Trash2 size={16} />
                  </button>
                  {expanded === page.id ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                </div>
              </div>

              {/* Expanded Detail */}
              {expanded === page.id && (
                <div className="border-t px-5 py-4 bg-gray-50 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-start gap-2">
                      <Link size={14} className="text-slate-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-slate-500 text-xs">Slug</p>
                        <p className="text-slate-700 font-medium">{page.slug}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Image size={14} className="text-slate-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-slate-500 text-xs">Banner</p>
                        {page.banner ? (
                          <img src={page.banner} alt="banner" className="h-16 object-contain mt-1 rounded" />
                        ) : (
                          <p className="text-slate-400 text-xs italic">Belum ada banner</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Tag size={14} className="text-slate-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-slate-500 text-xs">Kategori</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(page.categories || []).map((cat) => (
                            <span key={cat} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {pages.length === 0 && (
            <div className="text-center text-slate-400 py-10">Belum ada halaman</div>
          )}
        </div>
      )}

      <p className="text-xs text-slate-400">Total: {pages.length} halaman</p>

      {/* DELETE CONFIRM */}
      <ConfirmDialog
        open={!!deleting}
        title="Hapus Halaman"
        message={`Yakin ingin menghapus halaman "${deleting?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        saving={saving}
        onCancel={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
    </div>
  )
}
