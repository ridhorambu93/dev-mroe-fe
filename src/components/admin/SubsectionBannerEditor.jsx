import { useState, useCallback } from "react"
import { Image, Film, Images, Trash2 } from "lucide-react"
import ImageUpload from "./ImageUpload"

const BANNER_TYPES = [
  { key: "image", label: "Image Banner", icon: Image },
  { key: "slider", label: "Image Slider", icon: Images },
  { key: "video", label: "Video", icon: Film },
]

export default function SubsectionBannerEditor({ subsection, bannerData, onSave }) {
  const [type, setType] = useState(bannerData?.type || "image")
  const [files, setFiles] = useState(bannerData?.files || [])
  const [videoUrl, setVideoUrl] = useState(bannerData?.videoUrl || "")

  const save = useCallback((newType, newFiles, newVideoUrl) => {
    onSave(subsection, { type: newType, files: newFiles, videoUrl: newVideoUrl })
  }, [subsection, onSave])

  const handleTypeChange = (newType) => {
    setType(newType)
    if (newType === "video") {
      setFiles([])
      save(newType, [], videoUrl)
    } else {
      setVideoUrl("")
      save(newType, files, "")
    }
  }

  const handleImageAdd = (url) => {
    const newFiles = type === "image" ? [url] : [...files, url]
    setFiles(newFiles)
    save(type, newFiles, "")
  }

  const handleImageRemove = (idx) => {
    const newFiles = files.filter((_, i) => i !== idx)
    setFiles(newFiles)
    save(type, newFiles, "")
  }

  const handleVideoSave = () => {
    save("video", [], videoUrl)
  }

  return (
    <div className="border rounded-lg p-4 bg-gray-50 space-y-3">
      <h4 className="text-sm font-medium text-slate-700">{subsection}</h4>

      {/* Type selector */}
      <div className="flex gap-2">
        {BANNER_TYPES.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => handleTypeChange(key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md transition ${
              type === key ? "bg-slate-800 text-white" : "bg-white border text-slate-600 hover:bg-gray-100"
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Upload area */}
      {type === "video" ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/embed/..."
            className="flex-1 border rounded-md px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={handleVideoSave}
            className="px-3 py-2 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Simpan
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {files.map((file, idx) => (
                <div key={idx} className="relative group">
                  <img src={file} alt={`banner-${idx}`} className="w-24 h-16 object-cover rounded border" />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(idx)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
          {(type === "slider" || files.length === 0) && (
            <ImageUpload value="" onChange={handleImageAdd} />
          )}
        </div>
      )}
    </div>
  )
}
