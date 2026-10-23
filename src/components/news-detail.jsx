import { useParams } from 'react-router'
import { useNewsItem } from '@/hooks/use-news'
import { ArticleDetail } from './article-detail'

export function NewsDetail() {
  const { id } = useParams()
  const state = useNewsItem(id)
  return <ArticleDetail state={state} backTo="/news#news" backLabel="Back to news" notFoundTitle="News not found" />
}
