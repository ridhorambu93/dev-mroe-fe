import { useEffect, useState } from "react"
import { outlookForumService } from "../../services/outlookForumService"
import ForumLayout from "../../components/publications/ForumLayout"

// Gallery images untuk slider (isi dengan URL gambar sesungguhnya)
const GALLERY = []

// Pembicara / sections
const CATEGORIES = ["Pembicara 1", "Pembicara 2", "Pembicara 3"]

export default function OutlookForumPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    outlookForumService.getAll().then((docs) => {
      if (!active) return
      setData(docs || [])
    }).finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  // ForumLayout menerima config object (untuk gallery & categories)
  const config = {
    gallery: GALLERY,
    categories: CATEGORIES,
  }

  return (
    <ForumLayout
      title="Outlook Economic Forum"
      config={config}
      data={data}
      loading={loading}
    />
  )
}
