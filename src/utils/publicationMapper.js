export const mapPublicationsToUI = (data) => {
  return {
    year: 2026,
    tabs: [
      { id: "makro", label: "Makro Ekonomi" },
      { id: "perbankan", label: "Perbankan" },
      { id: "lainnya", label: "Lainnya" },
    ],
    months: [
      {
        month: "Januari",
        items: data.map((item) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          author: item.author,
          file: "#", // sementara dummy
        })),
      },
    ],
  }
}
