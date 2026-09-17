import { useEffect, useState } from "react"
import { outlookForumService } from "../../services/outlookForumService"
import { PAGE_CONFIGS } from "../../services/pageService"
import PublikasiLayout from "../../components/publications/PublikasiLayout"

const PAGE = PAGE_CONFIGS.find((p) => p.slug === "/outlook-economic-forum")

export default function OutlookForumPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    outlookForumService.getAll()
      .then((docs) => { if (active) setData(docs || []) })
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  return (
    <PublikasiLayout
      title="Outlook Economic Forum"
      categories={PAGE.categories}
      gridCategories={PAGE.gridCategories}
      subsectionPeriods={PAGE.subsectionPeriods}
      data={data}
      loading={loading}
    />
  )
}
