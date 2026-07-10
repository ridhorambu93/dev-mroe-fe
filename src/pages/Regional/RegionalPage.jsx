import { useEffect, useState } from "react"
import { regionalService } from "../../services/regionalService"
import RegionalLayout from "../../components/publications/RegionalLayout"

const CATEGORIES = ["Mapping Ekonomi", "Pemetaan Sektoral Ekonomi & Kredit Perbankan"]

export default function RegionalPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    regionalService.getAll().then((docs) => {
      if (!active) return
      setData(docs || [])
    }).finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  return (
    <RegionalLayout
      title="Regional"
      banner={null}
      categories={CATEGORIES}
      data={data}
      loading={loading}
    />
  )
}
