import { getSkills, getTrainings } from '@/lib/api'
import { trainings as fallbackTrainings } from '@/lib/portfolio-data'
import { skillElements as fallbackSkills } from '@/lib/v2-data'
import { useApiData } from './use-api-data'

export function useTrainings() {
  const { data: trainings, loading, error } = useApiData(getTrainings, fallbackTrainings)
  return { trainings, loading, error }
}

export function useSkills() {
  const { data: skills, loading, error } = useApiData(getSkills, fallbackSkills)
  return { skills, loading, error }
}
