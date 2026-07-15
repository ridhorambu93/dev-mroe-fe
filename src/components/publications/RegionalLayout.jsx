import { useMemo, useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { FaFilePdf } from "react-icons/fa"
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { slugify } from "../../utils/slugify"
import { parseDateToPeriod, DEFAULT_SUBSECTION_PERIODS } from "../../config/periodConfig"
import { useWatermarkDownload } from "../../hooks/useWatermarkDownload"

function SubsectionBanner({ bannerData }) {
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    if (bannerData?.type !== "slider" || !bannerData?.files?.length) return
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % bannerData.files.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [bannerData])

  if (!bannerData) return null

  if (bannerData.type === "video" && bannerData.videoUrl) {
    return (
      <div className="flex justify-center mb-10">
        <iframe src={bannerData.videoUrl} className="w-full max-w-3xl h-64 md:h-80 rounded-lg" allowFullScreen title="banner video" />
      </div>
    )
  }

  if (bannerData.type === "slider" && bannerData.files?.length > 0) {
    return (
      <div className="relative mb-10">
        <div className="overflow-hidden rounded-lg">
          <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
            {bannerData.files.map((img, i) => (
              <img key={i} src={img} alt={`slide-${i}`} className="w-full shrink-0 max-h-[300px] object-contain" />
            ))}
          </div>
        </div>
        {bannerData.files.length > 1 && (
          <>
            <button onClick={() => setSlideIndex((p) => (p - 1 + bannerData.files.length) % bannerData.files.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => setSlideIndex((p) => (p + 1) % bannerData.files.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow">
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
    )
  }

  if (bannerData.type === "image" && bannerData.files?.[0]) {
    return (
      <div className="flex justify-center mb-10">
        <img src={bannerData.files[0]} alt="banner" className="max-h-[300px] object-contain" />
      </div>
    )
  }

  return null
}

 
export default function RegionalLayout({ title, banner, categories, subsectionPeriods, subsectionBanners, data = [], loading }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get("tab") || null
  const [search, setSearch] = useState("")
  const [openYears, setOpenYears] = useState({})
  const [openPeriods, setOpenPeriods] = useState({})
  const { download: watermarkDownload } = useWatermarkDownload()

  const tabs = useMemo(() => {
    if (categories && categories.length > 0) {
      return categories.map((cat) => ({ key: slugify(cat), label: cat }))
    }
    return [...new Set(data.map((item) => item.category))].map((cat) => ({ key: slugify(cat), label: cat }))
  }, [categories, data])

  const effectiveTab = activeTab || (tabs.length > 0 ? tabs[0].key : null)

  const effectiveCategory = useMemo(() => {
    if (activeTab) {
      const found = tabs.find((t) => t.key === activeTab)
      return found ? found.label : null
    }
    return tabs.length > 0 ? tabs[0].label : null
  }, [activeTab, tabs])

  const periodType = (subsectionPeriods?.[effectiveCategory]) || DEFAULT_SUBSECTION_PERIODS[effectiveCategory] || "quarterly"

  const filteredData = useMemo(() => {
    let result = effectiveCategory ? data.filter((item) => item.category === effectiveCategory) : data
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((item) =>
        (item.title ?? "").toLowerCase().includes(q) ||
        (item.description ?? "").toLowerCase().includes(q)
      )
    }
    return result
  }, [data, effectiveCategory, search])

  const groupedByYear = useMemo(() => {
    const yearMap = {}
    filteredData.forEach((item) => {
      const dateStr = item.publishDate || item.startDate
      const { year, period } = parseDateToPeriod(dateStr, periodType)
      const groupKey = period || "Umum"
      if (!yearMap[year]) yearMap[year] = {}
      if (!yearMap[year][groupKey]) yearMap[year][groupKey] = []
      yearMap[year][groupKey].push(item)
    })
    return Object.entries(yearMap)
      .sort(([a], [b]) => b - a)
      .map(([year, periods]) => ({
        year,
        periods: Object.entries(periods).map(([period, items]) => ({ period, items })),
      }))
  }, [filteredData, periodType])

  const toggleYear = (year) => setOpenYears((prev) => ({ ...prev, [year]: !prev[year] }))
  const togglePeriod = (key) => setOpenPeriods((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <h1 className="text-xl md:text-2xl font-semibold text-slate-800 mb-8">{title}</h1>

      {/* BANNER */}
      <SubsectionBanner bannerData={subsectionBanners?.[effectiveCategory]} />

      {/* TABS */}
      {tabs.length > 0 && (
        <div className="flex justify-center mb-8">
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
      <div className="w-full mb-6">
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

      {/* ACCORDION YEAR -> PERIOD -> LIST */}
      {!loading && (
        <div className="space-y-3">
          {groupedByYear.map(({ year, periods }) => (
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
                <div className="divide-y">
                  {periods.map(({ period, items }) => {
                    const key = `${year}-${period}`
                    return (
                      <div key={key}>
                        <button
                          onClick={() => togglePeriod(key)}
                          className="w-full flex justify-between items-center px-5 py-3 bg-gray-50 hover:bg-gray-100 text-[#e6a817] font-semibold">
                          <span>{period}</span>
                          <span className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center">
                            {openPeriods[key] ? (
                              <ChevronUp size={16} className="text-gray-600" />
                            ) : (
                              <ChevronDown size={16} className="text-gray-600" />
                            )}
                          </span>
                        </button>

                        {openPeriods[key] && (
                          <div className="px-5 py-3 space-y-3">
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
                                <span className="text-sm text-gray-500">{item.publishDate || "-"}</span>
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
                                  <button
                                    onClick={() => watermarkDownload(item.file, `${item.title}.pdf`)}
                                    className="text-sm font-semibold text-[#3d5a80] hover:underline px-2">
                                    Unduh
                                  </button>
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
