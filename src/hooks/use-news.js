import { getNews, getNewsItem } from '@/lib/api'
import { newsItems as fallbackNews } from '@/lib/v2-data'
import { useApiData } from './use-api-data'
import { useApiItem } from './use-api-item'

export function useNews() {
  const { data: news, loading, error } = useApiData(getNews, fallbackNews)
  return { news, loading, error }
}

// One news item for the details page.
export function useNewsItem(id) {
  return useApiItem(getNewsItem, id, fallbackNews)
}
