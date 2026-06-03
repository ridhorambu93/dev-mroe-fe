import { BrowserRouter, Routes, Route } from "react-router-dom"

import LoginPage from "../pages/LoginPage"
import HomePage from "../pages/HomePage"
import AdminDashboard from "../pages/admin/AdminDashboard"

import MainLayout from "../layouts/MainLayout"
import AdminLayout from "../layouts/AdminLayout"

import ProtectedRoute from "./ProtectedRoute"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<LoginPage />} />

        {/* USER AREA */}
        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRole="{['USER', 'ADMIN']}">
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
            <ProtectedRoute allowedRole="{['ADMIN']}">
              <MainLayout>
                <AdminLayout />
              </MainLayout>
            </ProtectedRoute>
          }>
          <Route index element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
