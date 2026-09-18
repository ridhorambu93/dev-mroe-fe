import { useMemo, useState } from "react"
import { FaFilePdf } from "react-icons/fa"
import { ChevronUp, ChevronDown } from "lucide-react"
import { useWatermarkDownload } from "../../hooks/useWatermarkDownload"

function MateriCard({ item, onDownload }) {
  return (
    <div className="flex flex-col md:grid md:grid-cols-[auto_1fr_1fr_1fr_1fr_auto] gap-2 md:gap-4 items-start md:items-center border rounded-lg px-4 py-3 bg-white hover:bg-gray-50">
      <FaFilePdf className="text-red-500 text-2xl shrink-0" />
      <span className="text-sm font-medium text-slate-700">{item.title}</span>
      <span className="text-sm text-gray-500">{item.description || "-"}</span>
      <span className="text-sm text-gray-500">
        {item.event_start_date
          ? `${item.event_start_date} - ${item.event_end_date}`
          : item.publish_date || "-"}
      </span>
      <span className="text-sm text-gray-500">
        {Array.isArray(item.authors) ? item.authors.join(", ") : item.authors || "-"}
      </span>
      <div className="flex items-center shrink-0">
        <a
          href={item.file || "#"}
          className="text-sm font-semibold text-[#3d5a80] hover:underline px-2"
          target="_blank"
          rel="noreferrer">
          Lihat
        </a>
        <span className="text-gray-300">|</span>
        <button
          onClick={() => onDownload(item.file, `${item.title}.pdf`)}
          className="text-sm font-semibold text-[#3d5a80] hover:underline px-2">
          Unduh
        </button>
      </div>
    </div>
  )
}

const TABLE_HEADER = (
  <div className="hidden md:grid grid-cols-[auto_1fr_1fr_1fr_1fr_auto] gap-4 text-xs text-gray-400 font-medium px-2">
    <span className="w-8" />
    <span>Judul kajian</span>
    <span>Deskripsi</span>
    <span>Tgl publikasi</span>
    <span>Penyusun</span>
    <span className="w-24" />
  </div>
)

export default function ForumLayout({ title, data = [], loading, error }) {
  const [openYears, setOpenYears] = useState({})
  const [search, setSearch] = useState("")
  const { download: watermarkDownload } = useWatermarkDownload()

  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const filtered = useMemo(() => {
    if (!search) return data
    const q = search.toLowerCase()
    return data.filter((item) =>
      (item.title ?? "").toLowerCase().includes(q) ||
      (item.period_value ?? "").toLowerCase().includes(q)
    )
  }, [data, search])

  const { activeEvents, archivedByYear } = useMemo(() => {
    const activeMap = {}
    const archiveMap = {}

    filtered.forEach((item) => {
      const endDate = new Date(item.event_end_date || "")
      const isActive = endDate >= today

      if (isActive) {
        const eventName = item.period_value || "Tanpa Event"
        if (!activeMap[eventName]) activeMap[eventName] = []
        activeMap[eventName].push(item)
      } else {
        const year = item.period_year || new Date(item.event_start_date || "").getFullYear() || "Unknown"
        if (!archiveMap[year]) archiveMap[year] = []
        archiveMap[year].push(item)
      }
    })

    return {
      activeEvents: Object.entries(activeMap).map(([eventName, items]) => ({ eventName, items })),
      archivedByYear: Object.entries(archiveMap)
        .sort(([a], [b]) => b - a)
        .map(([year, items]) => ({ year, items })),
    }
  }, [filtered, today])

  const toggleYear = (year) => setOpenYears((prev) => ({ ...prev, [year]: !prev[year] }))

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <h1 className="text-xl md:text-2xl font-semibold text-slate-800 mb-8">{title}</h1>

      <div className="w-full mb-6">
        <input
          type="text"
          placeholder="Temukan dokumen"
          className="w-full border px-4 py-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-100 animate-pulse rounded-lg" />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="text-center text-red-500">Gagal memuat data. Silakan coba lagi.</div>
      )}

      {!loading && !error && activeEvents.length === 0 && archivedByYear.length === 0 && (
        <div className="text-center text-gray-500">Tidak ada data ditemukan</div>
      )}

      {/* SECTION AKTIF */}
      {!loading && !error && activeEvents.length > 0 && (
        <div className="mb-8 space-y-6">
          {activeEvents.map(({ eventName, items }) => (
            <div key={eventName}>
              <h2 className="text-lg font-bold text-[#1d3557] mb-3 pb-1 border-b-2 border-[#e6a817]">
                {eventName}
              </h2>
              <div className="space-y-3">
                {TABLE_HEADER}
                {items.map((item) => (
                  <MateriCard key={item.id} item={item} onDownload={watermarkDownload} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DIVIDER */}
      {!loading && !error && activeEvents.length > 0 && archivedByYear.length > 0 && (
        <div className="border-t my-6" />
      )}

      {/* ACCORDION ARSIP BY TAHUN */}
      {!loading && !error && archivedByYear.length > 0 && (
        <div className="space-y-3">
          {archivedByYear.map(({ year, items }) => (
            <div key={year} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleYear(year)}
                className="w-full flex justify-between items-center px-5 py-3 bg-[#3d5a80] text-white font-bold text-lg">
                <span>{year}</span>
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  {openYears[year] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </button>
              {openYears[year] && (
                <div className="px-5 py-3 space-y-3">
                  {TABLE_HEADER}
                  {items.map((item) => (
                    <MateriCard key={item.id} item={item} onDownload={watermarkDownload} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
