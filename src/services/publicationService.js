export const publicationService = {
  async getPublications(params = {}) {
    const { search = "" } = params

    const data = [
      // MAKRO EKONOMI dummy data
      {
        id: 1,
        title: "Economic Outlook 2026",
        category: "Makro Ekonomi",
        author: "Research Team",
        month: "Januari 2026",
      },
      {
        id: 2,
        title: "Inflation Trend Analysis",
        category: "Makro Ekonomi",
        author: "Research Team",
        month: "Januari 2026",
      },
      {
        id: 3,
        title: "Global Market Projection",
        category: "Makro Ekonomi",
        author: "Research Team",
        month: "Februari 2026",
      },

      // BJB BUSINESS INSIGHT dummy data
      {
        id: 4,
        title: "Banking Industry Report",
        category: "Perbankan",
        author: "Research Team",
        month: "Januari 2026",
      },
      {
        id: 5,
        title: "Digital Banking Growth Study",
        category: "Perbankan",
        author: "Research Team",
        month: "Februari 2026",
      },
      {
        id: 6,
        title: "Credit Risk Evaluation 2026",
        category: "Perbankan",
        author: "Research Team",
        month: "Februari 2026",
      },
      {
        id: 7,
        title: "bjb Business Insight Q1 2026",
        category: "bjb Business Insight",
        author: "Insight Team",
        month: "Januari 2026",
      },
      {
        id: 8,
        title: "SME Growth Strategy Jawa Barat",
        category: "bjb Business Insight",
        author: "Insight Team",
        month: "Februari 2026",
      },
      // dummy data tab lainnya
      {
        id: 9,
        title: "Regional Economic Highlights",
        category: "Lainnya",
        author: "Research Team",
        month: "Januari 2026",
      },
      {
        id: 10,
        title: "Financial Literacy Report",
        category: "Lainnya",
        author: "Research Team",
        month: "Februari 2026",
      },
    ]

    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    )

    return filtered
  },
}
