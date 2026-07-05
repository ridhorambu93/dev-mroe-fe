import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { FaFilePdf } from "react-icons/fa"
import { ChevronUp, ChevronDown } from "lucide-react"


export default function PublikasiLayout({ title, banner, data = [], loading }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get("tab") || null
  const [search, setSearch] = useState("")
  const [openYears, setOpenYears] = useState({})
  const [openMonths, setOpenMonths] = useState({})

  const tabs = useMemo(() => {
    return [...new Set(data.map((item) => item.category))].map((cat) => ({
      key: cat,
      label: cat,
    }))
  }, [data])

  const filteredData = useMemo(() => {
    let result = activeTab ? data.filter((item) => item.category === activeTab) : data
    if (search)
      result = result.filter((item) =>
        (item.title ?? "").toLowerCase().includes(search.toLowerCase()),
      )
    return result
  }, [data, activeTab, search])

  const groupedByYear = useMemo(() => {
    const yearMap = {}
    filteredData.forEach((item) => {
      const parts = (item.month || "Unknown").split(" ")
      const year = parts[1] || "Unknown"
      const month = parts[0] || "Unknown"
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

      {/* ACCORDION YEAR -> MONTH -> GRID */}
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
