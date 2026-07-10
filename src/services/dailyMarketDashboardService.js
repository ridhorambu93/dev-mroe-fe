const STORAGE_KEY = "mroe:daily-market-dashboard"

function getData() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { imageUrl: "" }
  } catch {
    return { imageUrl: "" }
  }
}

export const dailyMarketDashboardService = {
  get: () => Promise.resolve(getData()),
  save: (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return Promise.resolve(data)
  },
}
