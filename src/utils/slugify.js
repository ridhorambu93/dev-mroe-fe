/**
 * Konversi string ke slug URL-friendly.
 * "Pemetaan Sektoral Ekonomi & Kredit Perbankan" → "pemetaan-sektoral-ekonomi-kredit-perbankan"
 */
export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}
