import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { pageService } from "../services/pageService"
import { getServiceForSlug, REGIONAL_SLUGS } from "../services/serviceRegistry"
import { usePublications } from "../hooks/usePublications"
import PublikasiLayout from "../components/publications/PublikasiLayout"
import RegionalLayout from "../components/publications/RegionalLayout"
import ForumLayout from "../components/publications/ForumLayout"

export default function DynamicPage() {
  const location = useLocation()
  const slug = location.pathname

  const [config, setConfig] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [service, setService] = useState(null)

  useEffect(() => {
    pageService.getAll().then((pages) => {
      const found = pages.find((p) => {
        const pageSlug = p.slug.startsWith("/") ? p.slug : "/" + p.slug
        return pageSlug === slug
      })
      if (found) {
        setConfig(found)
        setService(getServiceForSlug(found.slug))
        setNotFound(false)
      } else {
        setNotFound(true)
      }
    })
  }, [slug])

  if (notFound) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">404</h1>
        <p className="text-slate-500">Halaman tidak ditemukan</p>
      </div>
    )
  }

  if (!config || !service) {
    return (
      <div className="p-10 text-center">
        <p className="text-slate-400">Memuat...</p>
      </div>
    )
  }

  return <DynamicContent config={config} service={service} />
}

function DynamicContent({ config, service }) {
  const { data, loading } = usePublications(service.getAll)

  // Determine layout type
  const layoutType = config.layout || (REGIONAL_SLUGS.includes(config.slug) ? "regional" : "default")

  if (layoutType === "forum") {
    return (
      <ForumLayout
        title={config.name}
        config={config}
        data={data}
        loading={loading}
      />
    )
  }

  if (layoutType === "regional") {
    return (
      <RegionalLayout
        title={config.name}
        banner={config.banner || null}
        categories={config.categories}
        data={data}
        loading={loading}
      />
    )
  }

  return (
    <PublikasiLayout
      title={config.name}
      banner={config.banner || null}
      categories={config.categories}
      gridCategories={config.gridCategories}
      data={data}
      loading={loading}
    />
  )
}
