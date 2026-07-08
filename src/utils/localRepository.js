/**
 * localRepository
 * ----------------
 * Repository CRUD sederhana berbasis localStorage yang meniru perilaku REST API
 * (semua method mengembalikan Promise). Dipakai sementara selama backend Golang
 * belum siap, sehingga data yang ditamb/diubah admin langsung tampil di sisi user.
 *
 * Saat API siap, cukup ganti implementasi service (getAll/create/update/remove)
 * dengan pemanggilan apiClient — kontrak fungsinya sudah sama.
 *
 * @param {string} key    - key localStorage unik per domain (mis. "mroe:publikasi")
 * @param {Array}  seed   - data awal jika localStorage masih kosong
 */
export function createLocalRepository(key, seed = []) {
  const read = () => {
    try {
      const raw = localStorage.getItem(key)
      if (raw) return JSON.parse(raw)
    } catch {
      // abaikan data korup, fallback ke seed
    }
    // seeding pertama kali
    localStorage.setItem(key, JSON.stringify(seed))
    return [...seed]
  }

  const write = (rows) => {
    localStorage.setItem(key, JSON.stringify(rows))
    return rows
  }

  const nextId = (rows) =>
    rows.reduce((max, row) => Math.max(max, Number(row.id) || 0), 0) + 1

  // Sedikit delay agar UI loading state terasa natural & mirip request jaringan
  const delay = (value) => new Promise((resolve) => setTimeout(() => resolve(value), 120))

  return {
    getAll: () => delay(read()),

    getById: (id) => delay(read().find((row) => String(row.id) === String(id)) || null),

    create: (payload) => {
      const rows = read()
      const record = { ...payload, id: nextId(rows) }
      write([record, ...rows])
      return delay(record)
    },

    update: (id, payload) => {
      const rows = read()
      let updated = null
      const next = rows.map((row) => {
        if (String(row.id) === String(id)) {
          updated = { ...row, ...payload, id: row.id }
          return updated
        }
        return row
      })
      write(next)
      return delay(updated)
    },

    remove: (id) => {
      const rows = read()
      write(rows.filter((row) => String(row.id) !== String(id)))
      return delay({ id })
    },

    /** reset ke data seed (berguna untuk tombol "Reset data" / debugging) */
    reset: () => delay(write([...seed])),
  }
}
