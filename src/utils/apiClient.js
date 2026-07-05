const BASE_URL = import.meta.env.VITE_API_BASE_URL || ""

// Validasi BASE_URL hanya boleh http/https dan bukan internal IP
const ALLOWED_PROTOCOLS = ["http:", "https:"]
const BLOCKED_HOSTS = /^(localhost$|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.)/

function validateBaseUrl(url) {
  if (!url) throw new Error("VITE_API_BASE_URL tidak dikonfigurasi")
  try {
    const parsed = new URL(url)
    if (!ALLOWED_PROTOCOLS.includes(parsed.protocol))
      throw new Error("Protocol tidak diizinkan")
    if (BLOCKED_HOSTS.test(parsed.hostname) && import.meta.env.PROD)
      throw new Error("Host tidak diizinkan di production")
  } catch {
    throw new Error("VITE_API_BASE_URL tidak valid")
  }
}

// Validasi path hanya boleh diawali "/" dan tidak mengandung karakter berbahaya
function validatePath(path) {
  if (typeof path !== "string" || !path.startsWith("/"))
    throw new Error(`Path tidak valid: ${path}`)
}

async function request(path, options = {}) {
  validateBaseUrl(BASE_URL)
  validatePath(path)

  const token = localStorage.getItem("token")
  const { headers: extraHeaders, ...restOptions } = options

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...extraHeaders,
    },
    ...restOptions,
  })

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  return res.json()
}

export const apiClient = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: "DELETE" }),
}
