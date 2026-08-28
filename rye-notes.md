# rye-notes — Catatan Implementasi React (bjb-mroe-fe)

## Stack
- React 19 + Vite
- React Router DOM v7
- Tailwind CSS v3
- react-icons (FaFilePdf)
- lucide-react (ChevronUp/Down, Plus, Pencil, Trash2, dll)
- pdf-lib (client-side PDF watermarking)
- sonner (toast notifications)
- Backend: **Golang REST API** (Gin + GORM + PostgreSQL)

## Toast & Animasi

### Toast — sonner
- Global `<Toaster>` dipasang di `App.jsx`
- Pakai di mana saja: `import { toast } from "sonner"`
- `toast.success("...")` / `toast.error("...")` / `toast.loading("...")`
- Tidak perlu state lokal untuk toast lagi

### Animasi — Tailwind custom keyframes
Didefinisikan di `tailwind.config.js`:

| Class | Efek | Dipakai di |
|-------|------|------------|
| `animate-fade-in` | Fade in 0.3s | LoginPage, MainLayout content |
| `animate-fade-in-up` | Fade + slide up 0.4s | LoginForm, HomePage sections |
| `animate-slide-in-left` | Slide dari kiri 0.35s | Admin sidebar |

Staggered delay pakai inline style: `style={{ animationDelay: "0.1s" }}`

---

### Login (LoginForm.jsx)
1. Hit `POST /api/auth/login` via `apiClient`
2. Backend return `{ success, message, data: { token, user } }`
3. Token disimpan di `localStorage["token"]`, user di `localStorage["user"]`
4. Navigate berdasarkan `user.role`: `ADMIN` → `/admin`, `USER` → `/home`
5. **Fallback**: kalau backend tidak jalan → fallback ke `userService` (localStorage)

### AuthContext
- `login(userData, token)` — simpan user + token
- `logout()` — hapus user + token dari localStorage
- `user.fullName` + `user.divisi` dipakai untuk watermark PDF

### apiClient (src/utils/apiClient.js)
- Auto-attach `Authorization: Bearer {token}` dari localStorage
- Base URL dari `VITE_API_BASE_URL` di `.env.local`
- Response shape dari backend: `{ success, message, data }`
- Error message diambil dari `json.message` (bukan statusText)

---

## Backend (bjb-mroe-be)

### Stack
- Go 1.26 + Gin + GORM + PostgreSQL
- JWT (golang-jwt/jwt v5)
- bcrypt (golang.org/x/crypto)
- godotenv

### Struktur
```
bjb-mroe-be/
├── cmd/main.go              ← entry point
├── config/config.go         ← load .env
├── database/
│   ├── database.go          ← koneksi GORM
│   └── migrate.go           ← auto migrate
├── internal/
│   ├── dto/auth.go          ← LoginRequest, RegisterRequest
│   ├── handler/
│   │   ├── auth.go          ← Login, Me
│   │   ├── document.go      ← CRUD dokumen
│   │   └── user.go          ← CRUD user
│   ├── middleware/
│   │   ├── auth.go          ← JWT guard + RequireRole
│   │   └── cors.go          ← CORS
│   ├── model/
│   │   ├── base.go          ← UUID + timestamps
│   │   ├── user.go
│   │   ├── document.go
│   │   └── page.go
│   └── router/router.go     ← semua routes
└── pkg/
    ├── hash/hash.go         ← bcrypt
    ├── jwt/jwt.go           ← generate & validate
    └── response/response.go ← standard response helper
```

### Endpoints
| Method | Path | Auth | Keterangan |
|--------|------|------|------------|
| POST | /api/auth/login | - | Login |
| GET | /api/auth/me | ✓ | Data user login |
| GET | /api/documents?slug= | ✓ | List dokumen |
| POST | /api/documents | ADMIN | Buat dokumen |
| PUT | /api/documents/:id | ADMIN | Update dokumen |
| DELETE | /api/documents/:id | ADMIN | Hapus dokumen |
| GET | /api/users | ADMIN | List user |
| POST | /api/users | ADMIN | Buat user |
| PUT | /api/users/:id | ADMIN | Update user |
| DELETE | /api/users/:id | ADMIN | Hapus user |

### Run backend
```bash
cd bjb-mroe-be
# Buat database PostgreSQL: bjb_mroe
go run cmd/main.go
```

