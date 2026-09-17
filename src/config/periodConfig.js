/**
 * periodConfig
 * ------------
 * Admin cukup input tanggal (date picker).
 * Frontend parse otomatis ke bulan/triwulan/semester/tahun
 * berdasarkan period type subsection.
 *
 */

export const PERIOD_TYPES = {
  Bulanan: { label: "Bulanan" },
  Triwulan: { label: "Triwulan" },
  Semester: { label: "Semester" },
  Tahunan: { label: "Tahunan" },
  "By Event": { label: "By Event" },
}

const MONTH_NAMES = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
]

/**
 * Build form fields — admin cuma input date.
 */
export function buildPeriodFields(periodType) {
  if (periodType === "By Event") {
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
    case "Bulanan":
      return { year, period: MONTH_NAMES[monthIdx] }
    case "Triwulan": {
      const q = Math.floor(monthIdx / 3) + 1
      return { year, period: `Triwulan ${["I", "II", "III", "IV"][q - 1]}` }
    }
    case "Semester": {
      const s = monthIdx < 6 ? 1 : 2
      return { year, period: `Semester ${s}` }
    }
    case "Tahunan":
      return { year, period: null }
    default:
      return { year, period: MONTH_NAMES[monthIdx] }
  }
}

/**
 * Default subsection period mapping.
 */
export const DEFAULT_SUBSECTION_PERIODS = {
  "Daily Economic": "Bulanan",
  "Bjb Business Insight": "Triwulan",
  "Lainnya": "Triwulan",
  "Macro brief": "Triwulan",
  "Ekonomi Makro": "Triwulan",
  "Positioning": "Bulanan",
  "Market Share": "Bulanan",
  "Rasio Industri": "Semester",
  "Kajian NPL": "Semester",
  "Mapping Ekonomi": "Triwulan",
  "Pemetaan Sektoral Ekonomi & Kredit Perbankan": "Triwulan",
  "Kajian": "By Event",
  "Materi": "By Event",
}

