import { usePublications } from "../../hooks/usePublications"
import { regionalService } from "../../services/regionalService"
import RegionalLayout from "../../components/publications/RegionalLayout"

export default function Regional() {
  const { data, loading } = usePublications(regionalService.getAll)

  return <RegionalLayout title="Regional" data={data} loading={loading} />
}
