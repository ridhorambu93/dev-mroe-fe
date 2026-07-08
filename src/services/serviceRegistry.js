import { publicationService } from "./publicationService"
import { makroEkonomiService } from "./makroEkonomiService"
import { industriService } from "./industriService"
import { regionalService } from "./regionalService"
import { dailyMarketService } from "./dailyMarketService"
import { getDocumentService } from "./documentServiceFactory"

/**
 * serviceRegistry
 * ---------------
 * Map slug halaman → document service.
 * Halaman yang sudah punya service khusus (dengan seed data) didaftarkan di sini.
 * Halaman baru yang dibuat admin otomatis pakai generic service dari factory.
 */
const registeredServices = {
  "/publikasi": publicationService,
  "/makroekonomi": makroEkonomiService,
  "/industry": industriService,
  "/regional": regionalService,
  "/daily-market-dashboard": dailyMarketService,
}

/**
 * Get service untuk slug tertentu.
 * Kalau sudah terdaftar → pakai service khusus.
 * Kalau belum → otomatis buat generic service (localStorage-backed).
 */
export function getServiceForSlug(slug) {
  return registeredServices[slug] || getDocumentService(slug)
}

// Backward compat
export const serviceRegistry = registeredServices

/**
 * Slug-slug yang pakai layout Regional (field: quarter, year, description, publishDate)
 * vs layout standar (field: month)
 * Note: DynamicPage sekarang pakai config.layout field, tapi ini tetap dipakai
 * oleh AdminPublikasi buildFields() untuk determine form fields.
 */
export const REGIONAL_SLUGS = ["/regional"]
