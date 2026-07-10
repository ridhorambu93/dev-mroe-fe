import { Link } from "react-router-dom"

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-slate-200 mb-2">404</h1>
      <h2 className="text-xl font-semibold text-slate-700 mb-2">Halaman Tidak Ditemukan</h2>
      <p className="text-slate-500 mb-6">
        Halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
      </p>
      <Link
        to="/home"
        className="px-5 py-2.5 bg-[#00549F] text-white rounded-lg text-sm font-medium hover:bg-[#004080] transition"
      >
        Kembali ke Beranda
      </Link>
    </div>
  )
}
