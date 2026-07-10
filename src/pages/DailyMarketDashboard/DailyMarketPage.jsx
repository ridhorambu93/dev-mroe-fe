import { useEffect, useState } from "react"
import { dailyMarketService } from "../../services/dailyMarketService"
import PublikasiLayout from "../../components/publications/PublikasiLayout"

const CATEGORIES = ["Daily Market"]
const GRID_CATEGORIES = ["Daily Market"]

export default function DailyMarketPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    dailyMarketService.getAll().then((docs) => {
      if (!active) return
      setData(docs || [])
    }).finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  return (
    <PublikasiLayout
      title="Daily Market Dashboard"
      banner={null}
      categories={CATEGORIES}
      gridCategories={GRID_CATEGORIES}
      data={data}
      loading={loading}
    />
  )
}
