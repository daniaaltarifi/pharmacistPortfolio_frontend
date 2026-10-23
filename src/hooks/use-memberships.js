import { getMemberships } from '@/lib/api'
import { memberships as fallbackMemberships } from '@/lib/portfolio-data'
import { useApiData } from './use-api-data'

export function useMemberships() {
  const { data: memberships, loading, error } = useApiData(getMemberships, fallbackMemberships)
  return { memberships, loading, error }
}
