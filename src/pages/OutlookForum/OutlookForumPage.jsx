import { useEffect, useState } from "react"
import { outlookForumService } from "../../services/outlookForumService"
import ForumLayout from "../../components/publications/ForumLayout"

export default function OutlookForumPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const[error, setError] = useState(null)

  useEffect(() => {
    let active = true
    
    outlookForumService.getAll()
      .then((docs) => { if (active) setData(docs || []) })
        .catch((err) => {
          if (active) setError(err.message)})
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  return (
    <ForumLayout
      title="Outlook Economic Forum"
      data={data}
      loading={loading}
      error={error}
    />
  )
}
