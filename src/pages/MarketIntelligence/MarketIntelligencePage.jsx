import { useEffect, useState } from "react"
import { marketIntelligenceService } from "../../services/marketIntelligenceService"
import PublikasiLayout from "../../components/publications/PublikasiLayout"

const CATEGORIES = ["Market Intelligence"]
const GRID_CATEGORIES = ["Market Intelligence"]

export default function MarketIntelligencePage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    marketIntelligenceService.getAll().then((docs) => {
      if (!active) return
      setData(docs || [])
    }).finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  return (
    <PublikasiLayout
      title="Market Intelligence"
      banner={null}
      categories={CATEGORIES}
      gridCategories={GRID_CATEGORIES}
      data={data}
      loading={loading}
    />
  )
}
