import { useEffect, useState } from "react"
import { makroEkonomiService } from "../../services/makroEkonomiService"
import { PAGE_CONFIGS } from "../../services/pageService"
import PublikasiLayout from "../../components/publications/PublikasiLayout"

const PAGE = PAGE_CONFIGS.find((p) => p.slug === "/makro-ekonomi")

export default function MakroEkonomiPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    makroEkonomiService.getAll()
      .then((docs) => { if (active) setData(docs || []) })
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  return (
    <PublikasiLayout
      title="Makro Ekonomi"
      categories={PAGE.categories}
      gridCategories={PAGE.gridCategories}
      subsectionPeriods={PAGE.subsectionPeriods}
      data={data}
      loading={loading}
    />
  )
}
