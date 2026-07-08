import { useEffect, useState } from "react"
import { pageService } from "../services/pageService"
import { slugify } from "../utils/slugify"

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
      const sorted = [...pages].sort((a, b) => a.id - b.id)
      const built = sorted.map((page) => {
        const path = page.slug.startsWith("/") ? page.slug : "/" + page.slug
        const menu = { label: page.name, path }
        const showSubmenu = (page.layout === "default" || page.layout === "regional" || !page.layout)
          && page.categories && page.categories.length > 1
        if (showSubmenu) {
          menu.children = page.categories.map((cat) => ({ label: cat, tab: slugify(cat) }))
        }
        return menu
      })
      setMenus(built)
    })
    return () => { active = false }
  }, [])

  return menus
}
