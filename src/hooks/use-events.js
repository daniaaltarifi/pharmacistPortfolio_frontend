import { getEvents } from '@/lib/api'
import { events as fallbackEvents } from '@/lib/v2-data'
import { useApiData } from './use-api-data'

export function useEvents() {
  const { data: events, loading, error } = useApiData(getEvents, fallbackEvents)
  return { events, loading, error }
}
