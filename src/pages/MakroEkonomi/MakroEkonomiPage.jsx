import { useEffect, useState } from "react"
import { makroEkonomiService } from "../../services/makroEkonomiService"
import { pageService } from "../../services/pageService"
import PublikasiLayout from "../../components/publications/PublikasiLayout"

const CATEGORIES = ["Macro brief", "Ekonomi Makro"]
const GRID_CATEGORIES = ["Macro brief", "Ekonomi Makro"]

export default function MakroEkonomiPage() {
  const [data, setData] = useState([])
  const [pageConfig, setPageConfig] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    Promise.all([makroEkonomiService.getAll(), pageService.getAll()])
      .then(([docs, pages]) => {
        if (!active) return
        setData(docs || [])
        setPageConfig(pages.find((p) => p.slug === "/makroekonomi"))
      })
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  return (
    <PublikasiLayout
      title="Makro Ekonomi"
      categories={CATEGORIES}
      gridCategories={GRID_CATEGORIES}
      subsectionPeriods={pageConfig?.subsectionPeriods}
      subsectionBanners={pageConfig?.subsectionBanners}
      data={data}
      loading={loading}
    />
  )
}
