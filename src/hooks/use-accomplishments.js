import { getAccomplishments } from '@/lib/api'
import { accomplishmentsData as fallbackAccomplishments } from '@/lib/accomplishments-data'
import { useApiData } from './use-api-data'

export function useAccomplishments() {
  const { data: accomplishments, loading, error } = useApiData(getAccomplishments, fallbackAccomplishments)
  return { accomplishments, loading, error }
}
