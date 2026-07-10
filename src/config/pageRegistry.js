/**
 * pageRegistry.js
 * ---------------
 * Daftar statis semua halaman konten beserta service dan metadata-nya.
 * Dipakai oleh AdminPublikasi untuk menampilkan daftar halaman & CRUD dokumen.
 *
 * Untuk menambah halaman baru:
 * 1. Buat service file baru di src/services/
 * 2. Tambahkan entry baru di PAGES array di bawah
 * 3. Buat page component baru di src/pages/
 * 4. Tambahkan route di AppRoutes.jsx
 */

import { publicationService } from "../services/publicationService"
import { makroEkonomiService } from "../services/makroEkonomiService"
import { industriService } from "../services/industriService"
import { regionalService } from "../services/regionalService"
import { dailyMarketService } from "../services/dailyMarketService"
import { outlookForumService } from "../services/outlookForumService"
import { marketIntelligenceService } from "../services/marketIntelligenceService"

export const PAGES = [
  {
    key: "publikasi",
    name: "Publikasi",
    path: "/publikasi",
    layout: "default",
    categories: ["Daily Economic", "bjb Business Insight", "Lainnya"],
    service: publicationService,
  },
  {
    key: "makroekonomi",
    name: "Makro Ekonomi",
    path: "/makroekonomi",
    layout: "default",
    categories: ["Makro Brief", "Ekonomi Makro"],
    service: makroEkonomiService,
  },
  {
    key: "industry",
    name: "Industri",
    path: "/industry",
    layout: "default",
    categories: ["Positioning", "Market Share", "Rasio Industri", "Kajian NPL"],
    service: industriService,
  },
  {
    key: "regional",
    name: "Regional",
    path: "/regional",
    layout: "regional",
    categories: ["Mapping Ekonomi", "Pemetaan Sektoral Ekonomi & Kredit Perbankan"],
    service: regionalService,
  },
  {
    key: "daily-market-dashboard",
    name: "Daily Market Dashboard",
    path: "/daily-market-dashboard",
    layout: "default",
    categories: ["Daily Market"],
    service: dailyMarketService,
  },
  {
    key: "outlook-forum",
    name: "Outlook Economic Forum",
    path: "/outlook-economic-forum",
    layout: "forum",
    categories: ["Pembicara 1", "Pembicara 2", "Pembicara 3"],
    service: outlookForumService,
  },
  {
    key: "market-intelligence",
    name: "Market Intelligence",
    path: "/market-intelligence",
    layout: "default",
    categories: ["Market Intelligence"],
    service: marketIntelligenceService,
  },
]

/**
 * Hook/helper untuk AdminPublikasi.
 * Return daftar pages dan fungsi getService(key).
 */
export function getServiceForPage() {
  const pages = PAGES
  const getService = (key) => {
    const found = PAGES.find((p) => p.key === key)
    return found?.service ?? null
  }
  return { pages, getService }
}
