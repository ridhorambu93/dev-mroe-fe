import { useState, useEffect } from "react"
import { Save, RotateCcw } from "lucide-react"
import { homeConfigService } from "../../services/homeConfigService"
import ImageUpload from "./ImageUpload"

export default function HomeConfigEditor() {
  const [form, setForm] = useState({ welcomeText: "", indicatorTitle: "", indicatorImage: "" })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    homeConfigService.getConfig().then((cfg) => {
      setForm({
        welcomeText: cfg.welcomeText || "",
        indicatorTitle: cfg.indicatorTitle || "",
        indicatorImage: cfg.indicatorImage || "",
      })
      setLoading(false)
    })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    await homeConfigService.update(form)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleReset = async () => {
    await homeConfigService.reset()
    const cfg = await homeConfigService.getConfig()
    setForm({
      welcomeText: cfg.welcomeText || "",
      indicatorTitle: cfg.indicatorTitle || "",
      indicatorImage: cfg.indicatorImage || "",
    })
  }

  if (loading) return <div className="text-slate-400 py-10 text-center">Memuat...</div>

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Pengaturan Beranda</h2>
        <p className="text-slate-500 text-sm mt-1">Kelola konten yang tampil di halaman Beranda user.</p>
      </div>

      <div className="bg-white border rounded-xl p-5 space-y-5">
        {/* Welcome Text */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Teks Sambutan</label>
          <textarea
            rows={3}
            value={form.welcomeText}
            onChange={(e) => setForm({ ...form, welcomeText: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        {/* Indicator Title */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Judul Section Indikator</label>
          <input
            type="text"
            value={form.indicatorTitle}
            onChange={(e) => setForm({ ...form, indicatorTitle: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        {/* Indicator Image */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Gambar Indikator</label>
          <ImageUpload
            value={form.indicatorImage}
            onChange={(url) => setForm({ ...form, indicatorImage: url })}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-60">
            <Save size={16} />
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-slate-700 text-sm rounded-lg hover:bg-gray-200">
            <RotateCcw size={16} />
            Reset Default
          </button>
          {saved && <span className="text-sm text-green-600">✓ Tersimpan</span>}
        </div>
      </div>
    </div>
  )
}
