/**
 * periodConfig
 * ------------
 * Admin cukup input tanggal (date picker).
 * Frontend parse otomatis ke bulan/triwulan/semester/tahun
 * berdasarkan period type subsection.
 *
 * periodType:
 *   "monthly"    → 1 date → extract bulan + tahun
 *   "quarterly"  → 1 date → hitung triwulan + tahun
 *   "semester"   → 1 date → hitung semester + tahun
 *   "yearly"     → 1 date → extract tahun
 *   "event"      → 2 dates → tanggal mulai + selesai
 */

export const PERIOD_TYPES = {
  monthly: { label: "Bulanan" },
  quarterly: { label: "Triwulan" },
  semester: { label: "Semester" },
  yearly: { label: "Tahunan" },
  event: { label: "By Event" },
}

const MONTH_NAMES = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
]

/**
 * Build form fields — admin cuma input date.
 */
export function buildPeriodFields(periodType) {
  if (periodType === "event") {
    return [
      { name: "startDate", label: "Tanggal Mulai", type: "date", required: true, table: true },
      { name: "endDate", label: "Tanggal Selesai", type: "date", required: true, table: true },
    ]
  }
  return [
    { name: "publishDate", label: "Tanggal Publikasi", type: "date", required: true, table: true },
  ]
}

/**
 * Parse date string ke period info berdasarkan period type.
 * Input: "2026-03-15", "quarterly"
 * Output: { year: "2026", period: "Triwulan I" }
 */
export function parseDateToPeriod(dateStr, periodType) {
  const d = new Date(dateStr)
  if (isNaN(d)) return { year: "Unknown", period: "Unknown" }

  const year = String(d.getFullYear())
  const monthIdx = d.getMonth() // 0-11

  switch (periodType) {
    case "monthly":
      return { year, period: MONTH_NAMES[monthIdx] }
    case "quarterly": {
      const q = Math.floor(monthIdx / 3) + 1
      return { year, period: `Triwulan ${["I", "II", "III", "IV"][q - 1]}` }
    }
    case "semester": {
      const s = monthIdx < 6 ? 1 : 2
      return { year, period: `Semester ${s}` }
    }
    case "yearly":
      return { year, period: null }
    default:
      return { year, period: MONTH_NAMES[monthIdx] }
  }
}

/**
 * Default subsection period mapping.
 */
export const DEFAULT_SUBSECTION_PERIODS = {
  "Daily Economic": "monthly",
  "Bjb Business Insight": "quarterly",
  "Lainnya": "quarterly",
  "Macro brief": "quarterly",
  "Ekonomi Makro": "quarterly",
  "Positioning": "monthly",
  "Market Share": "monthly",
  "Rasio Industri": "semester",
  "Kajian NPL": "semester",
  "Mapping Ekonomi": "quarterly",
  "Pemetaan Sektoral Ekonomi & Kredit Perbankan": "quarterly",
  "Kajian": "event",
  "Materi": "event",
}
