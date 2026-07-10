import { useEffect, useState } from "react"
import { publicationService } from "../../services/publicationService"
import { pageService } from "../../services/pageService"
import PublikasiLayout from "../../components/publications/PublikasiLayout"

const CATEGORIES = ["Daily Economic", "Bjb Business Insight", "Lainnya"]
const GRID_CATEGORIES = ["Daily Economic"]

export default function PublikasiPage() {
  const [data, setData] = useState([])
  const [pageConfig, setPageConfig] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    Promise.all([publicationService.getAll(), pageService.getAll()])
      .then(([docs, pages]) => {
        if (!active) return
        setData(docs || [])
        const found = pages.find((p) => p.slug === "/publikasi")
        // console.log("[PublikasiPage] pages:", pages?.length, "found:", found?.name, "banners:", found?.subsectionBanners)
        setPageConfig(found)
      })
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  return (
    <PublikasiLayout
      title="Publikasi"
      categories={CATEGORIES}
      gridCategories={GRID_CATEGORIES}
      subsectionPeriods={pageConfig?.subsectionPeriods}
      subsectionBanners={pageConfig?.subsectionBanners}
      data={data}
      loading={loading}
    />
  )
}
