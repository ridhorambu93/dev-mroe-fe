import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { FaFilePdf } from "react-icons/fa"
import { ChevronUp, ChevronDown } from "lucide-react"
import { slugify } from "../../utils/slugify"

/**
 * PublikasiLayout
 * ---------------
 * Props:
 *   title, banner, categories, data, loading
 *   gridCategories - array kategori yang pakai layout grid (default: [kategori pertama])
 *                    sisanya pakai layout list-row
 */
export default function PublikasiLayout({ title, banner, categories, gridCategories, data = [], loading }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get("tab") || null
  const [search, setSearch] = useState("")
  const [openYears, setOpenYears] = useState({})
  const [openMonths, setOpenMonths] = useState({})

  const tabs = useMemo(() => {
    if (categories && categories.length > 0) {
      return categories.map((cat) => ({ key: slugify(cat), label: cat }))
    }
    return [...new Set(data.map((item) => item.category))].map((cat) => ({
      key: slugify(cat),
      label: cat,
    }))
  }, [categories, data])

  // Map slug param back to category name
  const effectiveCategory = useMemo(() => {
    if (activeTab) {
      const found = tabs.find((t) => t.key === activeTab)
      return found ? found.label : null
    }
    return tabs.length > 0 ? tabs[0].label : null
  }, [activeTab, tabs])

  const effectiveTab = activeTab || (tabs.length > 0 ? tabs[0].key : null)

  // Determine layout: grid or list
  const isGridLayout = useMemo(() => {
    if (gridCategories && gridCategories.length > 0) {
      return gridCategories.includes(effectiveCategory)
    }
    return tabs.length > 0 && effectiveTab === tabs[0].key
  }, [effectiveCategory, effectiveTab, gridCategories, tabs])

  const filteredData = useMemo(() => {
    let result = effectiveCategory ? data.filter((item) => item.category === effectiveCategory) : data
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((item) =>
        (item.title ?? "").toLowerCase().includes(q) ||
        (item.description ?? "").toLowerCase().includes(q) ||
        (item.author ?? "").toLowerCase().includes(q)
      )
    }
    return result
  }, [data, effectiveCategory, search])

  const groupedByYear = useMemo(() => {
    const MONTH_NAMES = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]
    const yearMap = {}
    filteredData.forEach((item) => {
      let year = "Unknown"
      let month = "Unknown"
      if (item.publishDate) {
        // format: "2026-01-15" (date input)
        const d = new Date(item.publishDate)
        if (!isNaN(d)) {
          year = String(d.getFullYear())
          month = MONTH_NAMES[d.getMonth()]
        }
      } else if (item.year) {
        year = item.year
        month = item.month || item.quarter || item.semester || "Umum"
      } else if (item.month) {
        const parts = item.month.split(" ")
        month = parts[0] || "Unknown"
        year = parts[1] || "Unknown"
      }
      if (!yearMap[year]) yearMap[year] = {}
      if (!yearMap[year][month]) yearMap[year][month] = []
      yearMap[year][month].push(item)
    })
    return Object.entries(yearMap)
      .sort(([a], [b]) => b - a)
      .map(([year, months]) => ({
        year,
        months: Object.entries(months).map(([month, items]) => ({ month, items })),
      }))
  }, [filteredData])

  const toggleYear = (year) => setOpenYears((prev) => ({ ...prev, [year]: !prev[year] }))
  const toggleMonth = (key) => setOpenMonths((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <h1 className="text-xl md:text-2xl font-semibold text-slate-800 mb-8">{title}</h1>

      {banner && (
        <div className="flex justify-center mb-10">
          <img src={banner} alt={title} className="max-h-[300px] object-contain" />
        </div>
      )}

      {/* TABS */}
      {tabs.length > 0 && (
        <div className="flex justify-center mb-6">
          <div className="flex gap-2 border rounded-lg p-1 bg-gray-50 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSearchParams({ tab: tab.key })}
                className={`px-4 py-2 text-sm rounded-md transition ${
                  effectiveTab === tab.key
                    ? "bg-yellow-400 text-dark font-semibold"
                    : "text-gray-500 hover:bg-gray-100"
                }`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SEARCH */}
      <div className="w-full px-4 py-2 rounded">
        <input
          type="text"
          placeholder="Temukan dokumen"
          className="w-full border px-4 py-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* LOADING */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-100 animate-pulse rounded-lg" />
          ))}
        </div>
      )}

      {!loading && groupedByYear.length === 0 && (
        <div className="text-center text-gray-500">Tidak ada data ditemukan</div>
      )}

      {/* ACCORDION YEAR -> MONTH -> CONTENT */}
      {!loading && (
        <div className="space-y-2">
          {groupedByYear.map(({ year, months }) => (
            <div key={year} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleYear(year)}
                className="w-full flex justify-between items-center px-5 py-3 bg-[#3d5a80] text-white font-bold text-lg">
                <span>{year}</span>
                {openYears[year] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {openYears[year] && (
                <div className="divide-y">
                  {months.map(({ month, items }) => {
                    const key = `${year}-${month}`
                    return (
                      <div key={key}>
                        <button
                          onClick={() => toggleMonth(key)}
                          className="w-full flex justify-between items-center px-5 py-3 bg-gray-100 hover:bg-gray-200 text-[#e6a817] font-semibold">
                          <span>{month}</span>
                          {openMonths[key] ? (
                            <ChevronUp size={18} className="text-gray-500" />
                          ) : (
                            <ChevronDown size={18} className="text-gray-500" />
                          )}
                        </button>

                        {openMonths[key] && (
                          isGridLayout ? (
                            /* GRID LAYOUT (Daily Economic style) */
                            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                              {items.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white hover:bg-gray-50">
                                  <FaFilePdf className="text-red-500 text-2xl shrink-0" />
                                  <span className="text-sm text-gray-600 flex-1 truncate">
                                    {item.title}
                                  </span>
                                  <a
                                    href={item.file || "#"}
                                    className="text-sm font-bold text-[#3d5a80] hover:underline shrink-0"
                                    target="_blank"
                                    rel="noreferrer">
                                    Unduh
                                  </a>
                                </div>
                              ))}
                            </div>
                          ) : (
                            /* LIST-ROW LAYOUT (bjb Business Insight / Lainnya style) */
                            <div className="px-5 py-3 space-y-3">
                              {/* Table header */}
                              <div className="hidden md:grid grid-cols-[auto_1fr_1fr_1fr_1fr_auto] gap-4 text-xs text-gray-400 font-medium px-2">
                                <span className="w-8" />
                                <span>Judul kajian</span>
                                <span>Deskripsi</span>
                                <span>Tgl publikasi</span>
                                <span>Penyusun</span>
                                <span className="w-24" />
                              </div>

                              {items.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex flex-col md:grid md:grid-cols-[auto_1fr_1fr_1fr_1fr_auto] gap-2 md:gap-4 items-start md:items-center border rounded-lg px-4 py-3 bg-white hover:bg-gray-50">
                                  <FaFilePdf className="text-red-500 text-2xl shrink-0" />
                                  <span className="text-sm font-medium text-slate-700">{item.title}</span>
                                  <span className="text-sm text-gray-500">{item.description || "-"}</span>
                                  <span className="text-sm text-gray-500">{item.publishDate || item.month || (item.year ? `${item.month || item.quarter || item.semester || ''} ${item.year}`.trim() : "-")}</span>
                                  <span className="text-sm text-gray-500">{item.author || "-"}</span>
                                  <div className="flex items-center shrink-0">
                                    <a
                                      href={item.file || "#"}
                                      className="text-sm font-semibold text-[#3d5a80] hover:underline px-2"
                                      target="_blank"
                                      rel="noreferrer">
                                      Lihat
                                    </a>
                                    <span className="text-gray-300">|</span>
                                    <a
                                      href={item.file || "#"}
                                      className="text-sm font-semibold text-[#3d5a80] hover:underline px-2"
                                      download
                                      rel="noreferrer">
                                      Unduh
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
