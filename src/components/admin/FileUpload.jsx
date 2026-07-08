import { useState, useRef } from "react"
import { Upload, X, FileText } from "lucide-react"
import { uploadService } from "../../services/uploadService"

const ACCEPTED = ["application/pdf"]
const MAX_SIZE = 20 * 1024 * 1024 // 20MB

export default function FileUpload({ value, onChange }) {
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [fileName, setFileName] = useState("")
  const inputRef = useRef(null)

  const validate = (file) => {
    if (!ACCEPTED.includes(file.type)) return "Format harus PDF"
    if (file.size > MAX_SIZE) return "Ukuran maksimal 20MB"
    return null
  }

  const handleUpload = async (file) => {
    const err = validate(file)
    if (err) { setError(err); return }

    setError("")
    setUploading(true)
    try {
      const { url, name } = await uploadService.upload(file)
      setFileName(name)
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
    setFileName("")
    setError("")
  }

  if (value) {
    return (
      <div className="flex items-center gap-3 border rounded-lg px-4 py-3 bg-gray-50">
        <FileText size={20} className="text-red-500 shrink-0" />
        <span className="text-sm text-slate-700 flex-1 truncate">{fileName || "File uploaded"}</span>
        <button
          type="button"
          onClick={handleClear}
          className="p-1 text-red-500 hover:bg-red-50 rounded">
          <X size={16} />
        </button>
      </div>
    )
  }

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
            <span className="text-sm">Drag & drop atau klik untuk upload PDF</span>
            <span className="text-xs">PDF (maks 20MB)</span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
