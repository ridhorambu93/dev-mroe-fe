export const makroEkonomiService = {
  async getPublications(params = {}) {
    const { search = "" } = params

    // Dummy data — ganti dengan fetch() ke REST API nanti
    const data = [
      {
        id: 1,
        title: "Makro Brief - Januari 2026",
        category: "Makro Brief",
        author: "Research Team",
        month: "Januari 2026",
      },
      {
        id: 2,
        title: "Makro Brief - Februari 2026",
        category: "Makro Brief",
        author: "Research Team",
        month: "Februari 2026",
      },
      {
        id: 3,
        title: "Analisis Ekonomi Makro Q1 2026",
        category: "Ekonomi Makro",
        author: "Research Team",
        month: "Januari 2026",
      },
      {
        id: 4,
        title: "GDP Growth Outlook Indonesia",
        category: "Ekonomi Makro",
        author: "Research Team",
        month: "Februari 2026",
      },
      {
        id: 5,
        title: "Inflasi & Suku Bunga Update",
        category: "Ekonomi Makro",
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
