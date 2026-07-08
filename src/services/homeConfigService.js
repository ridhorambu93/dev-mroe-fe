import { createLocalRepository } from "../utils/localRepository"

/**
 * homeConfigService
 * -----------------
 * Mengelola konten dinamis halaman Beranda.
 * Hanya ada 1 record (id: 1) yang di-update admin.
 * Nanti ganti ke: apiClient.get("/api/home-config") / apiClient.put(...)
 */
const SEED = [
  {
    id: 1,
    welcomeText: "Selamat datang di situs Research and Office of Economist bank bjb",
    indicatorImage: "", // admin upload via ImageUpload
    indicatorTitle: "Data Indikator",
  },
]

const repo = createLocalRepository("mroe:homeConfig", SEED)

export const homeConfigService = {
  getAll: repo.getAll,
  getConfig: async () => {
    const all = await repo.getAll()
    return all[0] || SEED[0]
  },
  update: (data) => repo.update(1, data),
  reset: repo.reset,
}
