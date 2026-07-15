import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib"

/**
 * Apply diagonal watermark text ke setiap halaman PDF.
 * @param {ArrayBuffer|Uint8Array} pdfBytes - raw PDF bytes
 * @param {{ name: string, divisi: string }} userInfo
 * @returns {Promise<Blob>} - PDF blob yang sudah di-watermark
 */
export async function applyWatermark(pdfBytes, userInfo) {
  const pdfDoc = await PDFDocument.load(pdfBytes)
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const pages = pdfDoc.getPages()

  const lines = [
    "DOKUMEN INI MILIK BANK BJB",
    (userInfo.name || "USER").toUpperCase(),
    `• ${(userInfo.divisi || "BJB").toUpperCase()}`,
  ]

  const fontSize = 28
  const color = rgb(0.5, 0.5, 0.5)
  const opacity = 0.4

  for (const page of pages) {
    const { width, height } = page.getSize()
    const centerX = width / 2
    const centerY = height / 2

    lines.forEach((text, i) => {
      const textWidth = font.widthOfTextAtSize(text, fontSize)
      page.drawText(text, {
        x: centerX - textWidth / 2,
        y: centerY + (lines.length / 2 - i) * 40,
        size: fontSize,
        font,
        color,
        opacity,
        rotate: degrees(45),
      })
    })
  }

  const watermarkedBytes = await pdfDoc.save()
  return new Blob([watermarkedBytes], { type: "application/pdf" })
}
