import { useState } from "react"
import { X } from "lucide-react"
import ImageUpload from "./ImageUpload"
import FileUpload from "./FileUpload"

/**
 * FormModal generik yang membangun form dari konfigurasi `fields`.
 * Komponen ini di-remount oleh parent (via `key`) setiap kali dibuka,
 * sehingga state form selalu fresh tanpa perlu useEffect.
 *
 * field: { name, label, type: "text"|"textarea"|"select"|"image", options?, required?, placeholder? }
 */
export default function FormModal({ title, fields, initialValues, saving, onClose, onSubmit }) {
  const [form, setForm] = useState(() => {
    const base = {}
    fields.forEach((f) => {
      base[f.name] = initialValues?.[f.name] ?? ""
    })
    return base
  })
  const [errors, setErrors] = useState({})

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }))
  }

  const validate = () => {
    const next = {}
    fields.forEach((f) => {
      if (f.required && !String(form[f.name] ?? "").trim()) {
        next[f.name] = `${f.label} wajib diisi`
      }
    })
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit(form)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white">
          <h3 className="font-semibold text-slate-800">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                {field.label}
                {field.required && <span className="text-red-500"> *</span>}
              </label>

              {field.type === "image" ? (
                <ImageUpload
                  value={form[field.name] || ""}
                  onChange={(url) => handleChange(field.name, url)}
                />
              ) : field.type === "file" ? (
                <FileUpload
                  value={form[field.name] || ""}
                  onChange={(url) => handleChange(field.name, url)}
                />
              ) : field.type === "select" ? (
                <select
                  value={form[field.name] ?? ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white">
                  <option value="">-- Pilih --</option>
                  {(field.options || []).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  rows={3}
                  value={form[field.name] ?? ""}
                  placeholder={field.placeholder}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              ) : (
                <input
                  type={field.type || "text"}
                  value={form[field.name] ?? ""}
                  placeholder={field.placeholder}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              )}

              {errors[field.name] && (
                <p className="text-xs text-red-500 mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg bg-gray-100 text-slate-700 hover:bg-gray-200">
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60">
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
