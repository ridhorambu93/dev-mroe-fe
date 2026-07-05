import { usePublications } from "../../hooks/usePublications"
import { makroEkonomiService } from "../../services/makroEkonomiService"
import PublikasiLayout from "../../components/publications/PublikasiLayout"
import makroEkonomiBanner from "../../assets/images/makro-ekonomi/banner-makro-ekonomi.png"

export default function MakroEkonomi() {
  const { data, loading } = usePublications(makroEkonomiService.getAll)

  return (
    <PublikasiLayout title="Makro Ekonomi" banner={makroEkonomiBanner} data={data} loading={loading} />
  )
}
