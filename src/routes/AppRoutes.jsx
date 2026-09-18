import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom"
import { useEffect, useRef } from "react"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

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
import UserProfilePage from "../pages/Profile/UserProfilePage.jsx"

// Admin pages
import AdminDashboard from "../pages/Admin/AdminDashboard.jsx"
import AdminDashboardNew from "../pages/Admin/AdminDashboardNew.jsx"
import AdminProfile from "../pages/Admin/AdminProfile.jsx"
import AdminPublikasi from "../pages/Admin/AdminPublikasi.jsx"
import AdminUsers from "../pages/Admin/AdminUsers.jsx"
import AdminSettings from "../pages/Admin/AdminSettings.jsx"
import AdminActivity from "../pages/Admin/AdminActivity.jsx"
import AdminFeedback from "../pages/Admin/AdminFeedback.jsx"

import MainLayout from "../layouts/MainLayout.jsx"
import AdminLayout from "../layouts/AdminLayout.jsx"
import ProtectedRoute from "./ProtectedRoute.jsx"

// Ganti AdminDashboardNew <-> AdminDashboard sesuai kebutuhan
const ActiveDashboard = AdminDashboardNew

NProgress.configure({ showSpinner: false, speed: 300, minimum: 0.1 })

function RouteProgressBar() {
  const location = useLocation()
  const prev = useRef(null)

  useEffect(() => {
    if (prev.current !== location.pathname) {
      NProgress.start()
      const t = setTimeout(() => NProgress.done(), 300)
      prev.current = location.pathname
      return () => clearTimeout(t)
    }
  }, [location])

  return null
}

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
      <RouteProgressBar />
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
          <Route path="/profile" element={<UserProfilePage />} />
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
          <Route index element={<ActiveDashboard />} />
          <Route path="publikasi" element={<AdminPublikasi />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="activity" element={<AdminActivity />} />
          <Route path="feedback" element={<AdminFeedback />} />
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
