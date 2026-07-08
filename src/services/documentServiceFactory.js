import { createLocalRepository } from "../utils/localRepository"

/**
 * documentServiceFactory
 * ----------------------
 * Buat service CRUD untuk halaman apa pun berdasarkan slug.
 * Setiap slug punya localStorage key sendiri: "mroe:docs:{slug}"
 * 
 * Nanti saat API siap, ganti dengan:
 *   getAll: () => apiClient.get(`/api/documents?page=${slug}`)
 *   create: (data) => apiClient.post(`/api/documents`, { ...data, page: slug })
 *   dll.
 */
const cache = {}

export function getDocumentService(slug) {
  if (!cache[slug]) {
    const key = `mroe:docs:${slug}`
    const repo = createLocalRepository(key, [])
    cache[slug] = {
      getAll: repo.getAll,
      getById: repo.getById,
      create: repo.create,
      update: repo.update,
      remove: repo.remove,
      reset: repo.reset,
    }
  }
  return cache[slug]
}
