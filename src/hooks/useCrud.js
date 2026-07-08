import { useCallback, useEffect, useState } from "react"

/**
 * useCrud
 * -------
 * Hook generik untuk mengelola state CRUD terhadap sebuah service yang punya
 * kontrak: getAll(), create(data), update(id, data), remove(id).
 *
 * Karena semua service (baik localRepository maupun apiClient nanti) memakai
 * kontrak yang sama, hook ini tidak perlu diubah saat backend siap.
 *
 * @param {object} service - service dengan method getAll/create/update/remove
 */
export function useCrud(service) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await service.getAll()
      setData(Array.isArray(res) ? res : [])
    } catch (err) {
      console.error(err)
      setError(err.message || "Gagal memuat data")
      setData([])
    } finally {
      setLoading(false)
    }
  }, [service])

  useEffect(() => {
    // Fetch data awal saat mount / saat service berganti — perilaku yang memang diinginkan.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData()
  }, [fetchData])

  const create = useCallback(
    async (payload) => {
      setSaving(true)
      try {
        await service.create(payload)
        await fetchData()
      } finally {
        setSaving(false)
      }
    },
    [service, fetchData],
  )

  const update = useCallback(
    async (id, payload) => {
      setSaving(true)
      try {
        await service.update(id, payload)
        await fetchData()
      } finally {
        setSaving(false)
      }
    },
    [service, fetchData],
  )

  const remove = useCallback(
    async (id) => {
      setSaving(true)
      try {
        await service.remove(id)
        await fetchData()
      } finally {
        setSaving(false)
      }
    },
    [service, fetchData],
  )

  return { data, loading, error, saving, refetch: fetchData, create, update, remove }
}
