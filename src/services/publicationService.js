export const publicationService = {
  async getPublications(params = {}) {
    const { search = "" } = params

    const data = [
      {
        id: 1,
        title: "Economic Outlook 2026",
        category: "Makro Ekonomi",
        author: "Research Team",
        month: "Januari 2026",
      },
      {
        id: 2,
        title: "Banking Industry Report",
        category: "Perbankan",
        author: "Research Team",
        month: "Januari 2026",
      },
      {
        id: 3,
        title: "tester 3",
        category: "Makro Ekonomi",
        author: "Research Team",
        month: "Januari 2026",
      },

      {
        id: 4,
        title: "tester data februari",
        category: "Makro Ekonomi",
        author: "Research Team",
        month: "Februari 2026",
      },
      {
        id: 5,
        title: "tester data februari",
        category: "Perbankan",
        author: "Research Team",
        month: "Februari 2026",
      },
    ]

    // mapping layer tetap di sini (IMPORTANT)
    return data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    )
  },
}
