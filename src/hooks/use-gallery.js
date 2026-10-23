import { getGallery } from '@/lib/api'
import { useApiData } from './use-api-data'

// No local fallback: gallery photos only exist in the DB (added from the dashboard).
export function useGallery() {
  const { data: images, loading, error } = useApiData(getGallery, [])
  return { images, loading, error }
}
