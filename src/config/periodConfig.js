/**
 * periodConfig
 * ------------
 * Konfigurasi periode per subsection.
 * Menentukan field apa yang muncul di form admin berdasarkan tipe periode.
 *
 * periodType:
 *   "daily"      → field: tanggal (date picker / text)
 *   "monthly"    → field: bulan + tahun
 *   "quarterly"  → field: triwulan + tahun
 *   "semester"   → field: semester + tahun
 *   "yearly"     → field: tahun
 *   "event"      → field: tanggal event (free text)
 */

export const PERIOD_TYPES = {
  daily: { label: "Harian", fields: ["publishDate"] },
  monthly: { label: "Bulanan", fields: ["month", "year"] },
  quarterly: { label: "Triwulan", fields: ["quarter", "year"] },
  semester: { label: "Semester", fields: ["semester", "year"] },
  yearly: { label: "Tahunan", fields: ["year"] },
  event: { label: "By Event", fields: ["publishDate"] },
}

export const MONTH_OPTIONS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
]

export const QUARTER_OPTIONS = ["Triwulan I", "Triwulan II", "Triwulan III", "Triwulan IV"]
export const SEMESTER_OPTIONS = ["Semester 1", "Semester 2"]

/**
 * Build form fields berdasarkan period type.
 * Return array field config yang bisa langsung dipakai FormModal/ContentManager.
 */
export function buildPeriodFields(periodType) {
  switch (periodType) {
    case "daily":
      return [
        { name: "publishDate", label: "Tanggal Publikasi", type: "date", required: true, table: true },
      ]
    case "monthly":
      return [
        { name: "month", label: "Bulan", type: "select", required: true, table: true, options: MONTH_OPTIONS },
        { name: "year", label: "Tahun", type: "text", required: true, table: true, placeholder: "2026" },
      ]
    case "quarterly":
      return [
        { name: "quarter", label: "Triwulan", type: "select", required: true, table: true, options: QUARTER_OPTIONS },
        { name: "year", label: "Tahun", type: "text", required: true, table: true, placeholder: "2026" },
      ]
    case "semester":
      return [
        { name: "semester", label: "Semester", type: "select", required: true, table: true, options: SEMESTER_OPTIONS },
        { name: "year", label: "Tahun", type: "text", required: true, table: true, placeholder: "2026" },
      ]
    case "yearly":
      return [
        { name: "year", label: "Tahun", type: "text", required: true, table: true, placeholder: "2026" },
      ]
    case "event":
      return [
        { name: "publishDate", label: "Tanggal Event", type: "date", required: true, table: true },
      ]
    default:
      return [
        { name: "month", label: "Periode", type: "text", required: true, table: true, placeholder: "Januari 2026" },
      ]
  }
}

/**
 * Default subsection period mapping.
 * Key = nama category/subsection, value = periodType.
 * Ini di-seed di pageService sebagai field `subsectionPeriods`.
 */
export const DEFAULT_SUBSECTION_PERIODS = {
  "Daily Economic": "daily",
  "Bjb Business Insight": "quarterly",
  "Lainnya": "quarterly",
  "Macro brief": "quarterly",
  "Ekonomi Makro": "quarterly",
  "Positioning": "monthly",
  "Market Share": "monthly",
  "Rasio Industri": "semester",
  "Kajian NPL": "semester",
  "Mapping Ekonomi": "yearly",
  "Pemetaan Sektoral Ekonomi & Kredit Perbankan": "quarterly",
  "Kajian": "event",
  "Materi": "event",
}
