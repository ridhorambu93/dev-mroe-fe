import { usePublications } from "../../hooks/usePublications"
import { dailyMarketService } from "../../services/dailyMarketService"
import PublikasiLayout from "../../components/publications/PublikasiLayout"

export default function DailyMarketDashboard() {
  const { data, loading } = usePublications(dailyMarketService.getAll)

  return (
    <PublikasiLayout title="Daily Market Dashboard" data={data} loading={loading} />
  )
}
