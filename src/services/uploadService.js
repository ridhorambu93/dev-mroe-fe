/**
 * uploadService
 * -------------
 * Abstraksi upload file.
 * 
 * Saat ini:
 * - Image: simpan base64 di localStorage (ukuran kecil, bisa preview)
 * - PDF: TIDAK simpan base64 (terlalu besar untuk localStorage)
 *        → generate URL simulasi, file "tersimpan" secara konseptual
 * 
 * Nanti saat Golang API siap, ganti dengan:
 *   const formData = new FormData()
 *   formData.append("file", file)
 *   return apiClient.post("/api/uploads", formData)
 *
 * Return contract: { url: string, id: string, name: string }
 */

const STORAGE_KEY = "mroe:uploads"

function getUploads() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") 
  } catch {
    return {}
  }
}

export const uploadService = {
  upload: (file) => {
    return new Promise((resolve, reject) => {
      if (!file) return reject(new Error("No file provided"))

      const id = `upload_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
      const isImage = file.type.startsWith("image/")

      if (isImage) {
        // Image: simpan base64 untuk preview
        const reader = new FileReader()
        reader.onload = () => {
          const url = reader.result
          const uploads = getUploads()
          uploads[id] = { url, name: file.name, type: file.type, uploadedAt: new Date().toISOString() }
          localStorage.setItem(STORAGE_KEY, JSON.stringify(uploads))
          resolve({ url, id, name: file.name })
        }
        reader.onerror = () => reject(new Error("Failed to read file"))
        reader.readAsDataURL(file)
      } else {
        // PDF/doc: simulasi URL (tidak simpan content ke localStorage)
        const slugName = file.name.replace(/\s+/g, "-").toLowerCase()
        const url = `#preview:${slugName}`
        const uploads = getUploads()
        uploads[id] = { url, name: file.name, type: file.type, uploadedAt: new Date().toISOString() }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(uploads))
        resolve({ url, id, name: file.name })
      }
    })
  },

  remove: (id) => {
    const uploads = getUploads()
    delete uploads[id]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(uploads))
    return Promise.resolve()
  },
}
