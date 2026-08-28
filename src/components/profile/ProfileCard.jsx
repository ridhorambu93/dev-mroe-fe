import { useProfile } from "../../hooks/useProfile"

const FIELDS = [
  { key: "username", label: "Username" },
  { key: "fullName", label: "Nama Lengkap" },
  { key: "email", label: "Email" },
  { key: "divisi", label: "Divisi" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
  {
    key: "createdAt", label: "Terdaftar Sejak",
    format: (v) => v ? new Date(v).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-"
  },
]

export default function ProfileCard() {
  const { profile, loading, error } = useProfile()

  if (loading) {
    return (
      <div className="max-w-2xl space-y-4 animate-pulse">
        <div className="h-24 bg-gray-100 rounded-xl" />
        <div className="h-64 bg-gray-100 rounded-xl" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl bg-red-50 border border-red-200 rounded-xl p-6 text-center animate-fade-in">
        <p className="text-red-600 font-medium mb-1">Gagal memuat profil</p>
        <p className="text-sm text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl animate-fade-in-up">
      <div className="bg-white rounded-xl border p-6">
        {/* AVATAR */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-[#00549F] rounded-full flex items-center justify-center text-2xl font-bold text-white shrink-0">
            {(profile?.fullName || profile?.username || "U").charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              {profile?.fullName || profile?.username}
            </h3>
            <p className="text-sm text-slate-500">{profile?.divisi || "-"}</p>
            <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full font-medium ${
              profile?.role === "ADMIN" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
            }`}>
              {profile?.role}
            </span>
          </div>
        </div>

        {/* DETAIL */}
        <div className="divide-y">
          {FIELDS.map((field) => (
            <div key={field.key} className="flex items-center py-3 gap-4">
              <span className="text-sm text-slate-500 w-36 shrink-0">{field.label}</span>
              <span className="text-sm text-slate-800 font-medium">
                {field.format ? field.format(profile?.[field.key]) : (profile?.[field.key] || "-")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
