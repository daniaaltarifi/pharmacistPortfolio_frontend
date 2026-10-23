
import { motion } from 'motion/react'
import { useExperiences } from '@/hooks/use-experiences'
import { competencyElements } from '@/lib/v2-data'
import { ElementTile } from './element-tile'
import { SectionTitle } from './section-title'
import { easeOut, Reveal } from './motion-primitives'
import { useRef, useState, useEffect } from 'react'
export function Experience() {
  const { experiences, loading } = useExperiences()
  const sliderRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Mouse Drag State
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Check scroll position to enable/disable arrow buttons
  const checkScroll = () => {
    if (!sliderRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    const el = sliderRef.current
    if (!el) return
    checkScroll()
    el.addEventListener('scroll', checkScroll)
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  // Cards arrive asynchronously, so re-check whether the arrows should be enabled.
  useEffect(checkScroll, [experiences])

  // Smooth slide by 1 full width (8 cards on desktop)
  const handleScroll = (direction) => {
    if (!sliderRef.current) return
    const width = sliderRef.current.clientWidth
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -width : width,
      behavior: 'smooth',
    })
  }

  // Mouse Dragging Handlers for Desktop
  const handleMouseDown = (e) => {
    if (!sliderRef.current) return
    setIsMouseDown(true)
    setStartX(e.pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
  }

  const handleMouseLeaveOrUp = () => {
    setIsMouseDown(false)
  }

  const handleMouseMove = (e) => {
    if (!isMouseDown || !sliderRef.current) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 1.5 // Drag sensitivity
    sliderRef.current.scrollLeft = scrollLeft - walk
  }

  return (
   <section id="experience" className="w-full py-24 lg:py-32 overflow-hidden select-none">
      {/* Increased side padding here: px-8 on mobile, px-16 on tablet, px-24 on desktop */}
      <div className="w-full px-8 md:px-16 lg:px-24">
        {/* Navigation Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
Ce - Critical Experiences            </span>
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
Business Diversity            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous page"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next page"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Responsive 2-Row Grid Slider Container */}
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
          className={`grid grid-rows-2 grid-flow-col gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory ${
            isMouseDown ? 'cursor-grabbing scroll-auto' : 'cursor-grab scroll-smooth'
          } auto-cols-[calc(100%)] sm:auto-cols-[calc((100%-1.5rem)/2)] lg:auto-cols-[calc((100%-3*1.5rem)/4)]`}
        >
          {loading &&
            Array.from({ length: 8 }, (_, i) => (
              <div
                key={`skeleton-${i}`}
                aria-hidden="true"
                className="h-56 snap-start animate-pulse rounded-2xl border border-border bg-card"
              />
            ))}

          {experiences.map((c, i) => {
            const el = competencyElements[i] || {}
            return (
              <motion.div
                key={c.id ?? i}
                initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -1 : 1 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 8) * 0.05, ease: easeOut }}
                whileHover={{ y: -6 }}
                className="flex snap-start flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
              >
                <ElementTile
                  number={el.number}
                  detail={el.detail}
                  symbol={el.symbol}
                  name={el.name}
                  variant={i === 0 ? 'solid' : 'outline'}
                  className="w-28"
                  size="sm"
                />
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-xl font-medium tracking-tight">
                    {c.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {c.body}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )


}
