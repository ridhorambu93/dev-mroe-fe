import { usePublications } from "../../hooks/usePublications"
import { usePageConfig } from "../../hooks/usePageConfig"
import { regionalService } from "../../services/regionalService"
import RegionalLayout from "../../components/publications/RegionalLayout"

export default function Regional() {
  const { data, loading } = usePublications(regionalService.getAll)
  const { config } = usePageConfig("/regional")

  return (
    <RegionalLayout
      title={config?.name || "Regional"}
      categories={config?.categories}
      data={data}
      loading={loading}
    />
  )
}
