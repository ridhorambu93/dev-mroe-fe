import { createLocalRepository } from "../utils/localRepository"

const SEED = [
  { id: 1, title: "Daily Market - 01 Januari 2026",  category: "Daily Market", author: "Research Team", month: "Januari 2026",  file: "/files/daily-market-01-jan-2026.pdf" },
  { id: 2, title: "Daily Market - 02 Januari 2026",  category: "Daily Market", author: "Research Team", month: "Januari 2026",  file: "/files/daily-market-02-jan-2026.pdf" },
  { id: 3, title: "Daily Market - 01 Februari 2026", category: "Daily Market", author: "Research Team", month: "Februari 2026", file: "/files/daily-market-01-feb-2026.pdf" },
]

const repo = createLocalRepository("mroe:daily-market", SEED)

export const dailyMarketService = {
  // getAll: () => apiClient.get("/api/daily-market"),
  getAll: repo.getAll,
  getById: repo.getById,
  create: repo.create,
  update: repo.update,
  remove: repo.remove,
  reset: repo.reset,
}
