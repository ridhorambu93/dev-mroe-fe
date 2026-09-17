import { useEffect, useState } from "react"
import { industriService } from "../../services/industriService"
import { PAGE_CONFIGS } from "../../services/pageService"
import PublikasiLayout from "../../components/publications/PublikasiLayout"

const PAGE = PAGE_CONFIGS.find((p) => p.slug === "/industri")

export default function IndustriPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    industriService.getAll()
      .then((docs) => { if (active) setData(docs || []) })
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  return (
    <PublikasiLayout
      title="Industri"
      categories={PAGE.categories}
      gridCategories={PAGE.gridCategories}
      subsectionPeriods={PAGE.subsectionPeriods}
      data={data}
      loading={loading}
    />
  )
}
