import { publicationService } from "./publicationService"
import { makroEkonomiService } from "./makroEkonomiService"
import { industriService } from "./industriService"
import { regionalService } from "./regionalService"
import { marketIntelligenceService } from "./marketIntelligenceService"
import { outlookForumService } from "./outlookForumService"
import { getDocumentService } from "./documentServiceFactory"

const registeredServices = {
  "/publikasi": publicationService,
  "/makroekonomi": makroEkonomiService,
  "/industry": industriService,
  "/regional": regionalService,
  "/market-intelligence": marketIntelligenceService,
  "/outlook-economic-forum": outlookForumService,
}

export function getServiceForSlug(slug) {
  return registeredServices[slug] || getDocumentService(slug)
}

export const serviceRegistry = registeredServices
export const REGIONAL_SLUGS = ["/regional"]
