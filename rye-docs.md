# 📘 Catatan Belajar Project BJB-MROE Frontend

> Catatan ini dibuat untuk memahami, meniru, dan memodifikasi project React ini step by step.

---

## 📋 Daftar Isi

1. [Overview Project](#1-overview-project)
2. [Tech Stack](#2-tech-stack)
3. [Struktur Folder](#3-struktur-folder)
4. [Alur Kerja Aplikasi](#4-alur-kerja-aplikasi)
5. [Step 1: Entry Point (main.jsx)](#5-step-1-entry-point)
6. [Step 2: Routing (AppRoutes.jsx)](#6-step-2-routing)
7. [Step 3: Layout System](#7-step-3-layout-system)
8. [Step 4: Autentikasi (AuthContext)](#8-step-4-autentikasi)
9. [Step 5: Protected Route](#9-step-5-protected-route)
10. [Step 6: Service Layer (API)](#10-step-6-service-layer)
11. [Step 7: Halaman (Pages)](#11-step-7-halaman)
12. [Step 8: Komponen Reusable](#12-step-8-komponen-reusable)
13. [Step 9: Styling dengan Tailwind](#13-step-9-styling-dengan-tailwind)
14. [Step 10: Cara Menambah Fitur Baru](#14-step-10-cara-menambah-fitur-baru)
15. [Tips & Pola yang Dipakai](#15-tips--pola-yang-dipakai)

---

## 1. Overview Project

Project ini adalah website **Research and Office of Economist bank bjb (MROE)**.
Fitur utama:
- Login dengan role (USER / ADMIN)
- Halaman beranda dengan data indikator & publikasi
- Halaman publikasi dengan filter tab & search
- Dashboard admin
- Beberapa halaman kategori (Makroekonomi, Industri, Regional, dll)

---

## 2. Tech Stack

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| React | ^19.2.6 | Library UI |
| React Router DOM | ^7.16.0 | Routing SPA |
| Vite | ^8.0.12 | Build tool & dev server |
| Tailwind CSS | ^3.4.17 | Utility-first CSS |
| PostCSS | ^8.5.15 | CSS processor |
| ESLint | ^10.3.0 | Linter kode |

---

## 3. Struktur Folder

```
src/
├── assets/          → Gambar, CSS statis
├── components/      → Komponen reusable (Navbar, Footer, Button, dll)
│   ├── home/        → Komponen khusus halaman home
│   ├── login/       → Komponen khusus halaman login
│   ├── navbar/      → Sub-komponen navbar
│   └── publications/→ Komponen khusus publikasi
├── hooks/           → Custom hooks (belum dipakai)
├── layouts/         → Layout wrapper (MainLayout, AdminLayout)
├── pages/           → Halaman-halaman utama
│   ├── Admin/
│   ├── publikasi/
│   ├── MakroEkonomi/
│   └── ...
├── routes/          → Konfigurasi routing & guard
├── services/        → Layer untuk fetch data (API calls)
├── store/           → State management (Context API)
├── utils/           → Fungsi helper/utility
├── App.jsx          → Root component
├── main.jsx         → Entry point aplikasi
└── index.css        → Global CSS + Tailwind directives
```

**Pola penamaan:**
- Folder → `camelCase` atau `PascalCase`
- File komponen → `PascalCase.jsx` (contoh: `HomePage.jsx`)
- File service/util → `camelCase.js` (contoh: `publicationService.js`)

---

## 4. Alur Kerja Aplikasi

```
Browser Request
    ↓
index.html → load main.jsx
    ↓
main.jsx → render <AuthProvider> + <AppRoutes>
    ↓
AppRoutes.jsx → tentukan halaman berdasarkan URL
    ↓
ProtectedRoute → cek apakah user sudah login
    ↓
MainLayout → bungkus halaman dengan Navbar + Footer
    ↓
Page Component → render konten halaman
    ↓
Service Layer → ambil data (saat ini dummy, nanti dari API)
```

---

## 5. Step 1: Entry Point

**File: `src/main.jsx`**

```jsx
import React from "react"
import ReactDOM from "react-dom/client"
import AppRoutes from "./routes/AppRoutes"
import { AuthProvider } from "./store/AuthContext"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>,
)
```

**Penjelasan:**
- `ReactDOM.createRoot` → mount React ke elemen `#root` di `index.html`
- `React.StrictMode` → mode development untuk deteksi masalah
- `AuthProvider` → membungkus seluruh app agar semua komponen bisa akses data user
- `AppRoutes` → komponen yang mengatur semua routing
- `import "./index.css"` → load Tailwind CSS

**Yang perlu diingat:**
- Provider (seperti AuthProvider) HARUS membungkus komponen yang butuh datanya
- Urutan: Provider di luar, Routes di dalam

---

## 6. Step 2: Routing

**File: `src/routes/AppRoutes.jsx`**

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman login tanpa layout */}
        <Route path="/" element={<LoginPage />} />

        {/* Halaman dengan layout + proteksi */}
        <Route path="/home" element={
          <ProtectedRoute allowedRole="...">
            <MainLayout>
              <HomePage />
            </MainLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}
```

**Penjelasan:**
- `BrowserRouter` → mengaktifkan routing berbasis URL
- `Routes` → container untuk semua `Route`
- `Route` → mapping antara URL path dan komponen yang dirender
- Pola nesting: `ProtectedRoute > MainLayout > Page`

**Cara menambah halaman baru:**
1. Buat file page di `src/pages/NamaPage.jsx`
2. Import di `AppRoutes.jsx`
3. Tambah `<Route path="/url" element={...} />`

---

## 7. Step 3: Layout System

**File: `src/layouts/MainLayout.jsx`**

```jsx
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
```

**Penjelasan:**
- Layout adalah "bingkai" yang membungkus halaman
- `{ children }` → props khusus React, isinya adalah komponen yang dibungkus
- `min-h-screen flex flex-col` → buat layout full-height
- `flex-1` pada main → konten mengisi sisa ruang (footer tetap di bawah)

**Kapan pakai layout:**
- Kalau beberapa halaman punya struktur sama (navbar + footer)
- Buat layout terpisah untuk area berbeda (MainLayout vs AdminLayout)

---

## 8. Step 4: Autentikasi

**File: `src/store/AuthContext.jsx`**

```jsx
import { createContext, useContext, useState } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : null
  })

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
```

**Penjelasan:**
- `createContext()` → membuat "wadah" data global
- `AuthProvider` → komponen yang menyediakan data ke seluruh app
- `useState(() => ...)` → lazy initialization, baca localStorage saat pertama render
- `login()` → simpan user ke state + localStorage
- `logout()` → hapus user dari state + localStorage
- `useAuth()` → custom hook untuk akses data auth dari komponen manapun

**Cara pakai di komponen:**
```jsx
const { user, login, logout } = useAuth()
```

**Kenapa pakai localStorage:**
- Agar user tetap login walau refresh browser
- Data persist sampai di-logout manual

---

## 9. Step 5: Protected Route

**File: `src/routes/ProtectedRoute.jsx`**

```jsx
import { Navigate } from "react-router-dom"
import { useAuth } from "../store/AuthContext"

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user } = useAuth()

  // Belum login → redirect ke login
  if (!user) {
    return <Navigate to="/" replace />
  }

  // Role tidak sesuai → redirect ke home
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/home" replace />
  }

  return children
}
```

**Penjelasan:**
- Komponen "penjaga" yang mengecek apakah user boleh akses halaman
- Jika belum login → paksa ke halaman login
- Jika role tidak cocok → redirect ke home
- Jika lolos → render halaman (children)

**Pola penggunaan:**
```jsx
<ProtectedRoute allowedRoles={["ADMIN"]}>
  <AdminPage />
</ProtectedRoute>
```

---

## 10. Step 6: Service Layer

**File: `src/services/indicatorService.js`**

```jsx
export const getIndicators = async () => {
  return {
    image: "/images/indicator-placeholder.png",
  }
}
```

**File: `src/services/publicationService.js`**

```jsx
export const publicationService = {
  async getPublications(params = {}) {
    const { search = "" } = params
    const data = [ /* dummy data */ ]
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    )
    return filtered
  },
}
```

**Penjelasan:**
- Service layer = tempat semua logic pengambilan data
- Saat ini menggunakan data dummy, nanti tinggal ganti dengan `fetch()` atau `axios`
- Memisahkan data logic dari UI logic (separation of concerns)

**Cara migrasi ke API asli nanti:**
```jsx
export const getIndicators = async () => {
  const response = await fetch("https://api.example.com/indicators")
  return response.json()
}
```

**Kenapa dipisah:**
- Komponen tidak perlu tahu data datang dari mana
- Mudah ganti sumber data tanpa ubah komponen
- Mudah di-mock untuk testing

---

## 11. Step 7: Halaman (Pages)

**File: `src/pages/HomePage.jsx`**

Pola umum halaman:
```jsx
const HomePage = () => {
  // 1. State
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 2. Fetch data saat mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const result = await getIndicators()
        setData(result)
      } catch (err) {
        setError("Gagal memuat data")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // 3. Conditional rendering
  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  // 4. Render UI
  return (
    <div>
      {/* konten halaman */}
    </div>
  )
}

export default HomePage
```

**Penjelasan pola:**
1. **State** → menyimpan data, status loading, dan error
2. **useEffect** → dipanggil sekali saat komponen pertama kali muncul (`[]` = mount only)
3. **try/catch/finally** → handle sukses, error, dan selesai loading
4. **Conditional rendering** → tampilkan UI berbeda berdasarkan state
5. **Return JSX** → render tampilan utama

---

## 12. Step 8: Komponen Reusable

**Navbar (`src/components/Navbar.jsx`):**
- Menampilkan menu navigasi
- Dropdown untuk sub-menu (Publikasi)
- Dropdown profil user dengan logout
- Responsive: hidden di mobile, flex di desktop (`hidden lg:flex`)

**Footer (`src/components/Footer.jsx`):**
- Komponen sederhana tanpa state
- Hanya menampilkan info statis

**Pola membuat komponen reusable:**
```jsx
// Komponen dengan props
const Button = ({ label, onClick, variant = "primary" }) => {
  const styles = {
    primary: "bg-blue-600 text-white",
    secondary: "bg-gray-200 text-black",
  }

  return (
    <button className={`px-4 py-2 rounded ${styles[variant]}`} onClick={onClick}>
      {label}
    </button>
  )
}
```

**Kapan buat komponen terpisah:**
- Dipakai di lebih dari 1 tempat
- Logicnya kompleks dan perlu diisolasi
- Untuk menjaga file tetap pendek dan mudah dibaca

---

## 13. Step 9: Styling dengan Tailwind

**Setup:** File `src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Konfigurasi:** File `tailwind.config.js`
```js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

**Cheatsheet class yang sering dipakai di project ini:**

| Class | Fungsi |
|-------|--------|
| `max-w-6xl mx-auto` | Container dengan max-width + center |
| `px-6 py-10` | Padding horizontal & vertical |
| `flex flex-col` | Flexbox vertikal |
| `grid grid-cols-3 gap-5` | Grid 3 kolom dengan gap |
| `text-slate-800` | Warna teks |
| `bg-[#00549F]` | Background custom color |
| `rounded-lg` | Border radius |
| `border` | Border 1px |
| `font-semibold` | Font weight |
| `text-sm` | Font size small |
| `mb-4` | Margin bottom |
| `min-h-screen` | Minimal tinggi = viewport |
| `hidden lg:flex` | Responsive: hidden di mobile, flex di desktop |

---

## 14. Step 10: Cara Menambah Fitur Baru

### Contoh: Menambah halaman "Market Intelligence"

**Langkah 1: Buat service**
```jsx
// src/services/marketIntelligenceService.js
export const getMarketData = async () => {
  // nanti ganti dengan API call
  return [
    { id: 1, title: "Market Report Q1", date: "2026-01-01" }
  ]
}
```

**Langkah 2: Buat page**
```jsx
// src/pages/MarketIntelligence/MarketIntelligence.jsx
import { useEffect, useState } from "react"
import { getMarketData } from "../../services/marketIntelligenceService"

const MarketIntelligence = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const result = await getMarketData()
        setData(result)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <p className="text-center py-20">Loading...</p>

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold text-slate-800 mb-6">
        Market Intelligence
      </h1>

      <div className="grid grid-cols-3 gap-5">
        {data.map((item) => (
          <div key={item.id} className="border rounded-md bg-white p-4">
            <h3 className="text-sm">{item.title}</h3>
            <p className="text-xs text-slate-500">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MarketIntelligence
```

**Langkah 3: Daftarkan route**
```jsx
// Di AppRoutes.jsx, tambahkan:
import MarketIntelligence from "../pages/MarketIntelligence/MarketIntelligence"

<Route path="/market-intelligence" element={
  <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
    <MainLayout>
      <MarketIntelligence />
    </MainLayout>
  </ProtectedRoute>
} />
```

**Langkah 4: Tambah ke navbar (opsional)**
Menu sudah ada di array `menus` di Navbar.jsx

---

## 15. Tips & Pola yang Dipakai

### Pola State Management
```
Sederhana (1 komponen) → useState
Sharing antar komponen → Context API (AuthContext)
Kompleks/besar        → Redux / Zustand (belum dipakai)
```

### Pola Fetch Data
```
useEffect + async function + try/catch/finally
Selalu handle: loading, error, dan success state
```

### Pola Conditional Rendering
```jsx
{loading && <Loading />}
{error && <Error />}
{data.length === 0 ? <Empty /> : <DataList />}
```

### Pola Export
```jsx
// Default export (1 per file, untuk komponen utama)
export default HomePage

// Named export (bisa banyak, untuk service/utils)
export const getIndicators = async () => { ... }
export const useAuth = () => useContext(AuthContext)
```

### Pola Props
```jsx
// Destructuring di parameter
const Component = ({ title, onClick, variant = "primary" }) => { ... }

// Children pattern (untuk wrapper/layout)
const Layout = ({ children }) => <div>{children}</div>
```

### Checklist Sebelum Push Code
- [ ] Tidak ada error di console browser
- [ ] Tidak ada warning ESLint (`npm run lint`)
- [ ] Halaman bisa diakses sesuai role
- [ ] Loading state ditampilkan
- [ ] Error state di-handle
- [ ] Responsive di mobile (minimal tidak berantakan)

---

## 🔑 Ringkasan Alur untuk Meniru

```
1. Setup project    → npm create vite@latest → install tailwind + react-router
2. Buat struktur    → folders: components, pages, routes, services, store, layouts
3. Setup routing    → BrowserRouter + Routes + Route
4. Buat layout      → MainLayout (Navbar + children + Footer)
5. Buat auth        → AuthContext + ProtectedRoute
6. Buat service     → fungsi async yang return data
7. Buat page        → useState + useEffect + conditional render
8. Buat komponen    → pecah UI jadi bagian kecil reusable
9. Styling          → Tailwind utility classes
10. Test & deploy   → npm run build
```

---

Selamat belajar! 🚀 Mulai dari memahami alur, lalu coba modifikasi kecil (misal ubah teks/warna), lalu coba tambah halaman baru sendiri.
