import { useState } from "react"
import { useAuth } from "../store/AuthContext"
import { applyWatermark } from "../utils/watermarkPdf"

export function useWatermarkDownload() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const download = async (fileUrl, filename = "document.pdf") => {
    // Skip watermark untuk file SEED (bukan actual base64)
    if (!fileUrl || !fileUrl.startsWith("data:")) {
      window.open(fileUrl, "_blank")
      return
    }

    setLoading(true)
    try {
      const res = await fetch(fileUrl)
      const pdfBytes = await res.arrayBuffer()

      // Cek apakah benar PDF (magic bytes: %PDF)
      const header = new Uint8Array(pdfBytes.slice(0, 5))
      const isPdf = String.fromCharCode(...header).startsWith("%PDF")

      if (!isPdf) {
        // Bukan PDF, langsung download tanpa watermark
        const blob = new Blob([pdfBytes])
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = filename
        a.click()
        URL.revokeObjectURL(url)
        return
      }

      const blob = await applyWatermark(pdfBytes, {
        name: user?.fullName || user?.username || "USER",
        divisi: user?.divisi || "BJB",
      })

      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error("Watermark failed:", err)
      window.open(fileUrl, "_blank")
    } finally {
      setLoading(false)
    }
  }

  return { download, loading }
}
