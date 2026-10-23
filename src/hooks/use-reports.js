import { getReport, getReports } from '@/lib/api'
import { useApiData } from './use-api-data'
import { useApiItem } from './use-api-item'

// No local fallback: reports only exist in the DB (added by the admin).
export function useReports() {
  const { data: reports, loading, error } = useApiData(getReports, [])
  return { reports, loading, error }
}

// One report for the details page.
export function useReport(id) {
  return useApiItem(getReport, id)
}
