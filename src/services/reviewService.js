import { createLocalRepository } from "../utils/localRepository"

// Saat BE siap, ganti dengan:
// getAll: () => apiClient.get("/api/admin/dashboard/recent-feedback?limit=100").then(r => r.data),
// hide: (id, isHidden) => apiClient.put(`/api/reviews/${id}/hide`, { is_hidden: isHidden }).then(r => r.data),
// remove: (id) => apiClient.delete(`/api/reviews/${id}`),

const SEED = [
  { id: 1, publication_title: "Economic Outlook 2026", rating: 5, comment: "Sangat informatif dan mudah dipahami!", is_hidden: false, created_by: "budi.santoso", created_at: "2026-09-10T08:30:00Z" },
  { id: 2, publication_title: "Economic Outlook 2026", rating: 4, comment: "Bagus, tapi perlu lebih banyak data historis.", is_hidden: false, created_by: "sari.dewi", created_at: "2026-09-11T10:15:00Z" },
  { id: 3, publication_title: "Inflation Trend Analysis", rating: 3, comment: "Cukup membantu, mohon ditambah grafik perbandingan.", is_hidden: false, created_by: "ahmad.ridwan", created_at: "2026-09-12T14:00:00Z" },
  { id: 4, publication_title: "Global Market Projection", rating: 5, comment: "Analisis mendalam dan sangat relevan.", is_hidden: false, created_by: "dewi.lestari", created_at: "2026-09-13T09:45:00Z" },
  { id: 5, publication_title: "Inflation Trend Analysis", rating: 2, comment: "Kurang detail untuk sektor perbankan.", is_hidden: true, created_by: "rizky.pratama", created_at: "2026-09-14T11:20:00Z" },
  { id: 6, publication_title: "Banking Industry Report", rating: 4, comment: "Data lengkap dan mudah dipahami.", is_hidden: false, created_by: "andi.wijaya", created_at: "2026-09-15T13:30:00Z" },
  { id: 7, publication_title: "Digital Banking Growth Study", rating: 5, comment: "Sangat relevan dengan kondisi saat ini.", is_hidden: false, created_by: "nina.kusuma", created_at: "2026-09-16T07:00:00Z" },
]

const repo = createLocalRepository("mroe:reviews", SEED)

export const reviewService = {
  getAll: repo.getAll,
  update: (id, payload) => repo.update(id, payload),
  remove: repo.remove,
  reset: repo.reset,
}
