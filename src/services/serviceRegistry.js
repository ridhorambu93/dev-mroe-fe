import { publicationService } from "./publicationService"
import { makroEkonomiService } from "./makroEkonomiService"
import { industriService } from "./industriService"
import { regionalService } from "./regionalService"
import { getDocumentService } from "./documentServiceFactory"

const registeredServices = {
  "/publikasi": publicationService,
  "/makroekonomi": makroEkonomiService,
  "/industry": industriService,
  "/regional": regionalService,
}

export function getServiceForSlug(slug) {
  return registeredServices[slug] || getDocumentService(slug)
}

export const serviceRegistry = registeredServices
export const REGIONAL_SLUGS = ["/regional"]
