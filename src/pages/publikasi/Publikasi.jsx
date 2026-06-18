import { useEffect, useMemo, useState } from "react"
import { publicationService } from "../../services/publicationService"

export default function Publikasi() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState("")
  const [openMonth, setOpenMonth] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    const res = await publicationService.getPublications()
    setData(res)
    setLoading(false)
  }

  // 🔍 SEARCH (client-side dulu, nanti pindah ke API tanpa ubah UI)
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    )
  }, [data, search])

  // 📦 GROUP BY MONTH
  const groupedData = useMemo(() => {
    const group = {}

    filteredData.forEach((item) => {
      if (!group[item.month]) group[item.month] = []
      group[item.month].push(item)
    })

    return Object.entries(group).map(([month, items]) => ({
      month,
      items,
    }))
  }, [filteredData])

  const toggleMonth = (month) => {
    setOpenMonth(openMonth === month ? null : month)
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Publikasi</h1>
        <p className="text-gray-500">Daftar publikasi riset & laporan</p>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Cari publikasi..."
        className="w-full border px-4 py-2 rounded-lg mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

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

      {/* ACCORDION */}
      {!loading && (
        <div className="space-y-3">
          {groupedData.map((group) => (
            <div
              key={group.month}
              className="border rounded-lg overflow-hidden">
              {/* HEADER ACCORDION */}
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