### .env backend
```
APP_ENV=development
APP_PORT=8080
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=bjb_mroe
JWT_SECRET=your-secret
JWT_EXPIRY_HOURS=24
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

---

```
┌─────────────────────────────────────────────────────────────┐
│  ADMIN PANEL (/admin/publikasi)                             │
│  ┌─────────┐  ┌──────────┐  ┌───────────┐                  │
│  │ Beranda │  │ Halaman  │  │  Dokumen  │                  │
│  │ Config  │  │ (CRUD)   │  │  (CRUD)   │                  │
│  └────┬────┘  └────┬─────┘  └─────┬─────┘                  │
└───────┼─────────────┼──────────────┼────────────────────────┘
        │             │              │
        ▼             ▼              ▼
  homeConfigService  pageService   getServiceForSlug(slug)
        │             │              │
        ▼             ▼              ▼
   localStorage    localStorage   localStorage (per slug)
        │             │              │
        ▼             ▼              ▼
┌───────┼─────────────┼──────────────┼────────────────────────┐
│  USER PAGES                                                  │
│  HomePage ← homeConfigService                                │
│  Navbar   ← useNavMenus() ← pageService                     │
│  /*       ← DynamicPage ← pageService + getServiceForSlug   │
└──────────────────────────────────────────────────────────────┘
```

---

## Alur Data (Data Flow)

```
pageService.getAll()
    ↓
useNavMenus()         → Navbar (menu + submenu dinamis)
usePageConfig(slug)   → title, banner, categories, layout
    ↓
getServiceForSlug(slug)
    ↓
  ┌─ registeredServices[slug]     (service khusus dgn seed data)
  └─ documentServiceFactory(slug) (generic, localStorage kosong)
    ↓
usePublications(service.getAll)
    ↓
DynamicPage → render layout sesuai config.layout:
  ├─ "default"  → PublikasiLayout
  ├─ "regional" → RegionalLayout
  └─ "forum"    → ForumLayout
```

---

## Konsep Utama: Semua Dinamis dari 1 Sumber

### pageService (src/services/pageService.js)

Satu-satunya sumber kebenaran untuk semua halaman. Setiap page punya:

```js
{
  id: 1,
  name: "Publikasi",           // Judul halaman + label navbar
  slug: "/publikasi",          // URL path
  banner: "data:image/...",    // Hero image (base64 dari upload)
  categories: ["Daily Economic", "bjb Business Insight", "Lainnya"],
  gridCategories: ["Daily Economic"],  // Kategori yg pakai grid layout
  layout: "default",           // "default" | "regional" | "forum"
  gallery: [],                 // Array URL gambar (untuk layout forum)
}
```

**Efek perubahan page config:**
| Yang berubah | Efek otomatis |
|---|---|
| `name` | Navbar label + page title |
| `slug` | URL route + navbar link |
| `categories` | Navbar submenu + tab filter + dropdown form admin |
| `gridCategories` | Layout grid vs list per tab |
| `banner` | Hero image di halaman user |
| `layout` | Tipe layout yang dirender |
| `gallery` | Slider images (forum) |

---

## 3 Tipe Layout

### 1. Default (PublikasiLayout)
- Tabs filter (dari categories)
- Search "Temukan dokumen"
- Accordion: Tahun → Bulan → dokumen
- Per tab bisa grid ATAU list-row (ditentukan `gridCategories`)
- **Grid**: icon PDF + judul + unduh (4 kolom)
- **List-row**: Judul | Deskripsi | Tgl | Penyusun | Lihat | Unduh

### 2. Regional (RegionalLayout)
- Tabs filter
- Search "Temukan dokumen"
- Accordion: Tahun → Triwulan → list-row dokumen

### 3. Forum (ForumLayout)
- Image slider (auto-slide + prev/next + dots)
- Section "Materi" (garis kuning)
- Per pembicara: flat list dokumen
- Di bawah semua pembicara: Accordion Tahun → Triwulan → list-row

---

## Dynamic Routing (Catch-All)

```jsx
// AppRoutes.jsx
<Route path="/*" element={<DynamicPage />} />
```

`DynamicPage` flow:
1. Ambil `location.pathname` (misal `/outlook-economic-forum`)
2. Fetch semua pages dari `pageService`
3. Cari page yang slug-nya match
4. Kalau ketemu → render layout sesuai `config.layout`
5. Kalau tidak → tampilkan 404

**Admin tambah halaman baru → langsung bisa diakses tanpa ubah kode.**

---

## Service Registry & Factory

```js
// src/services/serviceRegistry.js
const registeredServices = {
  "/publikasi": publicationService,      // punya seed data
  "/makroekonomi": makroEkonomiService,
  "/industry": industriService,
  "/regional": regionalService,
  "/daily-market-dashboard": dailyMarketService,
}

export function getServiceForSlug(slug) {
  return registeredServices[slug] || getDocumentService(slug)
  //                                  ↑ generic factory (localStorage kosong)
}
```

```js
// src/services/documentServiceFactory.js
export function getDocumentService(slug) {
  // Buat localStorage repo dengan key "mroe:docs:{slug}"
  // Return: { getAll, create, update, remove }
}
```

Halaman baru yang dibuat admin otomatis dapat service dari factory.

---

## Admin Panel

### Struktur
```
/admin
├── Dashboard        → stats + recent docs + "Reset Semua Data"
├── Kelola Konten    → 3 sub-tab:
│   ├── Beranda      → welcome text, indicator image
│   ├── Halaman      → CRUD page config (nama, slug, layout, banner, gallery, categories)
│   └── Dokumen      → CRUD dokumen per halaman (fields dinamis sesuai layout)
├── Users            → CRUD user
├── Profil
└── Settings
```

### Tab "Halaman" (PageManager)
Form fields:
- Nama Halaman *
- Slug / URL Path * (auto-prepend `/`)
- Tipe Layout (dropdown: Default, Regional, Forum)
- Kategori / Tab * (koma-separated)
- Kategori Layout Grid (hanya untuk layout default)
- Banner / Hero Image (upload, hanya untuk non-forum)
- Gallery / Slider Images (multiple upload, hanya untuk forum)

### Tab "Dokumen" (ContentManager)
Fields dinamis berdasarkan `page.layout`:

**Default:**
| Field | Type |
|---|---|
| Judul | text |
| Kategori | select (dari page.categories) |
| Deskripsi | text |
| Periode | text ("Januari 2026") |
| Penyusun | text |
| File PDF | file upload |

**Regional:**
| Field | Type |
|---|---|
| Judul Kajian | text |
| Deskripsi | textarea |
| Kategori | select |
| Triwulan | select (I-IV) |
| Tahun | text |
| Tgl Publikasi | text |
| Penyusun | text |
| File PDF | file upload |

**Forum:**
| Field | Type |
|---|---|
| Judul Materi | text |
| Pembicara / Section | select (dari page.categories) |
| Deskripsi | text |
| Triwulan | select (I-IV) |
| Tahun | text |
| Tgl Publikasi | text |
| Penyusun | text |
| File PDF | file upload |

---

## Upload System

### uploadService (src/services/uploadService.js)
- **Image**: simpan base64 di localStorage (bisa preview)
- **PDF**: generate URL simulasi `#preview:nama-file.pdf` (tidak simpan content)

### Komponen
- `ImageUpload.jsx` — drag & drop, preview, validasi (PNG/JPG/WebP/SVG, max 5MB)
- `FileUpload.jsx` — drag & drop, validasi (PDF, max 20MB)

### Integrasi API nanti:
```js
upload: (file) => {
  const formData = new FormData()
  formData.append("file", file)
  return apiClient.post("/api/uploads", formData)
  // Return: { url: "https://server.com/uploads/file.pdf" }
}
```

---

## Navbar Dinamis (useNavMenus)

```js
pageService.getAll() → sort by id ASC → build menus:
- Submenu muncul jika: layout "default"/"regional" + categories > 1
- Layout "forum" atau categories ≤ 1 → no submenu
- Tab param di URL pakai slug: /publikasi?tab=daily-economic (bukan nama lengkap)
```

### slugify utility
```js
"Pemetaan Sektoral Ekonomi & Kredit Perbankan"
  → "pemetaan-sektoral-ekonomi-kredit-perbankan"
```

---

## localStorage Repository (createLocalRepository)

```js
// src/utils/localRepository.js
createLocalRepository("mroe:publikasi", SEED)
// Return: { getAll, getById, create, update, remove, reset }
```

- Seed data hanya di-write kalau key belum ada di localStorage
- Semua method return Promise (simulasi async)
- Delay 120ms supaya loading state terasa natural
- `reset()` → kembalikan ke SEED awal

---

## Pagination (admin)

`ContentManager` pakai `PAGE_SIZE = 10`:
- Nomor urut sesuai halaman: `(currentPage - 1) * PAGE_SIZE + index + 1`
- Reset ke page 1 saat search berubah
- Komponen `Pagination.jsx` reusable (prev/next + page numbers + dots)

---

## Hooks

| Hook | Fungsi |
|---|---|
| `usePublications(serviceFn)` | Fetch data + loading/error state |
| `useCrud(service)` | Full CRUD state (data, create, update, remove, saving) |
| `usePageConfig(slug)` | Fetch page config by slug |
| `useNavMenus()` | Build navbar menus dari pageService |

---

## Struktur Folder (Updated)

```
src/
├── utils/
│   ├── apiClient.js              ← HTTP client terpusat
│   ├── localRepository.js        ← localStorage CRUD factory
│   └── slugify.js                ← URL-friendly slug generator
├── hooks/
│   ├── usePublications.js        ← fetch data hook
│   ├── useCrud.js                ← CRUD state hook
│   ├── usePageConfig.js          ← page config by slug
│   └── useNavMenus.js            ← dynamic navbar menus
├── services/
│   ├── pageService.js            ← CRUD halaman (sumber kebenaran)
│   ├── homeConfigService.js      ← config beranda
│   ├── uploadService.js          ← upload file (image/PDF)
│   ├── serviceRegistry.js        ← slug → service mapping
│   ├── documentServiceFactory.js ← generic service per slug
│   ├── publicationService.js     ← dokumen publikasi (seed)
│   ├── makroEkonomiService.js
│   ├── industriService.js
│   ├── regionalService.js
│   ├── dailyMarketService.js
│   └── userService.js
├── components/
│   ├── Navbar.jsx                ← dynamic menus + profile dropdown
│   ├── Footer.jsx
│   ├── publications/
│   │   ├── PublikasiLayout.jsx   ← layout default (grid/list + accordion)
│   │   ├── RegionalLayout.jsx    ← layout regional (triwulan)
│   │   └── ForumLayout.jsx       ← layout forum (slider + pembicara + accordion)
│   └── admin/
│       ├── ContentManager.jsx    ← CRUD table generik + pagination
│       ├── PageManager.jsx       ← CRUD halaman (layout, gallery, categories)
│       ├── HomeConfigEditor.jsx  ← edit beranda
│       ├── FormModal.jsx         ← form generik (text/select/textarea/image/file)
│       ├── ImageUpload.jsx       ← drag & drop image
│       ├── FileUpload.jsx        ← drag & drop PDF
│       ├── Pagination.jsx        ← reusable pagination
│       └── ConfirmDialog.jsx     ← dialog hapus
├── pages/
│   ├── HomePage.jsx              ← beranda (dinamis dari homeConfigService)
│   ├── DynamicPage.jsx           ← catch-all route, render layout by config
│   ├── LoginPage.jsx
│   └── Admin/
│       ├── AdminDashboard.jsx    ← stats + reset data
│       ├── AdminPublikasi.jsx    ← 3 tab: Beranda | Halaman | Dokumen
│       ├── AdminUsers.jsx
│       ├── AdminProfile.jsx
│       └── AdminSettings.jsx
├── layouts/
│   ├── MainLayout.jsx            ← Navbar + content + Footer
│   └── AdminLayout.jsx           ← Sidebar + content
├── routes/
│   ├── AppRoutes.jsx             ← /home, /admin/*, /* (catch-all)
│   └── ProtectedRoute.jsx
└── store/
    └── AuthContext.jsx
```

## Watermark PDF

- Library: `pdf-lib` (client-side)
- Utility: `src/utils/watermarkPdf.js`
- Hook: `src/hooks/useWatermarkDownload.js`
- Flow: klik Unduh → fetch file → cek magic bytes `%PDF` → apply watermark diagonal → download
- Teks watermark: `DOKUMEN INI MILIK BANK BJB` + `{user.fullName}` + `• {user.divisi}`
- Fallback: kalau file bukan base64 atau bukan PDF valid → download langsung tanpa watermark
- Upload PDF sekarang disimpan sebagai base64 (bukan URL simulasi)

---

## Daily Market Dashboard

- User page: `/daily-market-dashboard` — render gambar yang diupload admin
- Admin: tab "Daily Market Dashboard" di Kelola Konten — upload gambar saja
- Service: `src/services/dailyMarketDashboardService.js` → localStorage key `mroe:daily-market-dashboard`

---

Saat backend siap, yang perlu diubah **HANYA service files**:

### 1. pageService.js
```js
// Ganti:
const repo = createLocalRepository("mroe:pages", SEED)
// Jadi:
export const pageService = {
  getAll: () => apiClient.get("/api/pages"),
  create: (data) => apiClient.post("/api/pages", data),
  update: (id, data) => apiClient.put(`/api/pages/${id}`, data),
  remove: (id) => apiClient.delete(`/api/pages/${id}`),
}
```

### 2. publicationService.js (dan service lainnya)
```js
export const publicationService = {
  getAll: () => apiClient.get("/api/publications"),
  create: (data) => apiClient.post("/api/publications", data),
  update: (id, data) => apiClient.put(`/api/publications/${id}`, data),
  remove: (id) => apiClient.delete(`/api/publications/${id}`),
}
```

### 3. uploadService.js
```js
export const uploadService = {
  upload: (file) => {
    const formData = new FormData()
    formData.append("file", file)
    return fetch(`${BASE_URL}/api/uploads`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    }).then(r => r.json())
    // Return: { url: "https://server.com/uploads/xxx.pdf" }
  }
}
```

### 4. homeConfigService.js
```js
export const homeConfigService = {
  getConfig: () => apiClient.get("/api/home-config"),
  update: (data) => apiClient.put("/api/home-config", data),
}
```

### Yang TIDAK perlu diubah:
- Semua hooks (usePublications, useCrud, usePageConfig, useNavMenus)
- Semua komponen UI (layouts, admin components, Navbar)
- Routes
- DynamicPage

---

## Response API yang Diharapkan

### GET /api/pages
```json
[
  {
    "id": 1,
    "name": "Publikasi",
    "slug": "/publikasi",
    "banner": "https://server.com/uploads/banner.png",
    "categories": ["Daily Economic", "bjb Business Insight", "Lainnya"],
    "gridCategories": ["Daily Economic"],
    "layout": "default",
    "gallery": []
  }
]
```

### GET /api/publications (atau /api/documents?page=/publikasi)
```json
[
  {
    "id": 1,
    "title": "Economic Outlook 2026",
    "category": "Daily Economic",
    "description": "Analisis outlook ekonomi",
    "author": "Research Team",
    "month": "Januari 2026",
    "file": "https://server.com/uploads/economic-outlook-2026.pdf"
  }
]
```

### GET /api/regional
```json
[
  {
    "id": 1,
    "title": "Mapping Ekonomi Jawa Barat",
    "category": "Mapping Ekonomi",
    "description": "Analisis kondisi ekonomi regional",
    "author": "Research Team",
    "quarter": "Triwulan IV",
    "year": "2026",
    "publishDate": "15 Desember 2026",
    "file": "https://server.com/uploads/mapping-jabar.pdf"
  }
]
```

### POST /api/uploads
```
Content-Type: multipart/form-data
Body: file=<binary>

Response: { "url": "https://server.com/uploads/abc123.pdf" }
```

---

## Git Workflow

```bash
# Feature branch
git checkout -b feature/nama-fitur
# ... code ...
git add .
git commit -m "feat: deskripsi"
git push -u origin feature/nama-fitur
# → PR ke development → merge ke main → deploy

# Kalau ada CRLF issue saat staging:
git add --renormalize .
```

### .gitattributes
```
* text=auto eol=lf
```

---

## Tips & Troubleshooting

- **Backend tidak jalan**: Login otomatis fallback ke localStorage userService
- **Token expired**: Logout → login ulang
- **Data tidak muncul**: Clear localStorage (hapus semua key `mroe:*`) atau klik "Reset Semua Data" di admin dashboard
- **Halaman baru 404**: Pastikan slug diawali `/` (auto-fix sudah diterapkan)
- **Menu baru di posisi salah**: Navbar sort by `id` ascending — halaman baru (id besar) muncul di akhir
- **Tab URL jelek**: Semua tab param pakai `slugify()` → `/publikasi?tab=daily-economic`
