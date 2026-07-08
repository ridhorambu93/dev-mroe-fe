import { BrowserRouter, Routes, Route } from "react-router-dom"

import LoginPage from "../pages/LoginPage.jsx"
import HomePage from "../pages/HomePage.jsx"
import DynamicPage from "../pages/DynamicPage.jsx"

import AdminDashboard from "../pages/Admin/AdminDashboard.jsx"
import AdminProfile from "../pages/Admin/AdminProfile.jsx"
import AdminPublikasi from "../pages/Admin/AdminPublikasi.jsx"
import AdminUsers from "../pages/Admin/AdminUsers.jsx"
import AdminSettings from "../pages/Admin/AdminSettings.jsx"

import MainLayout from "../layouts/MainLayout.jsx"
import AdminLayout from "../layouts/AdminLayout.jsx"

import ProtectedRoute from "./ProtectedRoute.jsx"

const USER_ROLES = ["USER", "ADMIN"]
const ADMIN_ROLES = ["ADMIN"]

const AppRoutes = () => {
  return (
    <BrowserRouter basename="/dev-mroe-fe">
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<LoginPage />} />

        {/* USER AREA */}
        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={USER_ROLES}>
              <MainLayout>
                <HomePage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* ADMIN AREA */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <AdminLayout />
            </ProtectedRoute>
          }>
          <Route index element={<AdminDashboard />} />
          <Route path="publikasi" element={<AdminPublikasi />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* DYNAMIC PAGES — catch-all for all publication pages */}
        <Route
          path="/*"
          element={
            <ProtectedRoute allowedRoles={USER_ROLES}>
              <MainLayout>
                <DynamicPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
