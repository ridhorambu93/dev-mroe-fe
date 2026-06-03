import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <nav className="space-y-2">
          <div className="p-2 hover:bg-gray-700 rounded">Dashboard</div>
          <div className="p-2 hover:bg-gray-700 rounded">Manage Dokumen</div>
          <div className="p-2 hover:bg-gray-700 rounded">Settings</div>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
