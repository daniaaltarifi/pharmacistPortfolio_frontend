import { useEffect, useState } from 'react'

// Loads one item by id for a details page (news, reports, ...).
// 400/404 -> notFound. Server unreachable -> look the id up in `fallbackList` (if any).
export function useApiItem(fetcher, id, fallbackList = []) {
  const [state, setState] = useState({ item: null, loading: true, notFound: false })

  useEffect(() => {
    const controller = new AbortController()
    setState({ item: null, loading: true, notFound: false })

    fetcher(id, { signal: controller.signal })
      .then((item) => setState({ item, loading: false, notFound: false }))
      .catch((err) => {
        if (err.name === 'AbortError') return
        // 400 = malformed id, 404 = no such item: both mean "not found" to the visitor.
        if (err.status === 400 || err.status === 404) {
          return setState({ item: null, loading: false, notFound: true })
        }
        console.warn('API request failed, using local data:', err.message)
        const local = fallbackList.find((x) => x.id === id) ?? null
        setState({ item: local, loading: false, notFound: !local })
      })

    return () => controller.abort()
    // fetcher/fallbackList are module-level constants at the call sites.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return state
}
