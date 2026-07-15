/**
 * uploadService
 * -------------
 * Abstraksi upload file.
 * Semua file (image & PDF) disimpan sebagai base64 di localStorage.
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
    })
  },

  remove: (id) => {
    const uploads = getUploads()
    delete uploads[id]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(uploads))
    return Promise.resolve()
  },
}
