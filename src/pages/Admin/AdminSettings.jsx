import { useState } from "react"
import { publicationService } from "../../services/publicationService"
import { makroEkonomiService } from "../../services/makroEkonomiService"
import { industriService } from "../../services/industriService"
import { regionalService } from "../../services/regionalService"
import { userService } from "../../services/userService"

const SETTINGS_KEY = "mroe:settings"

const loadSettings = () => {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // abaikan
  }
  return { siteName: "BJB MROE", tagline: "Research and Office of Economist bank bjb", itemsPerPage: "10" }
}

const resettableServices = [
  publicationService,
  makroEkonomiService,
  industriService,
  regionalService,
  userService,
]

export default function AdminSettings() {
  const [form, setForm] = useState(loadSettings)
  const [saved, setSaved] = useState(false)
  const [resetDone, setResetDone] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSave = () => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(form))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleResetData = async () => {
    if (!window.confirm("Reset semua data konten & user ke nilai default? Perubahan yang ada akan hilang.")) return
    await Promise.all(resettableServices.map((s) => s.reset()))
    setResetDone(true)
    setTimeout(() => setResetDone(false), 3000)
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Settings</h2>
        <p className="text-slate-500 text-sm mt-1">Pengaturan umum platform MROE.</p>
      </div>

      {/* GENERAL SETTINGS */}
      <div className="bg-white rounded-xl border p-6 space-y-4">
        <h3 className="font-semibold text-slate-800">Umum</h3>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Nama Situs</label>
          <input
            name="siteName"
            value={form.siteName}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Tagline</label>
          <input
            name="tagline"
            value={form.tagline}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Item per Halaman</label>
          <select
            name="itemsPerPage"
            value={form.itemsPerPage}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm bg-white">
            {["10", "25", "50", "100"].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
            Simpan Pengaturan
          </button>
          {saved && <span className="text-sm text-green-600">✓ Pengaturan disimpan</span>}
        </div>
      </div>

      {/* DATA MANAGEMENT */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="font-semibold text-slate-800">Manajemen Data</h3>
        <p className="text-sm text-slate-500 mt-1 mb-4">
          Kembalikan seluruh data konten (Publikasi, Makro Ekonomi, Industri, Regional) dan user ke
          data awal (seed). Berguna untuk demo/pengujian.
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={handleResetData}
            className="px-4 py-2 border border-red-300 text-red-600 text-sm rounded-lg hover:bg-red-50 transition">
            Reset Data ke Default
          </button>
          {resetDone && <span className="text-sm text-green-600">✓ Data direset</span>}
        </div>
      </div>
    </div>
  )
}
