import { usePublications } from "../../hooks/usePublications"
import { industriService } from "../../services/industriService"
import PublikasiLayout from "../../components/publications/PublikasiLayout"
import industriBanner from "../../assets/images/industri/banner-industri-market-share.png"

export default function Industri() {
  const { data, loading } = usePublications(industriService.getAll)

  return (
    <PublikasiLayout title="Industri" banner={industriBanner} data={data} loading={loading} />
  )
}
