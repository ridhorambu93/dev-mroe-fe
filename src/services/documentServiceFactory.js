import { createLocalRepository } from "../utils/localRepository"

const cache = {}

export function getDocumentService(slug) {
  if (!cache[slug]) {
    const key = `mroe:docs:${slug}`
    const repo = createLocalRepository(key, [])
    cache[slug] = {
      getAll: repo.getAll,
      getById: repo.getById,
      create: repo.create,
      update: repo.update,
      remove: repo.remove,
      reset: repo.reset,
    }
  }
  return cache[slug]
}
