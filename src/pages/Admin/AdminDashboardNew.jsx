import { useState } from "react"
import {
  Eye,
  Download,
  MessageSquare,
  Star,
  TrendingUp,
  TrendingDown,
  ChevronRight,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// ── dummy data ──────────────────────────────────────────────
const YEARS = [2022, 2023, 2024, 2025, 2026]
const MONTHS = ["Semua Bulan", "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"]
const CATEGORIES = ["Semua Kategori", "Panduan", "Laporan", "Infografis", "Dokumen Teknis", "Profil"]

const trendData = [
  { bulan: "Jan", kunjungan: 8200, unduhan: 3100 },
  { bulan: "Feb", kunjungan: 9500, unduhan: 3800 },
  { bulan: "Mar", kunjungan: 11000, unduhan: 4200 },
  { bulan: "Apr", kunjungan: 13400, unduhan: 5100 },
  { bulan: "Mei", kunjungan: 15200, unduhan: 6300 },
  { bulan: "Jun", kunjungan: 17800, unduhan: 7200 },
  { bulan: "Jul", kunjungan: 21000, unduhan: 8900 },
  { bulan: "Ags", kunjungan: 23500, unduhan: 9800 },
  { bulan: "Sep", kunjungan: 25100, unduhan: 10500 },
  { bulan: "Okt", kunjungan: 26800, unduhan: 11200 },
  { bulan: "Nov", kunjungan: 27900, unduhan: 12100 },
  { bulan: "Des", kunjungan: 28430, unduhan: 12921 },
]

const topKontenKunjungan = [
  { judul: "Panduan Layanan Publik", value: 38420 },
  { judul: "Laporan Kinerja 2026", value: 28350 },
  { judul: "Infografis APBN", value: 25114 },
  { judul: "Pedoman Teknis", value: 18921 },
  { judul: "Profil Organisasi", value: 14205 },
]

const topKontenUnduhan = [
  { judul: "Laporan Kinerja 2026", value: 10921 },
  { judul: "Panduan Layanan Publik", value: 12580 },
  { judul: "Infografis APBN", value: 8430 },
  { judul: "Pedoman Teknis", value: 7114 },
  { judul: "Profil Organisasi", value: 5876 },
]

const feedbackDistribusi = [
  { label: "5★", value: 45.3, color: "#0ea5e9" },
  { label: "4★", value: 28.1, color: "#38bdf8" },
  { label: "3★", value: 15.6, color: "#fbbf24" },
  { label: "2★", value: 7.8, color: "#f97316" },
  { label: "1★", value: 3.5, color: "#ef4444" },
]

const feedbackTerbaru = [
  { id: 1, pengirim: "Budi Santoso", inisial: "B", komentar: "Materi sangat membantu, mudah dipahami!", konten: "Panduan Layanan Publik", rating: 4, tanggal: "10 Mar 2026" },
  { id: 2, pengirim: "Siti Rahma", inisial: "S", komentar: "Mohon ditambahkan contoh kasus nyata.", konten: "Pedoman Teknis", rating: 3, tanggal: "9 Mar 2026" },
  { id: 3, pengirim: "Ahmad Ridwan", inisial: "A", komentar: "Sangat informatif dan lengkap.", konten: "Laporan Kinerja 2026", rating: 5, tanggal: "9 Mar 2026" },
  { id: 4, pengirim: "Dewi Lestari", inisial: "D", komentar: "Tampilan infografisnya menarik!", konten: "Infografis APBN", rating: 4, tanggal: "8 Mar 2026" },
  { id: 5, pengirim: "Rizky Pratama", inisial: "R", komentar: "Akan lebih baik jika tersedia versi video.", konten: "Profil Organisasi", rating: 4, tanggal: "8 Mar 2026" },
]

const kinerjaKonten = [
  { no: 1, judul: "Panduan Layanan Publik", kategori: "Panduan", kunjungan: 38420, unduhan: 12580, rating: 4.6, feedback: 412 },
  { no: 2, judul: "Laporan Kinerja 2026", kategori: "Laporan", kunjungan: 28350, unduhan: 10921, rating: 4.4, feedback: 368 },
  { no: 3, judul: "Infografis APBN", kategori: "Infografis", kunjungan: 25114, unduhan: 8430, rating: 4.3, feedback: 301 },
  { no: 4, judul: "Pedoman Teknis", kategori: "Dokumen Teknis", kunjungan: 18921, unduhan: 7114, rating: 4.1, feedback: 225 },
  { no: 5, judul: "Profil Organisasi", kategori: "Profil", kunjungan: 14205, unduhan: 5876, rating: 4.0, feedback: 198 },
]
// ────────────────────────────────────────────────────────────

const AVATAR_COLORS = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-red-500"]

const StarRating = ({ value }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star key={s} size={14} className={s <= value ? "fill-yellow-400 text-yellow-400" : "text-slate-200 fill-slate-200"} />
    ))}
  </div>
)

