import { ChevronLeft, ChevronRight } from "lucide-react"

/**
 * Pagination
 * Props: currentPage, totalPages, onPageChange
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...")
    }
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed">
        <ChevronLeft size={16} />
      </button>

      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`dots-${i}`} className="px-2 text-sm text-slate-400">...</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 text-sm rounded-lg transition ${
              currentPage === page
                ? "bg-blue-600 text-white font-medium"
                : "hover:bg-gray-100 text-slate-600"
            }`}>
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed">
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
