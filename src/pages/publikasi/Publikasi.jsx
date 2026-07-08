import { usePublications } from "../../hooks/usePublications"
import { usePageConfig } from "../../hooks/usePageConfig"
import { publicationService } from "../../services/publicationService"
import PublikasiLayout from "../../components/publications/PublikasiLayout"
import fallbackBanner from "../../assets/images/publikasi/publication-banner.png"

export default function Publikasi() {
  const { data, loading } = usePublications(publicationService.getAll)
  const { config } = usePageConfig("/publikasi")

  return (
    <PublikasiLayout
      title={config?.name || "Publikasi"}
      banner={config?.banner || fallbackBanner}
      categories={config?.categories}
      gridCategories={config?.gridCategories}
      data={data}
      loading={loading}
    />
  )
}
