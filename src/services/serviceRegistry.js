import { publicationService } from "./publicationService"
import { makroEkonomiService } from "./makroEkonomiService"
import { industriService } from "./industriService"
import { regionalService } from "./regionalService"
import { dailyMarketService } from "./dailyMarketService"

/**
 * serviceRegistry
 * ---------------
 * Map slug halaman → document service.
 * Saat tambah halaman baru + service baru, cukup register di sini.
 * Nanti saat API siap, registry ini bisa di-fetch dari backend juga.
 */
export const serviceRegistry = {
  "/publikasi": publicationService,
  "/makroekonomi": makroEkonomiService,
  "/industry": industriService,
  "/regional": regionalService,
  "/daily-market-dashboard": dailyMarketService,
}

/**
 * Slug-slug yang pakai layout Regional (field: quarter, year, description, publishDate)
 * vs layout standar (field: month)
 */
export const REGIONAL_SLUGS = ["/regional"]
