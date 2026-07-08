import { createLocalRepository } from "../utils/localRepository"

const SEED = [
  {
    id: 1,
    name: "Publikasi",
    slug: "/publikasi",
    banner: "/images/banner-publikasi.png",
    categories: ["Daily Economic", "bjb Business Insight", "Lainnya"],
    gridCategories: ["Daily Economic"],
  },
  {
    id: 2,
    name: "Makro Ekonomi",
    slug: "/makroekonomi",
    banner: "",
    categories: ["Makro Brief", "Ekonomi Makro"],
    gridCategories: ["Makro Brief", "Ekonomi Makro"],
  },
  {
    id: 3,
    name: "Industri",
    slug: "/industry",
    banner: "",
    categories: ["Positioning", "Market Share", "Rasio Industri", "Kajian NPL"],
    gridCategories: ["Positioning", "Market Share", "Rasio Industri", "Kajian NPL"],
  },
  {
    id: 4,
    name: "Regional",
    slug: "/regional",
    banner: "",
    categories: ["Mapping Ekonomi", "Pemetaan Sektoral Ekonomi & Kredit Perbankan"],
    gridCategories: [],
  },
  {
    id: 5,
    name: "Daily Market Dashboard",
    slug: "/daily-market-dashboard",
    banner: "",
    categories: ["Daily Market"],
    gridCategories: ["Daily Market"],
  },
]

const repo = createLocalRepository("mroe:pages", SEED)

export const pageService = {
  getAll: repo.getAll,
  getById: repo.getById,
  create: repo.create,
  update: repo.update,
  remove: repo.remove,
  reset: repo.reset,
}
