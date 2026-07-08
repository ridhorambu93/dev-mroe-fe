import { usePublications } from "../../hooks/usePublications"
import { usePageConfig } from "../../hooks/usePageConfig"
import { makroEkonomiService } from "../../services/makroEkonomiService"
import PublikasiLayout from "../../components/publications/PublikasiLayout"
import fallbackBanner from "../../assets/images/makro-ekonomi/banner-makro-ekonomi.png"

export default function MakroEkonomi() {
  const { data, loading } = usePublications(makroEkonomiService.getAll)
  const { config } = usePageConfig("/makroekonomi")

  return (
    <PublikasiLayout
      title={config?.name || "Makro Ekonomi"}
      banner={config?.banner || fallbackBanner}
      categories={config?.categories}
      gridCategories={config?.gridCategories}
      data={data}
      loading={loading}
    />
  )
}
