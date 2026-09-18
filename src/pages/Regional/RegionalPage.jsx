import { useEffect, useState } from "react"
import { regionalService } from "../../services/regionalService"
import { PAGE_CONFIGS } from "../../services/pageService"
import RegionalLayout from "../../components/publications/RegionalLayout"

const PAGE = PAGE_CONFIGS.find((p) => p.slug === "/regional")

export default function RegionalPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    regionalService.getAll()
      .then((docs) => { if (active) setData(docs || []) })
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  return (
    <RegionalLayout
      title="Regional"
      categories={PAGE.categories}
      subsectionPeriods={PAGE.subsectionPeriods}
      data={data}
      loading={loading}
    />
  )
}
