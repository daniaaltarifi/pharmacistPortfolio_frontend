import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useMemberships } from '@/hooks/use-memberships'
import { SectionTitle } from './section-title'
import { easeOut } from './motion-primitives'

// Initials badge from the organisation name, e.g. "Royal Pharmaceutical Society" -> "RP"
const initials = (org) =>
  org
    .replace(/\(.*?\)/g, '')
    .split(/\s+/)
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

export function Memberships() {
  const { memberships } = useMemberships()
  const loop = [...memberships, ...memberships]
  const sliderRef = useRef(null)
  const drag = useRef({ down: false, startX: 0, scrollLeft: 0 })
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [progress, setProgress] = useState(0)

  const checkScroll = () => {
    const el = sliderRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < max - 10)
    setProgress(max > 0 ? el.scrollLeft / max : 1)
  }

  useEffect(() => {
    const el = sliderRef.current
    if (!el) return
    checkScroll()
    el.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  // Cards arrive asynchronously, so re-check whether the arrows should be enabled.
  useEffect(checkScroll, [memberships])

  // Slide by one card width
  const slide = (direction) => {
    const el = sliderRef.current
    if (!el) return
    const card = el.querySelector('li')
    const step = card ? card.offsetWidth + 24 : el.clientWidth
    el.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' })
  }

  // Mouse dragging for desktop
  const onMouseDown = (e) => {
    const el = sliderRef.current
    drag.current = { down: true, startX: e.pageX, scrollLeft: el.scrollLeft }
    el.classList.add('cursor-grabbing')
  }
  const onMouseUp = () => {
    drag.current.down = false
    sliderRef.current?.classList.remove('cursor-grabbing')
  }
  const onMouseMove = (e) => {
    if (!drag.current.down) return
    e.preventDefault()
    sliderRef.current.scrollLeft = drag.current.scrollLeft - (e.pageX - drag.current.startX) * 1.5
  }

  const controls = [
    { dir: 'left', Icon: ArrowLeft, label: 'Previous membership', enabled: canScrollLeft },
    { dir: 'right', Icon: ArrowRight, label: 'Next membership', enabled: canScrollRight },
  ]

  return (
    <section id="memberships" className="flex flex-col gap-14 py-24 lg:py-32">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-end md:justify-between">
        <SectionTitle symbol="Me" label="Memberships" title="Institutions and entities shaping pharmacy & health." />
        <div className="flex items-center gap-3">
          {controls.map(({ dir, Icon, label, enabled }) => (
            <button
              key={dir}
              type="button"
              onClick={() => slide(dir)}
              disabled={!enabled}
              aria-label={label}
              className="flex size-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border disabled:hover:bg-card disabled:hover:text-foreground"
            >
              <Icon className="size-5" />
            </button>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden border-y border-border py-8" aria-hidden="true">
        <div className="animate-marquee flex w-max items-center gap-12">
          {loop.map((m, i) => (
            <span key={`${m.org}-${i}`} className="flex items-center gap-12 font-display text-3xl font-medium tracking-tight text-muted-foreground md:text-5xl">
              {m.org}
              <span className="size-3 rounded-full bg-primary" />
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6">
        <ul
          ref={sliderRef}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onMouseMove={onMouseMove}
          className="scrollbar-none flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto pb-4 pt-2 select-none"
        >
          {memberships.map((m, i) => (
            <motion.li
              key={m.id ?? m.org}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: easeOut }}
              className="group relative flex w-[85%] shrink-0 snap-start flex-col justify-between gap-10 overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-xl sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            >
              <span
                aria-hidden="true"
                className="absolute -right-10 -top-10 size-40 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150"
              />
              <div className="relative flex items-start justify-between gap-4">
                <span className="flex size-12 items-center justify-center rounded-lg bg-primary font-display text-lg font-medium text-primary-foreground">
                  {initials(m.org)}
                </span>
                <span className="font-display text-sm tabular-nums text-muted-foreground">
                  {String(i + 1).padStart(2, '0')} / {String(memberships.length).padStart(2, '0')}
                </span>
              </div>
              <div className="relative flex flex-col gap-3">
                <h3 className="font-display text-2xl font-medium leading-snug tracking-tight text-balance">{m.org}</h3>
                <p className="text-muted-foreground">
                  {m.role}
                  {m.sector && ` · ${m.sector}`}
                </p>
                <span className="mt-2 w-fit rounded-full border border-primary px-3 py-1 text-sm text-primary">
                  {m.period}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>

        <div className="h-0.5 w-full overflow-hidden rounded-full bg-border" aria-hidden="true">
          <div
            className="h-full origin-left bg-primary transition-transform duration-300"
            style={{ transform: `scaleX(${Math.max(progress, 0.08)})` }}
          />
        </div>
      </div>
    </section>
  )
}
