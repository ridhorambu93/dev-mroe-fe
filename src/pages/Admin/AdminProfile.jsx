import { useState } from "react"
import { useAuth } from "../../store/AuthContext"

const AdminProfile = () => {
  const { user, login } = useAuth()

  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    fullName: user?.fullName || "",
    phone: user?.phone || "",
  })

  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    // Update user di context & localStorage
    const updatedUser = { ...user, ...form }
    login(updatedUser)
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Profil Admin</h2>

      {/* AVATAR & INFO */}
      <div className="bg-white rounded-xl border p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
            {user?.username?.charAt(0).toUpperCase() || "A"}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              {user?.fullName || user?.username}
            </h3>
            <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
              {user?.role}
            </span>
          </div>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full border rounded-lg px-4 py-2 text-sm ${
                editing ? "bg-white" : "bg-gray-50 text-slate-500"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              disabled={!editing}
              placeholder={editing ? "Masukkan nama lengkap" : "-"}
              className={`w-full border rounded-lg px-4 py-2 text-sm ${
                editing ? "bg-white" : "bg-gray-50 text-slate-500"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={!editing}
              placeholder={editing ? "Masukkan email" : "-"}
              className={`w-full border rounded-lg px-4 py-2 text-sm ${
                editing ? "bg-white" : "bg-gray-50 text-slate-500"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              No. Telepon
            </label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              disabled={!editing}
              placeholder={editing ? "Masukkan no. telepon" : "-"}
              className={`w-full border rounded-lg px-4 py-2 text-sm ${
                editing ? "bg-white" : "bg-gray-50 text-slate-500"
              }`}
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex items-center gap-3">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
            >
              Edit Profil
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
              >
                Simpan
              </button>
              <button
                onClick={() => {
                  setEditing(false)
                  setForm({
                    username: user?.username || "",
                    email: user?.email || "",
                    fullName: user?.fullName || "",
                    phone: user?.phone || "",
                  })
                }}
                className="px-4 py-2 bg-gray-200 text-slate-700 text-sm rounded-lg hover:bg-gray-300 transition"
              >
                Batal
              </button>
            </>
          )}

          {saved && (
            <span className="text-sm text-green-600">✓ Profil berhasil disimpan</span>
          )}
        </div>
      </div>

      {/* SECURITY SECTION */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="font-semibold text-slate-800 mb-4">Keamanan</h3>
        <button className="px-4 py-2 border border-slate-300 text-sm rounded-lg text-slate-700 hover:bg-gray-50 transition">
          Ubah Password
        </button>
        <p className="text-xs text-slate-400 mt-2">
          Terakhir diubah: belum pernah
        </p>
      </div>
    </div>
  )
}

export default AdminProfile
