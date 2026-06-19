export const industriService = {
  async getPublications(params = {}) {
    const { search = "" } = params

    // Dummy data — ganti dengan fetch() ke REST API nanti
    const data = [
      {
        id: 1,
        title: "Positioning Bank bjb di Industri Perbankan",
        category: "Positioning",
        author: "Research Team",
        month: "Januari 2026",
      },
      {
        id: 2,
        title: "Positioning Kredit Konsumer Q1 2026",
        category: "Positioning",
        author: "Research Team",
        month: "Februari 2026",
      },
      {
        id: 3,
        title: "Market Share DPK Bank bjb 2026",
        category: "Market Share",
        author: "Research Team",
        month: "Januari 2026",
      },
      {
        id: 4,
        title: "Market Share Kredit Segmen UMKM",
        category: "Market Share",
        author: "Research Team",
        month: "Februari 2026",
      },
      {
        id: 5,
        title: "Rasio Industri Perbankan Nasional",
        category: "Rasio Industri",
        author: "Research Team",
        month: "Januari 2026",
      },
      {
        id: 6,
        title: "CAR & LDR Perbankan Q1 2026",
        category: "Rasio Industri",
        author: "Research Team",
        month: "Februari 2026",
      },
      {
        id: 7,
        title: "Kajian NPL Sektor Konstruksi",
        category: "Kajian NPL",
        author: "Research Team",
        month: "Januari 2026",
      },
      {
        id: 8,
        title: "Kajian NPL Sektor Perdagangan",
        category: "Kajian NPL",
        author: "Research Team",
        month: "Februari 2026",
      },
      {
        id: 9,
        title: "Tren NPL Kredit Konsumer 2026",
        category: "Kajian NPL",
        author: "Research Team",
        month: "Maret 2026",
      },
    ]

    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    )

    return filtered
  },
}
