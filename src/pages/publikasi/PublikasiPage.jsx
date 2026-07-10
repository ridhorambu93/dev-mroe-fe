import { useEffect, useState } from "react"
import { publicationService } from "../../services/publicationService"
import PublikasiLayout from "../../components/publications/PublikasiLayout"

const CATEGORIES = ["Daily Economic", "Bjb Business Insight", "Lainnya"]
const GRID_CATEGORIES = ["Daily Economic"]

export default function PublikasiPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    publicationService.getAll().then((docs) => {
      if (!active) return
      setData(docs || [])
    }).finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  return (
    <PublikasiLayout
      title="Publikasi"
      banner={null}
      categories={CATEGORIES}
      gridCategories={GRID_CATEGORIES}
      data={data}
      loading={loading}
    />
  )
}
