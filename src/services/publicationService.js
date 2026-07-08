import { createLocalRepository } from "../utils/localRepository"

const SEED = [
  { id: 1,  title: "Economic Outlook 2026",         category: "Daily Economic",       author: "Research Team", month: "Januari 2026",  file: "/files/economic-outlook-2026.pdf" },
  { id: 2,  title: "Inflation Trend Analysis",       category: "Daily Economic",       author: "Research Team", month: "Januari 2026",  file: "/files/inflation-trend-analysis.pdf" },
  { id: 3,  title: "Global Market Projection",       category: "Daily Economic",       author: "Research Team", month: "Februari 2026", file: "/files/global-market-projection-feb-2026.pdf" },
  { id: 4,  title: "Banking Industry Report",        category: "Daily Economic",       author: "Research Team", month: "Januari 2026",  file: "/files/banking-industry-report-jan-2026.pdf" },
  { id: 5,  title: "Digital Banking Growth Study",   category: "Daily Economic",       author: "Research Team", month: "Februari 2026", file: "/files/digital-banking-growth-feb-2026.pdf" },
  { id: 6,  title: "Credit Risk Evaluation 2026",    category: "Daily Economic",       author: "Research Team", month: "Februari 2026", file: "/files/credit-risk-evaluation-2026.pdf" },
  { id: 7,  title: "bjb Business Insight Q1 2026",   category: "bjb Business Insight", author: "Insight Team",  month: "Januari 2026",  description: "Analisis bisnis dan strategi pertumbuhan Q1", file: "/files/bjb-business-insight-q1-2026.pdf" },
  { id: 8,  title: "SME Growth Strategy Jawa Barat", category: "bjb Business Insight", author: "Insight Team",  month: "Februari 2026", description: "Strategi pertumbuhan UMKM di wilayah Jawa Barat", file: "/files/sme-growth-strategy-jabar-2026.pdf" },
  { id: 9,  title: "Regional Economic Highlights",   category: "Lainnya",              author: "Research Team", month: "Januari 2026",  description: "Ringkasan ekonomi regional terkini", file: "/files/regional-economic-highlights-jan-2026.pdf" },
  { id: 10, title: "Financial Literacy Report",      category: "Lainnya",              author: "Research Team", month: "Februari 2026", description: "Laporan literasi keuangan masyarakat", file: "/files/financial-literacy-report-feb-2026.pdf" },
  { id: 11, title: "Annual Review 2025",             category: "Lainnya",              author: "Research Team", month: "Januari 2025",  description: "Review tahunan kinerja ekonomi 2025", file: "/files/annual-review-2025.pdf" },
  { id: 12, title: "Regional Economic Highlights",   category: "Lainnya",              author: "Research Team", month: "Februari 2025", description: "Ringkasan ekonomi regional Februari 2025", file: "/files/regional-economic-highlights-feb-2025.pdf" },
  { id: 13, title: "Financial Literacy Report",      category: "Lainnya",              author: "Research Team", month: "Maret 2025",    description: "Laporan literasi keuangan Q1 2025", file: "/files/financial-literacy-report-mar-2025.pdf" },
]

const repo = createLocalRepository("mroe:publikasi", SEED)

export const publicationService = {
  // Saat API Golang siap, ganti isi method dengan pemanggilan apiClient, mis:
  // getAll: () => apiClient.get("/api/publications"),
  // create: (data) => apiClient.post("/api/publications", data),
  // update: (id, data) => apiClient.put(`/api/publications/${id}`, data),
  // remove: (id) => apiClient.delete(`/api/publications/${id}`),
  getAll: repo.getAll,
  getById: repo.getById,
  create: repo.create,
  update: repo.update,
  remove: repo.remove,
  reset: repo.reset,
}
