import { useMemo, useState, useEffect } from "react"
import { FaFilePdf } from "react-icons/fa"
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react"

const QUARTER_ORDER = ["Triwulan I", "Triwulan II", "Triwulan III", "Triwulan IV"]

export default function ForumLayout({ title, config, data = [], loading }) {
  const gallery = config?.gallery || []
  const [slideIndex, setSlideIndex] = useState(0)
  const [openYears, setOpenYears] = useState({})
  const [openQuarters, setOpenQuarters] = useState({})

  useEffect(() => {
    if (gallery.length <= 1) return
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % gallery.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [gallery.length])

  const prevSlide = () => setSlideIndex((prev) => (prev - 1 + gallery.length) % gallery.length)
  const nextSlide = () => setSlideIndex((prev) => (prev + 1) % gallery.length)

  // Group by category (pembicara) — flat list per pembicara
  const pembicara = useMemo(() => {
    const map = {}
    data.forEach((item) => {
      const cat = item.category || "Lainnya"
      if (!map[cat]) map[cat] = []
      map[cat].push(item)
    })
    const order = config?.categories?.length > 0 ? config.categories : Object.keys(map)
    return order.filter((c) => map[c]).map((c) => ({ label: c, items: map[c] }))
  }, [data, config?.categories])

  // Group all data by year → quarter (for accordion below)
  const byYear = useMemo(() => {
    const yearMap = {}
    data.forEach((item) => {
      const year = item.year || "Unknown"
      const quarter = item.quarter || "Triwulan I"
      if (!yearMap[year]) yearMap[year] = {}
      if (!yearMap[year][quarter]) yearMap[year][quarter] = []
      yearMap[year][quarter].push(item)
    })
    return Object.entries(yearMap)
      .sort(([a], [b]) => b - a)
      .map(([year, quarters]) => ({
        year,
        quarters: QUARTER_ORDER.filter((q) => quarters[q]).map((q) => ({ quarter: q, items: quarters[q] })),
      }))
  }, [data])

  const toggleYear = (key) => setOpenYears((prev) => ({ ...prev, [key]: !prev[key] }))
  const toggleQuarter = (key) => setOpenQuarters((prev) => ({ ...prev, [key]: !prev[key] }))

  const DocRow = ({ item }) => (
    <div className="flex flex-col md:grid md:grid-cols-[auto_1fr_1fr_1fr_1fr_auto] gap-2 md:gap-4 items-start md:items-center border rounded-lg px-4 py-3 bg-white hover:bg-gray-50">
      <FaFilePdf className="text-red-500 text-2xl shrink-0" />
      <span className="text-sm font-medium text-slate-700">{item.title}</span>
      <span className="text-sm text-gray-500">{item.description || "-"}</span>
      <span className="text-sm text-gray-500">{item.publishDate || item.month || "-"}</span>
      <span className="text-sm text-gray-500">{item.author || "-"}</span>
      <div className="flex items-center shrink-0">
        <a href={item.file || "#"} className="text-sm font-semibold text-[#3d5a80] hover:underline px-2" target="_blank" rel="noreferrer">Lihat</a>
        <span className="text-gray-300">|</span>
        <a href={item.file || "#"} className="text-sm font-semibold text-[#3d5a80] hover:underline px-2" download rel="noreferrer">Unduh</a>
      </div>
    </div>
  )

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <h1 className="text-xl md:text-2xl font-semibold text-[#00549F] mb-8">{title}</h1>

      {/* IMAGE SLIDER */}
      {gallery.length > 0 && (
        <div className="relative mb-10">
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
              {gallery.map((img, i) => (
                <img key={i} src={img} alt={`Slide ${i + 1}`} className="w-full shrink-0 h-64 md:h-80 object-cover rounded-lg" />
              ))}
            </div>
          </div>
          {gallery.length > 1 && (
            <>
              <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white">
                <ChevronRight size={20} />
              </button>
              <div className="flex justify-center gap-2 mt-3">
                {gallery.map((_, i) => (
                  <button key={i} onClick={() => setSlideIndex(i)} className={`w-2.5 h-2.5 rounded-full transition ${i === slideIndex ? "bg-[#00549F]" : "bg-gray-300"}`} />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* MATERI SECTION */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="font-bold text-slate-800 text-lg shrink-0">Materi</h2>
          <div className="h-[2px] bg-yellow-400 flex-1" />
        </div>

        {loading && (
          <div className="space-y-3">
            {[1, 2].map((i) => <div key={i} className="h-20 bg-gray-100 animate-pulse rounded-lg" />)}
          </div>
        )}

        {!loading && data.length === 0 && (
          <p className="text-slate-400 text-center py-6">Belum ada materi</p>
        )}

        {/* PEMBICARA — flat list */}
        {!loading && pembicara.map(({ label, items }) => (
          <div key={label} className="mb-8">
            <h3 className="font-semibold text-slate-800 mb-3">{label}</h3>
            <div className="space-y-3">
              {items.map((item) => <DocRow key={item.id} item={item} />)}
            </div>
          </div>
        ))}

        {/* YEAR → QUARTER ACCORDION */}
        {!loading && byYear.length > 0 && (
          <div className="space-y-2 mt-8">
            {byYear.map(({ year, quarters }) => (
              <div key={year} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleYear(year)}
                  className="w-full flex justify-between items-center px-5 py-3 bg-[#3d5a80] text-white font-bold text-lg">
                  <span>{year}</span>
                  {openYears[year] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {openYears[year] && (
                  <div className="divide-y">
                    {quarters.map(({ quarter, items }) => {
                      const qKey = `${year}-${quarter}`
                      return (
                        <div key={qKey}>
                          <button
                            onClick={() => toggleQuarter(qKey)}
                            className="w-full flex justify-between items-center px-5 py-3 bg-gray-50 hover:bg-gray-100 text-[#e6a817] font-semibold">
                            <span>{quarter}</span>
                            {openQuarters[qKey] ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
                          </button>

                          {openQuarters[qKey] && (
                            <div className="px-5 py-3 space-y-3">
                              <div className="hidden md:grid grid-cols-[auto_1fr_1fr_1fr_1fr_auto] gap-4 text-xs text-gray-400 font-medium px-2">
                                <span className="w-8" />
                                <span>Judul kajian</span>
                                <span>Deskripsi</span>
                                <span>Tgl publikasi</span>
                                <span>Penyusun</span>
                                <span className="w-24" />
                              </div>
                              {items.map((item) => <DocRow key={item.id} item={item} />)}
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
      </section>
    </div>
  )
}
