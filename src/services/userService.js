import { createLocalRepository } from "../utils/localRepository"

const SEED = [
  { id: 1, username: "admin",      fullName: "Administrator",  email: "admin@bankbjb.co.id",     role: "ADMIN", status: "Aktif" },
  { id: 2, username: "user_ridho", fullName: "Ridho Pratama",  email: "ridho@bankbjb.co.id",     role: "USER",  status: "Aktif" },
  { id: 3, username: "user_sinta", fullName: "Sinta Melati",   email: "sinta@bankbjb.co.id",     role: "USER",  status: "Aktif" },
  { id: 4, username: "user_arya",  fullName: "Arya Wibowo",    email: "arya@bankbjb.co.id",      role: "USER",  status: "Nonaktif" },
]

const repo = createLocalRepository("mroe:users", SEED)

export const userService = {
  // getAll: () => apiClient.get("/api/users"),
  getAll: repo.getAll,
  getById: repo.getById,
  create: repo.create,
  update: repo.update,
  remove: repo.remove,
  reset: repo.reset,
}
