import { AlertTriangle } from "lucide-react"

export default function ConfirmDialog({ open, title, message, saving, onCancel, onConfirm }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />

      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
            <AlertTriangle className="text-red-500" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">{title || "Konfirmasi"}</h3>
            <p className="text-sm text-slate-500 mt-1">{message}</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-lg bg-gray-100 text-slate-700 hover:bg-gray-200">
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={saving}
            className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-60">
            {saving ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </div>
    </div>
  )
}
