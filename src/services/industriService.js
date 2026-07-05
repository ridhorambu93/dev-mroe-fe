// import { apiClient } from "../utils/apiClient"

const DUMMY = [
  { id: 1, title: "Positioning Bank bjb di Industri Perbankan", category: "Positioning",    author: "Research Team", month: "Januari 2026",  file: "/files/positioning-bjb-industri-jan-2026.pdf" },
  { id: 2, title: "Positioning Kredit Konsumer Q1 2026",        category: "Positioning",    author: "Research Team", month: "Februari 2026", file: "/files/positioning-kredit-konsumer-q1-2026.pdf" },
  { id: 3, title: "Market Share DPK Bank bjb 2026",             category: "Market Share",   author: "Research Team", month: "Januari 2026",  file: "/files/market-share-dpk-bjb-2026.pdf" },
  { id: 4, title: "Market Share Kredit Segmen UMKM",            category: "Market Share",   author: "Research Team", month: "Februari 2026", file: "/files/market-share-kredit-umkm-feb-2026.pdf" },
  { id: 5, title: "Rasio Industri Perbankan Nasional",          category: "Rasio Industri", author: "Research Team", month: "Januari 2026",  file: "/files/rasio-industri-perbankan-jan-2026.pdf" },
  { id: 6, title: "CAR & LDR Perbankan Q1 2026",               category: "Rasio Industri", author: "Research Team", month: "Februari 2026", file: "/files/car-ldr-perbankan-q1-2026.pdf" },
  { id: 7, title: "Kajian NPL Sektor Konstruksi",               category: "Kajian NPL",     author: "Research Team", month: "Januari 2026",  file: "/files/kajian-npl-konstruksi-jan-2026.pdf" },
  { id: 8, title: "Kajian NPL Sektor Perdagangan",              category: "Kajian NPL",     author: "Research Team", month: "Februari 2026", file: "/files/kajian-npl-perdagangan-feb-2026.pdf" },
  { id: 9, title: "Tren NPL Kredit Konsumer 2026",              category: "Kajian NPL",     author: "Research Team", month: "Maret 2026",    file: "/files/tren-npl-kredit-konsumer-mar-2026.pdf" },
]

export const industriService = {
  // getAll: () => apiClient.get("/api/industri"),
  getAll: () => Promise.resolve(DUMMY),
}
