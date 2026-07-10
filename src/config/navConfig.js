/**
 * navConfig.js
 * ------------
 * Konfigurasi statis menu navbar.
 * Untuk menambah/ubah menu, edit file ini saja.
 */

export const NAV_MENUS = [
  {
    label: "Publikasi",
    path: "/publikasi",
    children: [
      { label: "Daily Economic", tab: "daily-economic" },
      { label: "bjb Business Insight", tab: "bjb-business-insight" },
      { label: "Lainnya", tab: "lainnya" },
    ],
  },
  {
    label: "Makro Ekonomi",
    path: "/makroekonomi",
    children: [
      { label: "Makro Brief", tab: "makro-brief" },
      { label: "Ekonomi Makro", tab: "ekonomi-makro" },
    ],
  },
  {
    label: "Industri",
    path: "/industry",
    children: [
      { label: "Positioning", tab: "positioning" },
      { label: "Market Share", tab: "market-share" },
      { label: "Rasio Industri", tab: "rasio-industri" },
      { label: "Kajian NPL", tab: "kajian-npl" },
    ],
  },
  {
    label: "Regional",
    path: "/regional",
    children: [
      { label: "Mapping Ekonomi", tab: "mapping-ekonomi" },
      {
        label: "Pemetaan Sektoral",
        tab: "pemetaan-sektoral-ekonomi-kredit-perbankan",
      },
    ],
  },
  {
    label: "Market Intelligence",
    path: "/market-intelligence",
  },
  {
    label: "Outlook Economic Forum",
    path: "/outlook-economic-forum",
  },
  {
    label: "Daily Market Dashboard",
    path: "/daily-market-dashboard",
  },
]
