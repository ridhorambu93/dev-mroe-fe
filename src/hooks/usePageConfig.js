import { useEffect, useState } from "react"
import { pageService } from "../services/pageService"

/**
 * usePageConfig
 * -------------
 * Fetch konfigurasi halaman (title, banner, categories) berdasarkan slug.
 * Nanti saat API siap, pageService.getAll() diganti ke API call — hook ini tidak perlu diubah.
 */
export function usePageConfig(slug) {
  const [config, setConfig] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    pageService.getAll().then((pages) => {
      if (!active) return
      const found = pages.find((p) => p.slug === slug)
      setConfig(found || null)
      setLoading(false)
    })
    return () => { active = false }
  }, [slug])

  return { config, loading }
}
