import { createLocalRepository } from "../utils/localRepository"

const SEED = [
  {
    id: 1,
    name: "Publikasi",
    slug: "/publikasi",
    banner: "/images/banner-publikasi.png",
    categories: ["Daily Economic", "Bjb Business Insight", "Lainnya"],
    gridCategories: ["Daily Economic"],
    layout: "default",
    gallery: [],
    subsectionPeriods: {
      "Daily Economic": "daily",
      "Bjb Business Insight": "quarterly",
      "Lainnya": "quarterly",
    },
  },
  {
    id: 2,
    name: "Makroekonomi",
    slug: "/makroekonomi",
    banner: "",
    categories: ["Macro brief", "Ekonomi Makro"],
    gridCategories: ["Macro brief", "Ekonomi Makro"],
    layout: "default",
    gallery: [],
    subsectionPeriods: {
      "Macro brief": "quarterly",
      "Ekonomi Makro": "quarterly",
    },
  },
  {
    id: 3,
    name: "Industri",
    slug: "/industry",
    banner: "",
    categories: ["Positioning", "Market Share", "Rasio Industri", "Kajian NPL"],
    gridCategories: ["Positioning", "Market Share"],
    layout: "default",
    gallery: [],
    subsectionPeriods: {
      "Positioning": "monthly",
      "Market Share": "monthly",
      "Rasio Industri": "semester",
      "Kajian NPL": "semester",
    },
  },
  {
    id: 4,
    name: "Regional",
    slug: "/regional",
    banner: "",
    categories: ["Mapping Ekonomi", "Pemetaan Sektoral Ekonomi & Kredit Perbankan"],
    gridCategories: [],
    layout: "regional",
    gallery: [],
    subsectionPeriods: {
      "Mapping Ekonomi": "yearly",
      "Pemetaan Sektoral Ekonomi & Kredit Perbankan": "quarterly",
    },
  },
  {
    id: 5,
    name: "Market Intelligence",
    slug: "/market-intelligence",
    banner: "",
    categories: ["Kajian"],
    gridCategories: [],
    layout: "default",
    gallery: [],
    subsectionPeriods: {
      "Kajian": "event",
    },
  },
  {
    id: 6,
    name: "Outlook Economic Forum",
    slug: "/outlook-economic-forum",
    banner: "",
    categories: ["Materi"],
    gridCategories: [],
    layout: "forum",
    gallery: [],
    subsectionPeriods: {
      "Materi": "event",
    },
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
