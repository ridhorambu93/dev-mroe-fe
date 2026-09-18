import { useEffect, useState } from "react"
import { publicationService } from "../../services/publicationService"
import { PAGE_CONFIGS } from "../../services/pageService"
import PublikasiLayout from "../../components/publications/PublikasiLayout"

const PAGE = PAGE_CONFIGS.find((p) => p.slug === "/publikasi")

export default function PublikasiPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    publicationService.getAll()
      .then((docs) => { if (active) setData(docs || []) })
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  return (
    <PublikasiLayout
      title="Publikasi"
      categories={PAGE.categories}
      gridCategories={PAGE.gridCategories}
      subsectionPeriods={PAGE.subsectionPeriods}
      data={data}
      loading={loading}
    />
  )
}
