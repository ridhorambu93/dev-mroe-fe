import { createLocalRepository } from "../utils/localRepository"

const SEED = []

const repo = createLocalRepository("mroe:market-intelligence", SEED)

export const marketIntelligenceService = {
  // getAll: () => apiClient.get("/api/market-intelligence"),
  getAll: repo.getAll,
  getById: repo.getById,
  create: repo.create,
  update: repo.update,
  remove: repo.remove,
  reset: repo.reset,
}
