import { useEffect, useState } from "react"
import { pageService } from "../services/pageService"

/**
 * useNavMenus
 * -----------
 * Fetch page configs dan build menu navbar secara dinamis.
 * Setiap page yang punya categories > 0 akan punya submenu (children).
 */
export function useNavMenus() {
  const [menus, setMenus] = useState([])

  useEffect(() => {
    let active = true
    pageService.getAll().then((pages) => {
      if (!active) return
      const built = pages.map((page) => {
        const menu = { label: page.name, path: page.slug }
        if (page.categories && page.categories.length > 0) {
          menu.children = page.categories.map((cat) => ({ label: cat, tab: cat }))
        }
        return menu
      })
      setMenus(built)
    })
    return () => { active = false }
  }, [])

  return menus
}
