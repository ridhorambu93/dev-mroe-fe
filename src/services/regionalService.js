import { createLocalRepository } from "../utils/localRepository"

const SECTORAL = "Pemetaan Sektoral Ekonomi & Kredit Perbankan"

const SEED = [
  // Mapping Ekonomi - hanya Triwulan IV per tahun
  { id: 1,  title: "Mapping Ekonomi Jawa Barat",         description: "Analisis kondisi ekonomi regional Jawa Barat",       category: "Mapping Ekonomi", author: "Research Team", publishDate: "15 Desember 2026", quarter: "Triwulan IV", year: "2026", file: "/files/mapping-ekonomi-jabar-tw4-2026.pdf" },
  { id: 2,  title: "Mapping Ekonomi Jawa Tengah",        description: "Analisis kondisi ekonomi regional Jawa Tengah",      category: "Mapping Ekonomi", author: "Research Team", publishDate: "15 Desember 2026", quarter: "Triwulan IV", year: "2026", file: "/files/mapping-ekonomi-jateng-tw4-2026.pdf" },
  { id: 3,  title: "Mapping Ekonomi Jawa Timur",         description: "Analisis kondisi ekonomi regional Jawa Timur",       category: "Mapping Ekonomi", author: "Research Team", publishDate: "15 Desember 2026", quarter: "Triwulan IV", year: "2026", file: "/files/mapping-ekonomi-jatim-tw4-2026.pdf" },
  { id: 4,  title: "Mapping Ekonomi DKI Jakarta",        description: "Analisis kondisi ekonomi regional DKI Jakarta",      category: "Mapping Ekonomi", author: "Research Team", publishDate: "15 Desember 2026", quarter: "Triwulan IV", year: "2026", file: "/files/mapping-ekonomi-dki-tw4-2026.pdf" },
  { id: 5,  title: "Mapping Ekonomi Banten",             description: "Analisis kondisi ekonomi regional Banten",           category: "Mapping Ekonomi", author: "Research Team", publishDate: "15 Desember 2026", quarter: "Triwulan IV", year: "2026", file: "/files/mapping-ekonomi-banten-tw4-2026.pdf" },
  { id: 6,  title: "Mapping Ekonomi Jawa Barat",         description: "Analisis kondisi ekonomi regional Jawa Barat",       category: "Mapping Ekonomi", author: "Research Team", publishDate: "20 Desember 2025", quarter: "Triwulan IV", year: "2025", file: "/files/mapping-ekonomi-jabar-tw4-2025.pdf" },
  { id: 7,  title: "Mapping Ekonomi Jawa Tengah",        description: "Analisis kondisi ekonomi regional Jawa Tengah",      category: "Mapping Ekonomi", author: "Research Team", publishDate: "20 Desember 2025", quarter: "Triwulan IV", year: "2025", file: "/files/mapping-ekonomi-jateng-tw4-2025.pdf" },
  { id: 8,  title: "Mapping Ekonomi Sulawesi Selatan",   description: "Analisis kondisi ekonomi regional Sulawesi Selatan", category: "Mapping Ekonomi", author: "Research Team", publishDate: "20 Desember 2025", quarter: "Triwulan IV", year: "2025", file: "/files/mapping-ekonomi-sulsel-tw4-2025.pdf" },
  { id: 9,  title: "Mapping Ekonomi Kalimantan Barat",   description: "Analisis kondisi ekonomi regional Kalimantan Barat", category: "Mapping Ekonomi", author: "Research Team", publishDate: "20 Desember 2025", quarter: "Triwulan IV", year: "2025", file: "/files/mapping-ekonomi-kalbar-tw4-2025.pdf" },
  { id: 10, title: "Mapping Ekonomi Jawa Barat",         description: "Analisis kondisi ekonomi regional Jawa Barat",       category: "Mapping Ekonomi", author: "Research Team", publishDate: "18 Desember 2024", quarter: "Triwulan IV", year: "2024", file: "/files/mapping-ekonomi-jabar-tw4-2024.pdf" },
  { id: 11, title: "Mapping Ekonomi Jawa Timur",         description: "Analisis kondisi ekonomi regional Jawa Timur",       category: "Mapping Ekonomi", author: "Research Team", publishDate: "18 Desember 2024", quarter: "Triwulan IV", year: "2024", file: "/files/mapping-ekonomi-jatim-tw4-2024.pdf" },
  { id: 12, title: "Mapping Ekonomi Bali",               description: "Analisis kondisi ekonomi regional Bali",             category: "Mapping Ekonomi", author: "Research Team", publishDate: "18 Desember 2024", quarter: "Triwulan IV", year: "2024", file: "/files/mapping-ekonomi-bali-tw4-2024.pdf" },
  { id: 13, title: "Mapping Ekonomi Sumatera Utara",     description: "Analisis kondisi ekonomi regional Sumatera Utara",   category: "Mapping Ekonomi", author: "Research Team", publishDate: "18 Desember 2024", quarter: "Triwulan IV", year: "2024", file: "/files/mapping-ekonomi-sumut-tw4-2024.pdf" },

  // Pemetaan Sektoral - Triwulan I s/d IV per tahun
  { id: 14, title: "Pemetaan Sektoral Sektor Pertanian",   description: "Analisis kredit dan ekonomi sektor pertanian",   category: SECTORAL, author: "Research Team", publishDate: "10 Maret 2026",     quarter: "Triwulan I",   year: "2026", file: "/files/pemetaan-sektoral-pertanian-tw1-2026.pdf" },
  { id: 15, title: "Pemetaan Sektoral Sektor Manufaktur",  description: "Analisis kredit dan ekonomi sektor manufaktur",  category: SECTORAL, author: "Research Team", publishDate: "10 Maret 2026",     quarter: "Triwulan I",   year: "2026", file: "/files/pemetaan-sektoral-manufaktur-tw1-2026.pdf" },
  { id: 16, title: "Pemetaan Sektoral Kredit UMKM",        description: "Analisis perkembangan kredit segmen UMKM",       category: SECTORAL, author: "Research Team", publishDate: "10 Maret 2026",     quarter: "Triwulan I",   year: "2026", file: "/files/pemetaan-sektoral-kredit-umkm-tw1-2026.pdf" },
  { id: 17, title: "Pemetaan Sektoral Sektor Perdagangan", description: "Analisis kredit dan ekonomi sektor perdagangan", category: SECTORAL, author: "Research Team", publishDate: "10 Maret 2026",     quarter: "Triwulan I",   year: "2026", file: "/files/pemetaan-sektoral-perdagangan-tw1-2026.pdf" },
  { id: 18, title: "Pemetaan Sektoral Kredit Konsumer",    description: "Analisis perkembangan kredit konsumer",          category: SECTORAL, author: "Research Team", publishDate: "10 Maret 2026",     quarter: "Triwulan I",   year: "2026", file: "/files/pemetaan-sektoral-kredit-konsumer-tw1-2026.pdf" },
  { id: 19, title: "Pemetaan Sektoral Sektor Konstruksi",  description: "Analisis kredit dan ekonomi sektor konstruksi",  category: SECTORAL, author: "Research Team", publishDate: "12 Juni 2026",      quarter: "Triwulan II",  year: "2026", file: "/files/pemetaan-sektoral-konstruksi-tw2-2026.pdf" },
  { id: 20, title: "Pemetaan Sektoral Sektor Pariwisata",  description: "Analisis kredit dan ekonomi sektor pariwisata",  category: SECTORAL, author: "Research Team", publishDate: "12 Juni 2026",      quarter: "Triwulan II",  year: "2026", file: "/files/pemetaan-sektoral-pariwisata-tw2-2026.pdf" },
  { id: 21, title: "Pemetaan Sektoral Kredit Korporasi",   description: "Analisis perkembangan kredit korporasi",         category: SECTORAL, author: "Research Team", publishDate: "12 Juni 2026",      quarter: "Triwulan II",  year: "2026", file: "/files/pemetaan-sektoral-kredit-korporasi-tw2-2026.pdf" },
  { id: 22, title: "Pemetaan Sektoral Sektor Energi",      description: "Analisis kredit dan ekonomi sektor energi",      category: SECTORAL, author: "Research Team", publishDate: "12 Juni 2026",      quarter: "Triwulan II",  year: "2026", file: "/files/pemetaan-sektoral-energi-tw2-2026.pdf" },
  { id: 23, title: "Pemetaan Sektoral Sektor Pertanian",   description: "Analisis kredit dan ekonomi sektor pertanian",   category: SECTORAL, author: "Research Team", publishDate: "15 September 2026", quarter: "Triwulan III", year: "2026", file: "/files/pemetaan-sektoral-pertanian-tw3-2026.pdf" },
  { id: 24, title: "Pemetaan Sektoral Sektor Teknologi",   description: "Analisis kredit dan ekonomi sektor teknologi",   category: SECTORAL, author: "Research Team", publishDate: "15 September 2026", quarter: "Triwulan III", year: "2026", file: "/files/pemetaan-sektoral-teknologi-tw3-2026.pdf" },
  { id: 25, title: "Pemetaan Sektoral Sektor Transportasi",description: "Analisis kredit dan ekonomi sektor transportasi",category: SECTORAL, author: "Research Team", publishDate: "15 September 2026", quarter: "Triwulan III", year: "2026", file: "/files/pemetaan-sektoral-transportasi-tw3-2026.pdf" },
  { id: 26, title: "Pemetaan Sektoral Kredit UMKM",        description: "Analisis perkembangan kredit segmen UMKM",       category: SECTORAL, author: "Research Team", publishDate: "15 September 2026", quarter: "Triwulan III", year: "2026", file: "/files/pemetaan-sektoral-kredit-umkm-tw3-2026.pdf" },
  { id: 27, title: "Pemetaan Sektoral Sektor Kesehatan",   description: "Analisis kredit dan ekonomi sektor kesehatan",   category: SECTORAL, author: "Research Team", publishDate: "15 September 2026", quarter: "Triwulan III", year: "2026", file: "/files/pemetaan-sektoral-kesehatan-tw3-2026.pdf" },
  { id: 28, title: "Pemetaan Sektoral Sektor Manufaktur",  description: "Analisis kredit dan ekonomi sektor manufaktur",  category: SECTORAL, author: "Research Team", publishDate: "10 Desember 2026",  quarter: "Triwulan IV",  year: "2026", file: "/files/pemetaan-sektoral-manufaktur-tw4-2026.pdf" },
  { id: 29, title: "Pemetaan Sektoral Sektor Perdagangan", description: "Analisis kredit dan ekonomi sektor perdagangan", category: SECTORAL, author: "Research Team", publishDate: "10 Desember 2026",  quarter: "Triwulan IV",  year: "2026", file: "/files/pemetaan-sektoral-perdagangan-tw4-2026.pdf" },
  { id: 30, title: "Pemetaan Sektoral Kredit Korporasi",   description: "Analisis perkembangan kredit korporasi",         category: SECTORAL, author: "Research Team", publishDate: "10 Desember 2026",  quarter: "Triwulan IV",  year: "2026", file: "/files/pemetaan-sektoral-kredit-korporasi-tw4-2026.pdf" },
  { id: 31, title: "Pemetaan Sektoral Sektor Energi",      description: "Analisis kredit dan ekonomi sektor energi",      category: SECTORAL, author: "Research Team", publishDate: "10 Desember 2026",  quarter: "Triwulan IV",  year: "2026", file: "/files/pemetaan-sektoral-energi-tw4-2026.pdf" },
  { id: 32, title: "Pemetaan Sektoral Sektor Kesehatan",   description: "Analisis kredit dan ekonomi sektor kesehatan",   category: SECTORAL, author: "Research Team", publishDate: "10 Desember 2026",  quarter: "Triwulan IV",  year: "2026", file: "/files/pemetaan-sektoral-kesehatan-tw4-2026.pdf" },
]

const repo = createLocalRepository("mroe:regional", SEED)

export const regionalService = {
  // getAll: () => apiClient.get("/api/regional"),
  getAll: repo.getAll,
  getById: repo.getById,
  create: repo.create,
  update: repo.update,
  remove: repo.remove,
  reset: repo.reset,
}
