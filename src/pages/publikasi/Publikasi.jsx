import { useCallback, useEffect, useMemo, useState } from "react"
import { publicationService } from "../../services/publicationService"
import publicationBanner from "../../assets/images/publikasi/publication-banner.png"

export default function Publikasi() {
  const [data, setData] = useState([])
  // state
  const [activeTab, setActiveTab] = useState("all")
  const [search, setSearch] = useState("")
  const [openMonth, setOpenMonth] = useState(null)
  const [loading, setLoading] = useState(true)

  // fetch data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const res = await publicationService.getPublications()
      setData(Array.isArray(res) ? res : [])
    } catch (error) {
      console.error("Failed to fetch publications:", error)
      setData([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData()
  }, [fetchData])


  const tabs = useMemo(() => {
    const categories = data.map((item) => item.category)
    const unique = [...new Set(categories)]

    return [
      { key: "all", label: "Semua" },
      ...unique.map((cat) => ({
        key: cat,
        label: cat,
      })),
    ]
  }, [data])

  // filter search
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

  // group by month
  const groupedData = useMemo(() => {
    const group = {}

    filteredData.forEach((item) => {
      const month = item.month || "Unknown"

      if (!group[month]) group[month] = []
      group[month].push(item)
    })

    return Object.entries(group).map(([month, items]) => ({
      month,
      items,
    }))
  }, [filteredData])

  // toggle month accordion
  const toggleMonth = (month) => {
    setOpenMonth((prev) => (prev === month ? null : month))
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* BANNER */}
      <div className="flex justify-center mb-10">
        <img
          src={publicationBanner}
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
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm rounded-md transition ${
                activeTab === tab.key
                  ? "bg-white shadow font-semibold"
                  : "text-gray-500"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* SEARCH */}
      <div className="flex justify-center mb-10">
        <div className="w-[420px]">
          <input
            type="text"
            placeholder="Temukan dokumen"
            className="w-full border px-4 py-2 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 bg-gray-100 animate-pulse rounded-lg"
            />
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && groupedData.length === 0 && (
        <div className="text-center text-gray-500">
          Tidak ada data ditemukan
        </div>
      )}

      {/* ACCORDION */}
      {!loading && groupedData.length > 0 && (
        <div className="space-y-3">
          {groupedData.map((group) => (
            <div
              key={group.month}
              className="border rounded-lg overflow-hidden">
              {/* HEADER */}
              <button
                onClick={() => toggleMonth(group.month)}
                className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100">
                <span className="font-semibold">{group.month}</span>
                <span>{openMonth === group.month ? "▲" : "▼"}</span>
              </button>

              {/* CONTENT */}
              {openMonth === group.month && (
                <div className="p-4 space-y-3">
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-lg p-3 hover:bg-gray-50">
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
