// import { apiClient } from "../utils/apiClient"

const DUMMY = [
  { id: 1, title: "Daily Market - 01 Januari 2026",  category: "Daily Market", author: "Research Team", month: "Januari 2026",  file: "/files/daily-market-01-jan-2026.pdf" },
  { id: 2, title: "Daily Market - 02 Januari 2026",  category: "Daily Market", author: "Research Team", month: "Januari 2026",  file: "/files/daily-market-02-jan-2026.pdf" },
  { id: 3, title: "Daily Market - 01 Februari 2026", category: "Daily Market", author: "Research Team", month: "Februari 2026", file: "/files/daily-market-01-feb-2026.pdf" },
]

export const dailyMarketService = {
  // getAll: () => apiClient.get("/api/daily-market"),
  getAll: () => Promise.resolve(DUMMY),
}
