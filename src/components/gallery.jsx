import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, Expand, ImageOff, X } from 'lucide-react'
import { useGallery } from '@/hooks/use-gallery'
import { cn } from '@/lib/utils'
import { SectionTitle } from './section-title'
import { easeOut } from './motion-primitives'

const altFor = (index, total) => `Gallery photo ${index + 1} of ${total}`

// Square bento layout. Every tile is a square: the page is built from square "blocks", each block is
// either ONE big photo or FOUR small photos in a 2x2. Blocks sit two per band, so bands are always full.
// For n photos we need b big blocks + s small blocks with b + 4s = n and b + s even (whole bands);
// the most small blocks wins. This works for every n >= 4 and for 2; for 1 or 3 the last band is half full.
function squareLayout(count) {
  let small = 0
  let big = count
  for (let s = Math.floor(count / 4); s >= 0; s--) {
    if ((count - 4 * s + s) % 2 === 0) {
      small = s
      big = count - 4 * s
      break
    }
  }

  // Pair blocks into bands: mixed bands (big + small, alternating sides) first, then the leftovers.
  const types = []
  const mixed = Math.min(big, small)
  for (let i = 0; i < mixed; i++) types.push(...(i % 2 === 0 ? ['big', 'small'] : ['small', 'big']))
  for (let i = mixed; i < big; i++) types.push('big')
  for (let i = mixed; i < small; i++) types.push('small')

  // Hand out photo indexes in order and group the blocks two per band.
  let next = 0
  const blocks = types.map((type) =>
    type === 'big' ? { type, indexes: [next++] } : { type, indexes: [next++, next++, next++, next++] },
  )
  const bands = []
  for (let i = 0; i < blocks.length; i += 2) bands.push(blocks.slice(i, i + 2))
  return bands
}

// Full-screen viewer: arrows / swipe / keyboard (← → Esc), counter and a thumbnail strip.
function Lightbox({ images, index, onIndex, onClose }) {
  const closeRef = useRef(null)
  const stripRef = useRef(null)
  const touchX = useRef(null)
  const [direction, setDirection] = useState(0)
  const total = images.length

  const go = useCallback(
    (step) => {
      setDirection(step)
      onIndex((index + step + total) % total)
    },
    [index, total, onIndex],
  )

  // Keyboard, scroll lock, and returning focus to the photo that opened the viewer.
  useEffect(() => {
    const opener = document.activeElement
    closeRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      opener?.focus?.()
    }
  }, [go, onClose])

  // Keep the active thumbnail in view.
  useEffect(() => {
    stripRef.current?.children[index]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [index])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[100] flex flex-col bg-[#050d18]/95 text-white backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 md:px-6" onClick={(e) => e.stopPropagation()}>
        <span className="font-display text-sm tabular-nums text-white/70">
          {index + 1} <span className="text-white/40">/ {total}</span>
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close viewer"
          className="flex size-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Photo */}
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return
          const dx = e.changedTouches[0].clientX - touchX.current
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
          touchX.current = null
        }}
      >
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.img
            key={images[index].id}
            src={images[index].imageUrl}
            alt={altFor(index, total)}
            custom={direction}
            variants={{
              enter: (d) => ({ opacity: 0, x: d * 60, scale: 0.98 }),
              center: { opacity: 1, x: 0, scale: 1 },
              exit: (d) => ({ opacity: 0, x: d * -60, scale: 0.98 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: easeOut }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full rounded-xl object-contain shadow-2xl select-none"
            draggable={false}
          />
        </AnimatePresence>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                go(-1)
              }}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white md:flex"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                go(1)
              }}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white md:flex"
            >
              <ChevronRight className="size-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {total > 1 && (
        <div
          ref={stripRef}
          className="scrollbar-none flex gap-2 overflow-x-auto px-4 py-4 md:justify-center md:px-6"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => {
                setDirection(i > index ? 1 : -1)
                onIndex(i)
              }}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === index}
              className={cn(
                'relative size-14 shrink-0 overflow-hidden rounded-lg transition-all md:size-16',
                i === index ? 'opacity-100 ring-2 ring-white ring-offset-2 ring-offset-[#050d18]' : 'opacity-40 hover:opacity-80',
              )}
            >
              <img src={img.imageUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  )
}


// One square photo tile.
function Tile({ images, index, onOpen, big = false }) {
  const img = images[index]
  return (
    <motion.div
      className="aspect-square"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 5) * 0.07, ease: easeOut }}
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Open photo ${index + 1} of ${images.length}`}
        className="group relative block h-full w-full overflow-hidden rounded-2xl bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <img
          src={img.imageUrl}
          alt={altFor(index, images.length)}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-[#08192d]/70 via-[#08192d]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span
          className={cn(
            'absolute flex translate-y-2 items-center justify-center rounded-full bg-white/90 text-[#08192d] opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100',
            big ? 'bottom-5 right-5 size-11' : 'bottom-3 right-3 size-8',
          )}
        >
          <Expand className={big ? 'size-4' : 'size-3.5'} aria-hidden="true" />
        </span>
      </button>
    </motion.div>
  )
}

export function Gallery() {
  const { images, loading } = useGallery()
  const [openIndex, setOpenIndex] = useState(null)
  const bands = useMemo(() => squareLayout(images.length), [images.length])

  return (
    <section id="gallery" className="py-24 lg:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionTitle symbol="Ga" label="Gallery" title="Moments from the events, the stage and the field." />
          {!loading && images.length > 0 && (
            <p className="font-display text-sm tabular-nums text-muted-foreground">
              <span className="text-4xl font-medium text-foreground">{images.length}</span> photos
            </p>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col gap-4" aria-busy="true">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="aspect-square animate-pulse rounded-2xl bg-muted" />
              <div className="grid grid-cols-2 gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square animate-pulse rounded-2xl bg-muted" />
                ))}
              </div>
            </div>
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-border p-16 text-center text-muted-foreground">
            <ImageOff className="size-8" aria-hidden="true" />
            <p>No photos yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {bands.map((band, b) => (
              // Phones: blocks stack. Tablet/desktop: two blocks side by side.
              <div key={b} className="grid gap-4 sm:grid-cols-2">
                {band.map((block) =>
                  block.type === 'big' ? (
                    <Tile key={block.indexes[0]} images={images} index={block.indexes[0]} onOpen={setOpenIndex} big />
                  ) : (
                    <div key={block.indexes[0]} className="grid grid-cols-2 gap-4">
                      {block.indexes.map((i) => (
                        <Tile key={i} images={images} index={i} onOpen={setOpenIndex} />
                      ))}
                    </div>
                  ),
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {openIndex !== null && images[openIndex] && (
          <Lightbox images={images} index={openIndex} onIndex={setOpenIndex} onClose={() => setOpenIndex(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
