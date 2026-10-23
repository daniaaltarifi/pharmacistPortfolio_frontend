import { useEffect, useState } from 'react'

// Runs `fetcher({ signal })` once on mount. If it fails, falls back to `fallback`
// so the section never renders empty when the API is unreachable.
export function useApiData(fetcher, fallback = []) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    fetcher({ signal: controller.signal })
      .then(setData)
      .catch((err) => {
        if (err.name === 'AbortError') return
        console.warn('API request failed, using local data:', err.message)
        setError(err)
        setData(fallback)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
    // fetcher/fallback are module-level constants at the call sites; run once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, loading, error }
}
