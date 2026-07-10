import { createLocalRepository } from "../utils/localRepository"

const SEED = []

const repo = createLocalRepository("mroe:outlook-forum", SEED)

export const outlookForumService = {
  // getAll: () => apiClient.get("/api/outlook-forum"),
  getAll: repo.getAll,
  getById: repo.getById,
  create: repo.create,
  update: repo.update,
  remove: repo.remove,
  reset: repo.reset,
}
