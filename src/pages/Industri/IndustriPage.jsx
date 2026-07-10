import { useEffect, useState } from "react"
import { industriService } from "../../services/industriService"
import { pageService } from "../../services/pageService"
import PublikasiLayout from "../../components/publications/PublikasiLayout"

const CATEGORIES = ["Positioning", "Market Share", "Rasio Industri", "Kajian NPL"]
const GRID_CATEGORIES = ["Positioning", "Market Share", "Rasio Industri", "Kajian NPL"]

export default function IndustriPage() {
  const [data, setData] = useState([])
  const [pageConfig, setPageConfig] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    Promise.all([industriService.getAll(), pageService.getAll()])
      .then(([docs, pages]) => {
        if (!active) return
        setData(docs || [])
        setPageConfig(pages.find((p) => p.slug === "/industry"))
      })
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  return (
    <PublikasiLayout
      title="Industri"
      categories={CATEGORIES}
      gridCategories={GRID_CATEGORIES}
      subsectionPeriods={pageConfig?.subsectionPeriods}
      subsectionBanners={pageConfig?.subsectionBanners}
      data={data}
      loading={loading}
    />
  )
}
