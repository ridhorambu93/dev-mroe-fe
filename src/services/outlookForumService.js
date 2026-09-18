import { createLocalRepository } from "../utils/localRepository"
// import { apiClient } from "../utils/apiClient"

// ==============================
// SEED — hapus/comment saat BE siap
// ==============================
const SEED = [
  // EVENT AKTIF — end date masa depan
  {
    id: 1,
    title: "Materi Sesi 1 - Ekonomi Makro",
    period_value: "OEF 2026",
    period_year: 2026,
    event_start_date: "2026-07-01",
    event_end_date: "2099-12-31",
    authors: ["Teguh"],
    description: "Deskripsi materi sesi pertama",
  },
  {
    id: 2,
    title: "Materi Sesi 2 - Perbankan",
    period_value: "OEF 2026",
    period_year: 2026,
    event_start_date: "2026-07-01",
    event_end_date: "2099-12-31",
    authors: ["Budi"],
    description: "Deskripsi materi sesi kedua",
  },
  {
    id: 3,
    title: "Materi Sesi 3 - Industri",
    period_value: "OEF 2026 Sesi 2",
    period_year: 2026,
    event_start_date: "2026-07-10",
    event_end_date: "2099-12-31",
    authors: ["Rina"],
    description: "Deskripsi materi sesi ketiga",
  },
  // EVENT ARSIP — end date sudah lewat
  {
    id: 4,
    title: "Materi Sesi 1 - Ekonomi Regional",
    period_value: "OEF 2025",
    period_year: 2025,
    event_start_date: "2025-04-05",
    event_end_date: "2025-04-06",
    authors: ["Rina"],
    description: "Deskripsi materi OEF 2025",
  },
  {
    id: 5,
    title: "Materi Sesi 2 - Kredit",
    period_value: "OEF 2025",
    period_year: 2025,
    event_start_date: "2025-04-05",
    event_end_date: "2025-04-06",
    authors: ["Dani"],
    description: "Deskripsi materi kredit 2025",
  },
  {
    id: 6,
    title: "Materi Sesi 1 - Outlook Tahunan",
    period_value: "OEF 2024",
    period_year: 2024,
    event_start_date: "2024-03-10",
    event_end_date: "2024-03-11",
    authors: ["Sari"],
    description: "Deskripsi materi OEF 2024",
  },
]

const repo = createLocalRepository("mroe:outlook-forum", SEED)

// ==============================
// MODE: localStorage (sementara)
// Saat BE siap: comment blok ini, uncomment blok BE di bawah
// ==============================
export const outlookForumService = {
  getAll: repo.getAll,
  create: repo.create,
  update: repo.update,
  remove: repo.remove,
}

// ==============================
// MODE: BE (aktifkan saat BE siap)
// ==============================
// const BASE = import.meta.env.VITE_API_BASE_URL || ""
//
// const mapItem = (item) => ({
//   ...item,
//   file: item.file_name ? `${BASE}/api/files/${item.file_name}/watermarked` : null,
// })
//
// const toFormData = async (data) => {
//   const fd = new FormData()
//   fd.append("title", data.title || "")
//   fd.append("description", data.description || "")
//   fd.append("period_type", "By Event")
//   fd.append("period_value", data.period_value || "")
//   fd.append("event_start_date", data.startDate || "")
//   fd.append("event_end_date", data.endDate || "")
//   ;(data.authors || []).forEach((a) => fd.append("authors", a))
//   ;(data.composing_units || []).forEach((u) => fd.append("composing_units", u))
//   if (data.file && data.file.startsWith("blob:")) {
//     const blob = await fetch(data.file).then((r) => r.blob())
//     fd.append("file", blob, "upload.pdf")
//   }
//   return fd
// }
//
// export const outlookForumService = {
//   getAll: () =>
//     apiClient
//       .get("/api/outlook-economic-forum?page_size=100")
//       .then((res) => (res.data?.publications || []).map(mapItem)),
//   create: async (data) => {
//     const fd = await toFormData(data)
//     return apiClient.postForm("/api/outlook-economic-forum", fd)
//   },
//   update: async (id, data) => {
//     const fd = await toFormData(data)
//     return apiClient.putForm(`/api/outlook-economic-forum/${id}`, fd)
//   },
//   remove: (id) => apiClient.delete(`/api/outlook-economic-forum/${id}`),
// }
