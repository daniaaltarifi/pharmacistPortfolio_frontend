import { getAwards } from '@/lib/api'
import { awards as fallbackAwards } from '@/lib/portfolio-data'
import { useApiData } from './use-api-data'

export function useAwards() {
  const { data: awards, loading, error } = useApiData(getAwards, fallbackAwards)
  return { awards, loading, error }
}
