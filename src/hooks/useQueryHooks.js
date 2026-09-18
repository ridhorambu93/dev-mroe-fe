import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getServiceForSlug } from "../services/serviceRegistry"

/** Fetch documents for a specific page slug */
export function useDocuments(slug) {
  const service = slug ? getServiceForSlug(slug) : null
  return useQuery({
    queryKey: ["documents", slug],
    queryFn: () => service.getAll(),
    enabled: !!slug,
  })
}

/** Mutations for documents of a specific slug */
export function useDocumentMutations(slug) {
  const qc = useQueryClient()
  const service = slug ? getServiceForSlug(slug) : null
  const invalidate = () => qc.invalidateQueries({ queryKey: ["documents", slug] })

  const createDoc = useMutation({ mutationFn: (data) => service.create(data), onSuccess: invalidate })
  const updateDoc = useMutation({ mutationFn: ({ id, data }) => service.update(id, data), onSuccess: invalidate })
  const removeDoc = useMutation({ mutationFn: (id) => service.remove(id), onSuccess: invalidate })

  return { createDoc, updateDoc, removeDoc }
}

