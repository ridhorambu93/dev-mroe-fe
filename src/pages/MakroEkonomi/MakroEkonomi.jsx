/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { makroEkonomiService } from "../../services/makroEkonomiService"
import makroEkonomiBanner from "../../assets/images/makro-ekonomi/banner-makro-ekonomi.png"

export default function MakroEkonomi() {
  const [data, setData] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get("tab") || "all"
  const [search, setSearch] = useState("")
  const [openMonth, setOpenMonth] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const res = await makroEkonomiService.getPublications()
      setData(Array.isArray(res) ? res : [])
    } catch (error) {
      console.error("Failed to fetch makro ekonomi:", error)
      setData([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const tabs = useMemo(() => {
    const categories = [...new Set(data.map((item) => item.category))]
    return [
      { key: "all", label: "Semua" },
      ...categories.map((cat) => ({ key: cat, label: cat })),
    ]
  }, [data])

  const filteredData = useMemo(() => {
    let result = data

    if (activeTab !== "all") {
      result = result.filter((item) => item.category === activeTab)
    }

    if (search) {
      result = result.filter((item) =>
        (item.title ?? "").toLowerCase().includes(search.toLowerCase()),
      )
    }

    return result
  }, [data, search, activeTab])

  const groupedData = useMemo(() => {
    const group = {}
    filteredData.forEach((item) => {
      const month = item.month || "Unknown"
      if (!group[month]) group[month] = []
      group[month].push(item)
    })
    return Object.entries(group).map(([month, items]) => ({ month, items }))
  }, [filteredData])

  const toggleMonth = (month) => {
    setOpenMonth((prev) => (prev === month ? null : month))
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold text-slate-800 text-[#0B4F8A] mb-8">
        Data Indikator
      </h1>
      {/* Banner */}
            <div className="flex justify-center mb-10">
              <img
                src={makroEkonomiBanner}
                alt="Publication Banner"
                className="max-h-[300px] object-contain"
              />
            </div>

      {/* TABS */}
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
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* SEARCH */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Temukan dokumen"
          className="w-[420px] border px-4 py-2 rounded"
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

      {/* EMPTY */}
      {!loading && groupedData.length === 0 && (
        <div className="text-center text-gray-500">Tidak ada data ditemukan</div>
      )}

      {/* ACCORDION */}
      {!loading && groupedData.length > 0 && (
        <div className="space-y-3">
          {groupedData.map((group) => (
            <div key={group.month} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleMonth(group.month)}
                className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100"
              >
                <span className="font-semibold">{group.month}</span>
                <span>{openMonth === group.month ? "▲" : "▼"}</span>
              </button>

              {openMonth === group.month && (
                <div className="p-4 space-y-3">
                  {group.items.map((item) => (
                    <div key={item.id} className="border rounded-lg p-3 hover:bg-gray-50">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-500">
                        {item.category} • {item.author}
                      </p>
                    </div>
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
