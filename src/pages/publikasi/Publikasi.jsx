import { usePublications } from "../../hooks/usePublications"
import { publicationService } from "../../services/publicationService"
import PublikasiLayout from "../../components/publications/PublikasiLayout"
import publicationBanner from "../../assets/images/publikasi/publication-banner.png"

export default function Publikasi() {
  const { data, loading } = usePublications(publicationService.getAll)

  return (
    <PublikasiLayout title="Publikasi" banner={publicationBanner} data={data} loading={loading} />
  )
}
