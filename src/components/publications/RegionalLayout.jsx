import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { FaFilePdf } from "react-icons/fa"
import { ChevronUp, ChevronDown } from "lucide-react"

const QUARTER_ORDER = ["Triwulan I", "Triwulan II", "Triwulan III", "Triwulan IV"]

export default function RegionalLayout({ title, banner, data = [], loading }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get("tab") || null
  const [openYears, setOpenYears] = useState({})
  const [openQuarters, setOpenQuarters] = useState({})

  const tabs = useMemo(
    () => [...new Set(data.map((item) => item.category))].map((cat) => ({ key: cat, label: cat })),
    [data],
  )

  const filteredData = useMemo(
    () => (activeTab ? data.filter((item) => item.category === activeTab) : data),
    [data, activeTab],
  )

  const groupedByYear = useMemo(() => {
    const yearMap = {}
    filteredData.forEach((item) => {
      if (!yearMap[item.year]) yearMap[item.year] = {}
      if (!yearMap[item.year][item.quarter]) yearMap[item.year][item.quarter] = []
      yearMap[item.year][item.quarter].push(item)
    })
    return Object.entries(yearMap)
      .sort(([a], [b]) => b - a)
      .map(([year, quarters]) => ({
        year,
        quarters: QUARTER_ORDER.filter((q) => quarters[q]).map((q) => ({
          quarter: q,
          items: quarters[q],
        })),
      }))
  }, [filteredData])

  const toggleYear = (year) => setOpenYears((prev) => ({ ...prev, [year]: !prev[year] }))
  const toggleQuarter = (key) => setOpenQuarters((prev) => ({ ...prev, [key]: !prev[key] }))

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
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 border rounded-lg p-1 bg-gray-50 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSearchParams({ tab: tab.key })}
                className={`px-4 py-2 text-sm rounded-md transition ${
                  activeTab === tab.key
                    ? "bg-yellow-400 text-dark font-semibold"
                    : "text-gray-500 hover:bg-gray-100"
                }`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

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

      {/* ACCORDION YEAR -> QUARTER -> LIST */}
      {!loading && (
        <div className="space-y-3">
          {groupedByYear.map(({ year, quarters }) => (
            <div key={year} className="border rounded-lg overflow-hidden">
              {/* YEAR HEADER */}
              <button
                onClick={() => toggleYear(year)}
                className="w-full flex justify-between items-center px-5 py-3 bg-[#3d5a80] text-white font-bold text-lg">
                <span>{year}</span>
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  {openYears[year] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </button>

              {openYears[year] && (
                <div className="divide-y">
                  {quarters.map(({ quarter, items }) => {
                    const key = `${year}-${quarter}`
                    return (
                      <div key={key}>
                        {/* QUARTER HEADER */}
                        <button
                          onClick={() => toggleQuarter(key)}
                          className="w-full flex justify-between items-center px-5 py-3 bg-gray-50 hover:bg-gray-100 text-[#e6a817] font-semibold">
                          <span>{quarter}</span>
                          <span className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center">
                            {openQuarters[key] ? (
                              <ChevronUp size={16} className="text-gray-600" />
                            ) : (
                              <ChevronDown size={16} className="text-gray-600" />
                            )}
                          </span>
                        </button>

                        {/* LIST ITEMS */}
                        {openQuarters[key] && (
                          <div className="px-5 py-3 space-y-3">
                            {/* TABLE HEADER */}
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
                                <span className="text-sm text-gray-500">{item.description}</span>
                                <span className="text-sm text-gray-500">{item.publishDate}</span>
                                <span className="text-sm text-gray-500">{item.author}</span>
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
