import { createLocalRepository } from "../utils/localRepository"

const SEED = [
  { id: 1, title: "Makro Brief - Januari 2026",     category: "Macro brief",   author: "Research Team", quarter: "Triwulan I", year: "2026", file: "/files/makro-brief-jan-2026.pdf" },
  { id: 2, title: "Makro Brief - Februari 2026",    category: "Macro brief",   author: "Research Team", quarter: "Triwulan I", year: "2026", file: "/files/makro-brief-feb-2026.pdf" },
  { id: 3, title: "Analisis Ekonomi Makro Q1 2026", category: "Ekonomi Makro", author: "Research Team", quarter: "Triwulan I", year: "2026", file: "/files/analisis-ekonomi-makro-q1-2026.pdf" },
  { id: 4, title: "GDP Growth Outlook Indonesia",   category: "Ekonomi Makro", author: "Research Team", quarter: "Triwulan I", year: "2026", file: "/files/gdp-growth-outlook-indonesia-feb-2026.pdf" },
  { id: 5, title: "Inflasi & Suku Bunga Update",    category: "Ekonomi Makro", author: "Research Team", quarter: "Triwulan II", year: "2026", file: "/files/inflasi-suku-bunga-update-mar-2026.pdf" },
]

const repo = createLocalRepository("mroe:makro-ekonomi", SEED)

export const makroEkonomiService = {
  // getAll: () => apiClient.get("/api/makro-ekonomi"),
  getAll: repo.getAll,
  getById: repo.getById,
  create: repo.create,
  update: repo.update,
  remove: repo.remove,
  reset: repo.reset,
}
