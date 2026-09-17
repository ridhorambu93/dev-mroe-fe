const BASE_URL = import.meta.env.VITE_API_BASE_URL || ""

const ALLOWED_PROTOCOLS = ["http:", "https:"]

function validateBaseUrl(url) {
  if (!url) throw new Error("VITE_API_BASE_URL tidak dikonfigurasi")
  try {
    const parsed = new URL(url)
    if (!ALLOWED_PROTOCOLS.includes(parsed.protocol))
      throw new Error("Protocol tidak diizinkan")
  } catch {
    throw new Error("VITE_API_BASE_URL tidak valid")
  }
}

function validatePath(path) {
  if (typeof path !== "string" || !path.startsWith("/"))
    throw new Error(`Path tidak valid: ${path}`)
}

// CSRF token disimpan di memory (bukan localStorage/cookie)
// Di-set oleh AuthContext setelah login berhasil
let _csrfToken = null

export function setCsrfToken(token) {
  _csrfToken = token
}

export function clearCsrfToken() {
  _csrfToken = null
}

const SAFE_METHODS = ["GET", "HEAD", "OPTIONS"]

async function request(path, options = {}) {
  validateBaseUrl(BASE_URL)
  validatePath(path)

  const method = (options.method || "GET").toUpperCase()
  const { headers: extraHeaders, ...restOptions } = options

  const csrfHeaders =
    !SAFE_METHODS.includes(method) && _csrfToken
      ? { "X-CSRF-Token": _csrfToken }
      : {}

  // Kalau body adalah FormData, jangan set Content-Type (browser set otomatis + boundary)
  const isFormData = restOptions.body instanceof FormData
  const contentHeaders = isFormData ? {} : { "Content-Type": "application/json" }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...restOptions,
    method,
    credentials: "include", // kirim cookie access_token otomatis
    headers: {
      ...contentHeaders,
      ...csrfHeaders,
      ...extraHeaders,
    },
  })

  const json = await res.json()
  if (!res.ok) throw new Error(json?.message || `HTTP ${res.status}`)
  return json
}

export const apiClient = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: "DELETE" }),
  // Untuk endpoint multipart/form-data (upload publikasi, banner)
  postForm: (path, formData) => request(path, { method: "POST", body: formData }),
  putForm: (path, formData) => request(path, { method: "PUT", body: formData }),
}
