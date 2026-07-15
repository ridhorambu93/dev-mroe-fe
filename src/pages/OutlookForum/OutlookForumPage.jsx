import { useEffect, useState } from "react"
import { outlookForumService } from "../../services/outlookForumService"
import { pageService } from "../../services/pageService"
import PublikasiLayout from "../../components/publications/PublikasiLayout"

const CATEGORIES = ["Materi"]

export default function OutlookForumPage() {
  const [data, setData] = useState([])
  const [pageConfig, setPageConfig] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    Promise.all([outlookForumService.getAll(), pageService.getAll()])
      .then(([docs, pages]) => {
        if (!active) return
        setData(docs || [])
        setPageConfig(pages.find((p) => p.slug === "/outlook-economic-forum"))
      })
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  return (
    <PublikasiLayout
      title="Outlook Economic Forum"
      categories={CATEGORIES}
      gridCategories={[]}
      subsectionPeriods={pageConfig?.subsectionPeriods}
      subsectionBanners={pageConfig?.subsectionBanners}
      data={data}
      loading={loading}
    />
  )
}