const StatCard = ({ icon: Icon, label, value, pct, up }) => (
  <div className="bg-white rounded-xl border p-5 flex items-center gap-4">
    <div className="bg-teal-50 text-teal-600 rounded-xl p-3">
      <Icon size={22} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
      <p className={`text-xs flex items-center gap-1 mt-0.5 ${up ? "text-emerald-600" : "text-red-500"}`}>
        {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {pct} dibanding periode sebelumnya
      </p>
    </div>
  </div>
)

const AdminDashboardNew = () => {
  const [activeYear, setActiveYear] = useState(2026)
  const [periode, setPeriode] = useState("Semua Bulan")
  const [kategori, setKategori] = useState("Semua Kategori")
  const [topTab, setTopTab] = useState("kunjungan")
  const [searchKinerja, setSearchKinerja] = useState("")

  const topData = topTab === "kunjungan" ? topKontenKunjungan : topKontenUnduhan
  const maxTop = topData[0]?.value ?? 1

  const filteredKinerja = kinerjaKonten.filter((k) =>
    k.judul.toLowerCase().includes(searchKinerja.toLowerCase())
  )

  const now = new Date()
  const dateStr = now.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
  const timeStr = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB"

  return (
    <div className="space-y-6 text-sm">
      {/* HEADER */}
      <div className="flex items-start justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Dashboard Monitoring</h2>
          <p className="text-slate-500 text-xs mt-0.5">Pantau performa publikasi dan kualitas feedback untuk mendukung penyebaran informasi yang lebih baik.</p>
        </div>
        <div className="text-right text-xs text-slate-500">
          <p className="font-medium text-slate-700">{dateStr}</p>
          <p>{timeStr}</p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-slate-500 font-medium">Tahun</span>
        <div className="flex gap-1">
          {YEARS.map((y) => (
            <button
              key={y}
              onClick={() => setActiveYear(y)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${activeYear === y ? "bg-teal-600 text-white" : "bg-white border text-slate-600 hover:bg-slate-50"}`}
            >
              {y}
            </button>
          ))}
        </div>
        <span className="text-slate-500 font-medium ml-2">Periode</span>
        <select value={periode} onChange={(e) => setPeriode(e.target.value)} className="border rounded-lg px-3 py-1.5 text-xs text-slate-700 bg-white">
          {MONTHS.map((m) => <option key={m}>{m}</option>)}
        </select>
        <span className="text-slate-500 font-medium">Kategori Konten</span>
        <select value={kategori} onChange={(e) => setKategori(e.target.value)} className="border rounded-lg px-3 py-1.5 text-xs text-slate-700 bg-white">
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <button className="ml-auto flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-1.5 rounded-lg text-xs font-medium transition">
          <Download size={14} /> Export Laporan
        </button>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Eye} label="Total Kunjungan" value="125.430" pct="▲ 12,5%" up />
        <StatCard icon={Download} label="Total Unduhan" value="48.921" pct="▲ 18,7%" up />
        <StatCard icon={MessageSquare} label="Total Feedback" value="2.358" pct="▲ 26,4%" up />
        <StatCard icon={Star} label="Rating Rata-rata" value="4,3 / 5" pct="▲ 6,7%" up />
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* TREN */}
        <div className="lg:col-span-1 bg-white rounded-xl border p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Tren Kunjungan & Unduhan</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trendData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="bulan" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip formatter={(v) => v.toLocaleString("id-ID")} />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="kunjungan" stroke="#0ea5e9" strokeWidth={2} dot={false} name="Kunjungan" />
              <Line type="monotone" dataKey="unduhan" stroke="#10b981" strokeWidth={2} dot={false} name="Unduhan" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* TOP KONTEN */}
        <div className="bg-white rounded-xl border p-5">
          <h3 className="font-semibold text-slate-800 mb-3">Top Konten Terpopuler</h3>
          <div className="flex gap-2 mb-4">
            {["kunjungan", "unduhan"].map((t) => (
              <button
                key={t}
                onClick={() => setTopTab(t)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition capitalize ${topTab === t ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                Berdasarkan {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {topData.map((item) => (
              <div key={item.judul}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-700 truncate max-w-[160px]">{item.judul}</span>
                  <span className="text-slate-500 font-medium">{item.value.toLocaleString("id-ID")}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: `${(item.value / maxTop) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DISTRIBUSI FEEDBACK */}
        <div className="bg-white rounded-xl border p-5">
          <h3 className="font-semibold text-slate-800 mb-3">Distribusi Feedback</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie data={feedbackDistribusi} dataKey="value" cx="50%" cy="50%" innerRadius={35} outerRadius={55}>
                  {feedbackDistribusi.map((entry) => (
                    <Cell key={entry.label} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 flex-1">
              {feedbackDistribusi.map((item) => (
                <div key={item.label} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: item.color }} />
                    <span className="text-slate-600">{item.label}</span>
                  </div>
                  <span className="text-slate-500">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-xs text-slate-400 mt-2">2.358 Total Feedback</p>
        </div>
      </div>

      {/* FEEDBACK TERBARU */}
      <div className="bg-white rounded-xl border p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-800">Feedback Terbaru</h3>
          <button className="text-teal-600 text-xs flex items-center gap-1 hover:underline">
            Lihat Semua <ChevronRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b text-left text-slate-500">
                <th className="pb-2 font-medium">Pengirim</th>
                <th className="pb-2 font-medium">Komentar</th>
                <th className="pb-2 font-medium">Konten</th>
                <th className="pb-2 font-medium">Rating</th>
                <th className="pb-2 font-medium">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {feedbackTerbaru.map((fb, i) => (
                <tr key={fb.id} className="border-b last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                        {fb.inisial}
                      </span>
                      <span className="text-slate-700 font-medium whitespace-nowrap">{fb.pengirim}</span>
                    </div>
                  </td>
                  <td className="py-3 text-slate-500 max-w-[240px] truncate">{fb.komentar}</td>
                  <td className="py-3 text-slate-600 whitespace-nowrap">{fb.konten}</td>
                  <td className="py-3"><StarRating value={fb.rating} /></td>
                  <td className="py-3 text-slate-400 whitespace-nowrap">{fb.tanggal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* KINERJA KONTEN */}
      <div className="bg-white rounded-xl border p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="font-semibold text-slate-800">Kinerja Konten</h3>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Cari judul konten..."
              value={searchKinerja}
              onChange={(e) => setSearchKinerja(e.target.value)}
              className="border rounded-lg px-3 py-1.5 text-xs text-slate-700 w-48"
            />
            <select className="border rounded-lg px-3 py-1.5 text-xs text-slate-700 bg-white">
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select className="border rounded-lg px-3 py-1.5 text-xs text-slate-700 bg-white">
              <option>Urutkan</option>
              <option>Kunjungan</option>
              <option>Unduhan</option>
              <option>Rating</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b text-left text-slate-500">
                <th className="pb-2 font-medium w-8">No</th>
                <th className="pb-2 font-medium">Judul Konten</th>
                <th className="pb-2 font-medium">Kategori</th>
                <th className="pb-2 font-medium">Kunjungan</th>
                <th className="pb-2 font-medium">Unduhan</th>
                <th className="pb-2 font-medium">Rating</th>
                <th className="pb-2 font-medium">Jumlah Feedback</th>
                <th className="pb-2 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredKinerja.map((item) => (
                <tr key={item.no} className="border-b last:border-0">
                  <td className="py-3 text-slate-400">{item.no}</td>
                  <td className="py-3 font-medium text-slate-700">{item.judul}</td>
                  <td className="py-3 text-slate-500">{item.kategori}</td>
                  <td className="py-3 text-slate-600">{item.kunjungan.toLocaleString("id-ID")}</td>
                  <td className="py-3 text-slate-600">{item.unduhan.toLocaleString("id-ID")}</td>
                  <td className="py-3">
                    <span className="flex items-center gap-1">
                      <Star size={12} className="fill-yellow-400 text-yellow-400" />
                      {item.rating}
                    </span>
                  </td>
                  <td className="py-3 text-slate-600">{item.feedback}</td>
                  <td className="py-3">
                    <button className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition text-xs">
                      Lihat Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardNew
