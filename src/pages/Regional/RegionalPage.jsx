import { useEffect, useState } from "react"
import { regionalService } from "../../services/regionalService"
import { pageService } from "../../services/pageService"
import RegionalLayout from "../../components/publications/RegionalLayout"

const CATEGORIES = ["Mapping Ekonomi", "Pemetaan Sektoral Ekonomi & Kredit Perbankan"]

export default function RegionalPage() {
  const [data, setData] = useState([])
  const [pageConfig, setPageConfig] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    Promise.all([regionalService.getAll(), pageService.getAll()])
      .then(([docs, pages]) => {
        if (!active) return
        setData(docs || [])
        setPageConfig(pages.find((p) => p.slug === "/regional"))
      })
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  return (
    <RegionalLayout
      title="Regional"
      categories={CATEGORIES}
      subsectionPeriods={pageConfig?.subsectionPeriods}
      subsectionBanners={pageConfig?.subsectionBanners}
      data={data}
      loading={loading}
    />
  )
}
