export const publicationService = {
  async getPublications(params = {}) {
    const { search = "" } = params

    const data = [
      // makro ekonomi dummy data
      {
        id: 1,
        title: "Economic Outlook 2026",
        category: "Daily Economic",
        author: "Research Team",
        month: "Januari 2026",
      },
      {
        id: 2,
        title: "Inflation Trend Analysis",
        category: "Daily Economic",
        author: "Research Team",
        month: "Januari 2026",
      },
      {
        id: 3,
        title: "Global Market Projection",
        category: "Daily Economic",
        author: "Research Team",
        month: "Februari 2026",
      },

      // business insight dummy data
      {
        id: 4,
        title: "Banking Industry Report",
        category: "Daily Economic",
        author: "Research Team",
        month: "Januari 2026",
      },
      {
        id: 5,
        title: "Digital Banking Growth Study",
        category: "Daily Economic",
        author: "Research Team",
        month: "Februari 2026",
      },
      {
        id: 6,
        title: "Credit Risk Evaluation 2026",
        category: "Daily Economic",
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
      {
        id: 11,
        title: "Annual Review 2025",
        category: "Lainnya",
        author: "Research Team",
        month: "Januari 2025",
      },
      {
        id: 12,
        title: "Regional Economic Highlights",
        category: "Lainnya",
        author: "Research Team",
        month: "Februari 2025",
      },
      {
        id: 13,
        title: "Financial Literacy Report",
        category: "Lainnya",
        author: "Research Team",
        month: "Maret 2025",
      },
    ]

    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    )

    return filtered
  },
}
