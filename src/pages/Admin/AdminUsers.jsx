import ContentManager from "../../components/admin/ContentManager"
import { userService } from "../../services/userService"

const userFields = [
  { name: "username", label: "Username", type: "text", required: true, table: true },
  { name: "fullName", label: "Nama Lengkap", type: "text", required: true, table: true },
  { name: "email", label: "Email", type: "email", required: true, table: true },
  { name: "role", label: "Role", type: "select", required: true, table: true, options: ["ADMIN", "USER"] },
  { name: "status", label: "Status", type: "select", required: true, table: true, options: ["Aktif", "Nonaktif"] },
]

export default function AdminUsers() {
  return (
    <ContentManager
      title="Users"
      description="Kelola akun pengguna platform MROE."
      service={userService}
      fields={userFields}
    />
  )
}
