import { useCallback, useEffect, useState } from "react"

/**
 * Custom hook untuk fetch data publikasi dari service apapun.
 * @param {Function} serviceFn - fungsi async dari service, contoh: makroEkonomiService.getAll
 */
export function usePublications(serviceFn) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await serviceFn()
      setData(Array.isArray(res) ? res : [])
    } catch (err) {
      console.error(err)
      setError(err.message || "Gagal memuat data")
      setData([])
    } finally {
      setLoading(false)
    }
  }, [serviceFn])

  useEffect(() => {
    // Fetch data awal saat mount — perilaku yang memang diinginkan.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
