import { createLocalRepository } from "../utils/localRepository"

const SEED = [
  { id: 1, title: "Positioning Bank bjb di Industri Perbankan", category: "Positioning",    author: "Research Team", publishDate: "2026-01-10", file: "/files/positioning-bjb-industri-jan-2026.pdf" },
  { id: 2, title: "Positioning Kredit Konsumer Q1 2026",        category: "Positioning",    author: "Research Team", publishDate: "2026-02-15", file: "/files/positioning-kredit-konsumer-q1-2026.pdf" },
  { id: 3, title: "Market Share DPK Bank bjb 2026",             category: "Market Share",   author: "Research Team", publishDate: "2026-01-12", file: "/files/market-share-dpk-bjb-2026.pdf" },
  { id: 4, title: "Market Share Kredit Segmen UMKM",            category: "Market Share",   author: "Research Team", publishDate: "2026-02-18", file: "/files/market-share-kredit-umkm-feb-2026.pdf" },
  { id: 5, title: "Rasio Industri Perbankan Nasional",          category: "Rasio Industri", author: "Research Team", publishDate: "2026-03-10", file: "/files/rasio-industri-perbankan-jan-2026.pdf" },
  { id: 6, title: "CAR & LDR Perbankan Q1 2026",                category: "Rasio Industri", author: "Research Team", publishDate: "2026-04-15", file: "/files/car-ldr-perbankan-q1-2026.pdf" },
  { id: 7, title: "Kajian NPL Sektor Konstruksi",               category: "Kajian NPL",     author: "Research Team", publishDate: "2026-02-20", file: "/files/kajian-npl-konstruksi-jan-2026.pdf" },
  { id: 8, title: "Kajian NPL Sektor Perdagangan",              category: "Kajian NPL",     author: "Research Team", publishDate: "2026-05-10", file: "/files/kajian-npl-perdagangan-feb-2026.pdf" },
  { id: 9, title: "Tren NPL Kredit Konsumer 2026",              category: "Kajian NPL",     author: "Research Team", publishDate: "2026-08-12", file: "/files/tren-npl-kredit-konsumer-mar-2026.pdf" },
]

const repo = createLocalRepository("mroe:industri", SEED)

export const industriService = {
  getAll: repo.getAll,
  getById: repo.getById,
  create: repo.create,
  update: repo.update,
  remove: repo.remove,
  reset: repo.reset,
}
