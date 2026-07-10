import { useEffect, useState } from "react"
import { dailyMarketDashboardService } from "../../services/dailyMarketDashboardService"

export default function DailyMarketPage() {
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dailyMarketDashboardService.get()
      .then((d) => setImageUrl(d.imageUrl || ""))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="flex justify-center py-20 text-slate-400">Memuat...</div>
  }

  if (!imageUrl) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <p className="text-lg">Belum ada data Daily Market Dashboard.</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Daily Market Dashboard</h1>
      <img src={imageUrl} alt="Daily Market Dashboard" className="w-full rounded-xl shadow-sm border" />
    </div>
  )
}
