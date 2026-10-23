import { useParams } from 'react-router'
import { useReport } from '@/hooks/use-reports'
import { ArticleDetail } from './article-detail'

export function ReportDetail() {
  const { id } = useParams()
  const state = useReport(id)
  return (
    <ArticleDetail state={state} backTo="/news#reports" backLabel="Back to reports" notFoundTitle="Report not found" />
  )
}
