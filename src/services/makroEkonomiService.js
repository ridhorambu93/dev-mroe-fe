// import { apiClient } from "../utils/apiClient"

const DUMMY = [
  { id: 1, title: "Makro Brief - Januari 2026",       category: "Makro Brief",   author: "Research Team", month: "Januari 2026",  file: "/files/makro-brief-jan-2026.pdf" },
  { id: 2, title: "Makro Brief - Februari 2026",      category: "Makro Brief",   author: "Research Team", month: "Februari 2026", file: "/files/makro-brief-feb-2026.pdf" },
  { id: 3, title: "Analisis Ekonomi Makro Q1 2026",   category: "Ekonomi Makro", author: "Research Team", month: "Januari 2026",  file: "/files/analisis-ekonomi-makro-q1-2026.pdf" },
  { id: 4, title: "GDP Growth Outlook Indonesia",     category: "Ekonomi Makro", author: "Research Team", month: "Februari 2026", file: "/files/gdp-growth-outlook-indonesia-feb-2026.pdf" },
  { id: 5, title: "Inflasi & Suku Bunga Update",      category: "Ekonomi Makro", author: "Research Team", month: "Maret 2026",    file: "/files/inflasi-suku-bunga-update-mar-2026.pdf" },
]

export const makroEkonomiService = {
  // getAll: () => apiClient.get("/api/makro-ekonomi"),
  getAll: () => Promise.resolve(DUMMY),
}
