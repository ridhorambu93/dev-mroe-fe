import { useEffect, useState } from "react"
import { makroEkonomiService } from "../../services/makroEkonomiService"
import PublikasiLayout from "../../components/publications/PublikasiLayout"

const CATEGORIES = ["Macro brief", "Ekonomi Makro"]
const GRID_CATEGORIES = ["Macro brief", "Ekonomi Makro"]

export default function MakroEkonomiPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    makroEkonomiService.getAll().then((docs) => {
      if (!active) return
      setData(docs || [])
    }).finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  return (
    <PublikasiLayout
      title="Makro Ekonomi"
      banner={null}
      categories={CATEGORIES}
      gridCategories={GRID_CATEGORIES}
      data={data}
      loading={loading}
    />
  )
}
