import { useEffect, useId, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

// Clamps text to 4 lines; a "Read more" toggle appears only when the text is actually longer.
export function ReadMoreText({ children, className }) {
  const ref = useRef(null)
  const id = useId()
  const [expanded, setExpanded] = useState(false)
  const [overflows, setOverflows] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Re-check on resize, since the number of lines depends on the available width
    const check = () => {
      if (!expanded) setOverflows(el.scrollHeight > el.clientHeight + 1)
    }
    check()
    const observer = new ResizeObserver(check)
    observer.observe(el)
    return () => observer.disconnect()
  }, [children, expanded])

  return (
    <div className="flex flex-col items-start gap-1.5">
      <p id={id} ref={ref} className={cn(className, !expanded && 'line-clamp-4')}>
        {children}
      </p>
      {overflows && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={id}
          onClick={() => setExpanded((v) => !v)}
          className="text-xs font-medium text-primary underline-offset-4 hover:underline"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  )
}
