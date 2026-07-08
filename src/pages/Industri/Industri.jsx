import { usePublications } from "../../hooks/usePublications"
import { usePageConfig } from "../../hooks/usePageConfig"
import { industriService } from "../../services/industriService"
import PublikasiLayout from "../../components/publications/PublikasiLayout"
import fallbackBanner from "../../assets/images/industri/banner-industri-market-share.png"

export default function Industri() {
  const { data, loading } = usePublications(industriService.getAll)
  const { config } = usePageConfig("/industry")

  return (
    <PublikasiLayout
      title={config?.name || "Industri"}
      banner={config?.banner || fallbackBanner}
      categories={config?.categories}
      gridCategories={config?.gridCategories}
      data={data}
      loading={loading}
    />
  )
}
