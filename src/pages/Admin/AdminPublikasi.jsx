import { useState, useEffect, useMemo } from "react"
import HomeConfigEditor from "../../components/admin/HomeConfigEditor"
import PageManager from "../../components/admin/PageManager"
import ContentManager from "../../components/admin/ContentManager"
import { pageService } from "../../services/pageService"
import { serviceRegistry, REGIONAL_SLUGS } from "../../services/serviceRegistry"

const tabs = [
  { key: "beranda", label: "Beranda" },
  { key: "pages", label: "Halaman" },
  { key: "documents", label: "Dokumen" },
]

const MONTH_PLACEHOLDER = "Contoh: Januari 2026"

/**
 * Generate fields config berdasarkan page data.
 * Category options diambil langsung dari page.categories (dinamis).
 */
function buildFields(page) {
  const isRegional = REGIONAL_SLUGS.includes(page.slug)
  const categoryOptions = page.categories || []

  if (isRegional) {
    return [
      { name: "title", label: "Judul Kajian", type: "text", required: true, table: true },
      { name: "description", label: "Deskripsi", type: "textarea", required: true, table: true },
      { name: "category", label: "Kategori", type: "select", required: true, table: true, options: categoryOptions },
      { name: "quarter", label: "Triwulan", type: "select", required: true, table: true, options: ["Triwulan I", "Triwulan II", "Triwulan III", "Triwulan IV"] },
      { name: "year", label: "Tahun", type: "text", required: true, table: true, placeholder: "Contoh: 2026" },
      { name: "publishDate", label: "Tgl Publikasi", type: "text", placeholder: "Contoh: 15 Desember 2026" },
      { name: "author", label: "Penyusun", type: "text", required: true },
      { name: "file", label: "File (PDF)", type: "file" },
    ]
  }

  return [
    { name: "title", label: "Judul", type: "text", required: true, table: true },
    { name: "category", label: "Kategori", type: "select", required: true, table: true, options: categoryOptions },
    { name: "description", label: "Deskripsi", type: "text", table: false },
    { name: "month", label: "Periode", type: "text", required: true, table: true, placeholder: MONTH_PLACEHOLDER },
    { name: "author", label: "Penyusun", type: "text", required: true, table: true },
    { name: "file", label: "File (PDF)", type: "file" },
  ]
}

export default function AdminPublikasi() {
  const [activeTab, setActiveTab] = useState("beranda")
  const [pages, setPages] = useState([])
  const [activePage, setActivePage] = useState(null)

  // Fetch pages untuk tab Dokumen
  useEffect(() => {
    pageService.getAll().then((data) => {
      // Hanya tampilkan pages yang punya service terdaftar
      const registered = data.filter((p) => serviceRegistry[p.slug])
      setPages(registered)
      if (registered.length > 0 && !activePage) {
        setActivePage(registered[0].slug)
      }
    })
  }, [activeTab]) // re-fetch saat switch tab (supaya sync kalau admin baru edit page)

  const currentPage = useMemo(() => pages.find((p) => p.slug === activePage), [pages, activePage])
  const currentService = activePage ? serviceRegistry[activePage] : null
  const currentFields = currentPage ? buildFields(currentPage) : []

  return (
    <div className="space-y-6">
      {/* TAB SWITCH */}
      <div className="flex gap-2 border-b pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm rounded-t-lg transition ${
              activeTab === tab.key
                ? "bg-blue-600 text-white font-medium"
                : "bg-gray-100 text-slate-600 hover:bg-gray-200"
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* BERANDA CONFIG */}
      {activeTab === "beranda" && <HomeConfigEditor />}

      {/* PAGE MANAGER */}
      {activeTab === "pages" && <PageManager />}

      {/* DOCUMENT MANAGER — fully dynamic */}
      {activeTab === "documents" && (
        <div className="space-y-4">
          {/* Page selector */}
          <div className="flex flex-wrap gap-2">
            {pages.map((page) => (
              <button
                key={page.slug}
                onClick={() => setActivePage(page.slug)}
                className={`px-3 py-1.5 text-sm rounded-lg transition ${
                  activePage === page.slug
                    ? "bg-slate-800 text-white"
                    : "bg-gray-100 text-slate-600 hover:bg-gray-200"
                }`}>
                {page.name}
              </button>
            ))}
          </div>

          {currentPage && currentService && (
            <ContentManager
              key={currentPage.slug}
              title={currentPage.name}
              description={`Kelola dokumen yang tampil di halaman ${currentPage.name}. Kategori: ${(currentPage.categories || []).join(", ")}`}
              service={currentService}
              fields={currentFields}
            />
          )}

          {pages.length === 0 && (
            <div className="text-center text-slate-400 py-10">
              Belum ada halaman terdaftar. Tambahkan di tab "Halaman" terlebih dahulu.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
