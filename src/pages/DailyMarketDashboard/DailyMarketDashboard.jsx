import { usePublications } from "../../hooks/usePublications"
import { usePageConfig } from "../../hooks/usePageConfig"
import { dailyMarketService } from "../../services/dailyMarketService"
import PublikasiLayout from "../../components/publications/PublikasiLayout"

export default function DailyMarketDashboard() {
  const { data, loading } = usePublications(dailyMarketService.getAll)
  const { config } = usePageConfig("/daily-market-dashboard")

  return (
    <PublikasiLayout
      title={config?.name || "Daily Market Dashboard"}
      banner={config?.banner || null}
      categories={config?.categories}
      gridCategories={config?.gridCategories}
      data={data}
      loading={loading}
    />
  )
}
