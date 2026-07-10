import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"

import LoginPage from "../pages/LoginPage.jsx"
import HomePage from "../pages/HomePage.jsx"
import NotFoundPage from "../pages/NotFoundPage.jsx"

// Static content pages
import PublikasiPage from "../pages/Publikasi/PublikasiPage.jsx"
import MakroEkonomiPage from "../pages/MakroEkonomi/MakroEkonomiPage.jsx"
import IndustriPage from "../pages/Industri/IndustriPage.jsx"
import RegionalPage from "../pages/Regional/RegionalPage.jsx"
import DailyMarketPage from "../pages/DailyMarketDashboard/DailyMarketPage.jsx"
import OutlookForumPage from "../pages/OutlookForum/OutlookForumPage.jsx"
import MarketIntelligencePage from "../pages/MarketIntelligence/MarketIntelligencePage.jsx"

// Admin pages
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

/**
 * UserLayout — MainLayout + ProtectedRoute wrapper untuk content pages.
 * Menggunakan Outlet agar child routes dirender di dalamnya.
 */
function UserLayout() {
  return (
    <ProtectedRoute allowedRoles={USER_ROLES}>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </ProtectedRoute>
  )
}

const AppRoutes = () => {
  return (
    <BrowserRouter basename="/dev-mroe-fe">
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<LoginPage />} />

        {/* USER AREA — semua halaman user dibungkus UserLayout */}
        <Route element={<UserLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/publikasi" element={<PublikasiPage />} />
          <Route path="/makroekonomi" element={<MakroEkonomiPage />} />
          <Route path="/industry" element={<IndustriPage />} />
          <Route path="/regional" element={<RegionalPage />} />
          <Route path="/daily-market-dashboard" element={<DailyMarketPage />} />
          <Route path="/outlook-economic-forum" element={<OutlookForumPage />} />
          <Route path="/market-intelligence" element={<MarketIntelligencePage />} />
        </Route>

        {/* ADMIN AREA */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={ADMIN_ROLES}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="publikasi" element={<AdminPublikasi />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
