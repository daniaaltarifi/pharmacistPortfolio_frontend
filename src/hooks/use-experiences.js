import { getExperiences } from '@/lib/api'
import { experiences as fallbackExperiences } from '@/lib/portfolio-data'
import { useApiData } from './use-api-data'

export function useExperiences() {
  const { data: experiences, loading, error } = useApiData(getExperiences, fallbackExperiences)
  return { experiences, loading, error }
}
