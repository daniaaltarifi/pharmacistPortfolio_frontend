import { getProfiles } from '@/lib/api'
import { professionalProfile as fallbackProfiles } from '@/lib/portfolio-data'
import { useApiData } from './use-api-data'

export function useProfiles() {
  const { data: profiles, loading, error } = useApiData(getProfiles, fallbackProfiles)
  return { profiles, loading, error }
}
