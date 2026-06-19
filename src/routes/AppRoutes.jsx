import { BrowserRouter, Routes, Route } from "react-router-dom"

import LoginPage from "../pages/LoginPage"
import HomePage from "../pages/HomePage"
import AdminDashboard from "../pages/Admin/AdminDashboard"

import Publikasi from "../pages/publikasi/Publikasi"
import Makroekonomi from "../pages/MakroEkonomi/MakroEkonomi"
import Industry from "../pages/Industri/Industri"
import Regional from "../pages/Regional/Regional"

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
            <MainLayout>
              <Regional />
            </MainLayout>
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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
