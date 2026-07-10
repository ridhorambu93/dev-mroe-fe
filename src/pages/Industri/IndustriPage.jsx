import { useEffect, useState } from "react"
import { industriService } from "../../services/industriService"
import PublikasiLayout from "../../components/publications/PublikasiLayout"

const CATEGORIES = ["Positioning", "Market Share", "Rasio Industri", "Kajian NPL"]
const GRID_CATEGORIES = ["Positioning", "Market Share", "Rasio Industri", "Kajian NPL"]

export default function IndustriPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    industriService.getAll().then((docs) => {
      if (!active) return
      setData(docs || [])
    }).finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  return (
    <PublikasiLayout
      title="Industri"
      banner={null}
      categories={CATEGORIES}
      gridCategories={GRID_CATEGORIES}
      data={data}
      loading={loading}
    />
  )
}
