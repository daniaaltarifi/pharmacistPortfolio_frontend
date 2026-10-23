import { getProjects } from '@/lib/api'
import { projects as fallbackProjects } from '@/lib/projects-data'
import { useApiData } from './use-api-data'

export function useProjects() {
  const { data: projects, loading, error } = useApiData(getProjects, fallbackProjects)
  return { projects, loading, error }
}
