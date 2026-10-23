import { getCertifications } from '@/lib/api'
import { useApiData } from './use-api-data'

// No local fallback: certifications only exist in the DB (added by the admin).
export function useCertifications() {
  const { data: certifications, loading, error } = useApiData(getCertifications, [])
  return { certifications, loading, error }
}
