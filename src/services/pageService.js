// Konstanta Statis ()
export const PAGE_CONFIGS = [
  {
    id: 1,
    name: "Publikasi",
    slug: "/publikasi",
    categories: ["Daily Economic", "Bjb Business Insight", "Lainnya"],
    gridCategories: ["Daily Economic"],
    layout: "default",
      subsectionPeriods: {
        "Daily Economic" : "monthly",
        "Bjb Business Insight" : "quarterly",
        "Lainnya" : "quarterly"
      },
    },
    {
    id: 2,
    name: "Makroekonomi",
    slug: "/makro-ekonomi",
    categories: ["Macro brief", "Ekonomi Makro"],
    gridCategories: ["Macro brief", "Ekonomi Makro"],
    layout: "default",
      subsectionPeriods: {
        "Macro brief": "quarterly",
        "Ekonomi Makro": "quarterly",
      },
  },
  {
    id: 3,
    name: "Industri",
    slug: "/industri",
    categories: ["Positioning", "Market Share", "Rasio Industri", "Kajian NPL"],
    gridCategories: ["Positioning", "Market Share"],
    layout: "default",
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
    categories: ["Mapping Ekonomi", "Pemetaan Sektoral Ekonomi & Kredit Perbankan"],
    gridCategories: [],
    layout: "regional",
      subsectionPeriods: {
        "Mapping Ekonomi": "quarterly",
        "Pemetaan Sektoral Ekonomi & Kredit Perbankan": "quarterly",
      },
  },
  {
    id: 5,
    name: "Market Intelligence",
    slug: "/market-intelligence",
    categories: ["Kajian"],
    gridCategories: [],
    layout: "default",
    subsectionPeriods: { "Kajian": "event" },
  },
  {
    id: 6,
    name: "Outlook Economic Forum",
    slug: "/outlook-economic-forum",
    categories: ["Materi"],
    gridCategories: [],
    layout: "forum",
    subsectionPeriods: { "Materi": "event" },
  },
]

export const pageService = {
  getAll: () => Promise.resolve([...PAGE_CONFIGS]),
  getBySlug: (slug) => Promise.resolve(PAGE_CONFIGS.find((p) => p.slug === slug) ?? null),
}