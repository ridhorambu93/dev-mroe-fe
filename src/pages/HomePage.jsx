/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"

import { getIndicators } from "../services/indicatorService"
import { getPublications } from "../services/publicationService"

const HomePage = () => {
  const [indicatorImage, setIndicatorImage] = useState("")
  const [publications, setPublications] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)

        const indicatorData = await getIndicators()
        const publicationData = await getPublications()

        setIndicatorImage(indicatorData.image)
        setPublications(publicationData)
      } catch (err) {
        setError("Gagal memuat data")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-20 text-center">
        <p className="text-slate-500">Loading data...</p>
      </div>
    )
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="max-w-6xl mx-auto py-20 text-center">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* ================= WELCOME ================= */}
      <section className="text-center mb-10">
        <h1 className="text-4xl font-medium text-slate-800">
          Selamat datang di situs Research and Office of Economist bank bjb
        </h1>
      </section>

      {/* ================= INDICATOR IMAGE ================= */}
      <section className="bg-white border rounded-lg p-4 mb-12">
        <h2 className="font-semibold text-[#00549F] mb-4">Data Indikator</h2>

        {indicatorImage ? (
          <img
            src={indicatorImage}
            alt="Data Indikator"
            className="w-full rounded-md object-cover"
          />
        ) : (
          <p className="text-slate-400 text-sm">Tidak ada data indikator</p>
        )}
      </section>

      {/* ================= DOCUMENT ================= */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-[#00549F]">
            Dokumen Upload Terbaru
          </h2>

          <input
            type="text"
            placeholder="Temukan dokumen"
            className="border rounded px-4 py-2 w-80"
          />
        </div>

        <div className="h-[2px] bg-yellow-400 mb-6" />

        {/* EMPTY STATE */}
        {publications.length === 0 ? (
          <p className="text-slate-400 text-center py-10">
            Tidak ada dokumen tersedia
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-5">
            {publications.map((item) => (
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
