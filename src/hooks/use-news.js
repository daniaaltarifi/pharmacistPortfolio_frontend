import { getNews, getNewsItem } from '@/lib/api'
import { newsItems as fallbackNews } from '@/lib/v2-data'
import { useApiData } from './use-api-data'
import { useApiItem } from './use-api-item'

// The API only sends active news to the public; filtering here too keeps drafts off the site
// even if that ever changes. Items without a status (local fallback data) count as active.
const isActive = (n) => (n.status ?? 'active') === 'active'

export function useNews() {
  const { data: news, loading, error } = useApiData(getNews, fallbackNews)
  return { news: news.filter(isActive), loading, error }
}

// One news item for the details page.
export function useNewsItem(id) {
  return useApiItem(getNewsItem, id, fallbackNews)
}
