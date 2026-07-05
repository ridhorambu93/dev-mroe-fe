import { BrowserRouter, Routes, Route } from "react-router-dom"

import LoginPage from "../pages/LoginPage.jsx"
import HomePage from "../pages/HomePage.jsx"
import AdminDashboard from "../pages/admin/AdminDashboard.jsx"
import AdminProfile from "../pages/admin/AdminProfile.jsx"

import Publikasi from "../pages/publikasi/Publikasi"
import Makroekonomi from "../pages/MakroEkonomi/MakroEkonomi.jsx"
import Industry from "../pages/Industri/Industri.jsx"
import Regional from "../pages/Regional/Regional.jsx"

import MainLayout from "../layouts/MainLayout.jsx"
import AdminLayout from "../layouts/AdminLayout.jsx"

import ProtectedRoute from "./ProtectedRoute.jsx"

const AppRoutes = () => {
  return (
    // <BrowserRouter>
    <BrowserRouter basename={import.meta.env.VITE_BASE_PATH || "/"}>
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

        <Route
          path="/publikasi"
          element={
            <ProtectedRoute allowedRole="{['USER', 'ADMIN']}">
              <MainLayout>
                <Publikasi />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/makroekonomi"
          element={
            <ProtectedRoute allowedRole="{['USER', 'ADMIN']}">
              <MainLayout>
                <Makroekonomi />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/industry"
          element={
            <ProtectedRoute allowedRole="{['USER', 'ADMIN']}">
              <MainLayout>
                <Industry />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/regional"
          element={
            <ProtectedRoute allowedRole="{['USER', 'ADMIN']}">
              <MainLayout>
                <Regional />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* ADMIN AREA */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="{['ADMIN']}">
              <AdminLayout />
            </ProtectedRoute>
          }>
          <Route index element={<AdminDashboard />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
