import { useState, useRef } from "react"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import { uploadService } from "../../services/uploadService"

const ACCEPTED = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"]
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

/**
 * ImageUpload
 * -----------
 * Drag & drop / click-to-browse image uploader with preview.
 * Props:
 *   value    - current image URL (for preview)
 *   onChange - callback(url) when image uploaded or cleared
 */
export default function ImageUpload({ value, onChange }) {
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef(null)

  const validate = (file) => {
    if (!ACCEPTED.includes(file.type)) return "Format harus PNG, JPG, WebP, atau SVG"
    if (file.size > MAX_SIZE) return "Ukuran maksimal 5MB"
    return null
  }

  const handleUpload = async (file) => {
    const err = validate(file)
    if (err) { setError(err); return }

    setError("")
    setUploading(true)
    try {
      const { url } = await uploadService.upload(file)
      onChange(url)
    } catch (e) {
      setError(e.message || "Upload gagal")
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleUpload(file)
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) handleUpload(file)
    e.target.value = ""
  }

  const handleClear = () => {
    onChange("")
    setError("")
  }

  // Preview mode
  if (value) {
    return (
      <div className="relative group">
        <img
          src={value}
          alt="Preview"
          className="w-full h-40 object-contain border rounded-lg bg-gray-50"
        />
        <button
          type="button"
          onClick={handleClear}
          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition">
          <X size={14} />
        </button>
      </div>
    )
  }

  // Upload zone
  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
          dragging ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
        }`}>
        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Mengupload...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <Upload size={24} />
            <span className="text-sm">Drag & drop atau klik untuk upload</span>
            <span className="text-xs">PNG, JPG, WebP, SVG (maks 5MB)</span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
