import { useEffect, useState } from "react"
import { publicationService } from "../services/publicationService"
import { homeConfigService } from "../services/homeConfigService"
import fallbackIndicator from "../assets/images/home/indicator-image.png"

const HomePage = () => {
  const [config, setConfig] = useState(null)
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    let active = true
    Promise.all([homeConfigService.getConfig(), publicationService.getAll()])
      .then(([cfg, docs]) => {
        if (!active) return
        setConfig(cfg)
        setPublications(docs || [])
      })
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  const filtered = search
    ? publications.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    : publications

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-20 text-center">
        <p className="text-slate-500">Loading data...</p>
      </div>
    )
  }

  const indicatorSrc = config?.indicatorImage || fallbackIndicator

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      {/* WELCOME */}
      <section className="text-center mb-10">
        <h1 className="text-2xl md:text-4xl font-medium text-slate-800">
          {config?.welcomeText || "Selamat datang di situs Research and Office of Economist bank bjb"}
        </h1>
      </section>

      {/* INDICATOR IMAGE */}
      <section className="bg-white border rounded-lg p-4 mb-12">
        <h2 className="font-semibold text-[#00549F] mb-4">
          {config?.indicatorTitle || "Data Indikator"}
        </h2>
        {indicatorSrc ? (
          <img src={indicatorSrc} alt="Data Indikator" className="w-full rounded-md object-cover" />
        ) : (
          <p className="text-slate-400 text-sm">Tidak ada data indikator</p>
        )}
      </section>

      {/* DOCUMENTS */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
          <h2 className="font-semibold text-[#00549F]">Dokumen Upload Terbaru</h2>
          <input
            type="text"
            placeholder="Temukan dokumen"
            className="border rounded px-4 py-2 w-full sm:w-80"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="h-[2px] bg-yellow-400 mb-6" />

        {filtered.length === 0 ? (
          <p className="text-slate-400 text-center py-10">Tidak ada dokumen tersedia</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item) => (
              <div key={item.id} className="border rounded-md bg-white p-4">
                <div className="flex gap-4">
                  <div className="w-12 h-14 border flex items-center justify-center text-red-500 text-xs font-bold">
                    PDF
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm text-slate-700">{item.title}</h3>
                    <div className="mt-5 flex justify-between text-xs">
                      <span className="text-yellow-500">{item.category}</span>
                      <span className="text-slate-500">{item.author}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default HomePage
