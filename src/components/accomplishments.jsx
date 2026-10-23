import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useAccomplishments } from '@/hooks/use-accomplishments'

export function Accomplishments() {
  return <CircularAccomplishments />
}

export function CircularAccomplishments() {
  const { accomplishments } = useAccomplishments()
  const [activeIdx, setActiveIdx] = useState(0)
  const totalItems = accomplishments.length
  const activeItem = accomplishments[activeIdx] // undefined while loading

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-20 text-zinc-100 min-h-[900px] flex flex-col justify-center">
      {/* Background radial glow effect */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10 w-full">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono uppercase tracking-widest text-cyan-400">
            Ka · Key Accomplishments
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Results, measured precisely.
          </h2>
        </div>

        {/* Circular Dial Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10">
          
          {/* Radial Wheel with Center Molecule */}
          <div className="lg:col-span-7 flex justify-center items-center relative aspect-square max-w-[550px] mx-auto w-full">
            
            {/* Outer Circular Ring Spectrum */}
            <div className="absolute inset-2 rounded-full border border-cyan-500/20 bg-zinc-900/30 backdrop-blur-sm" />
            
            {/* Inner Ring Divider */}
            <div className="absolute inset-16 rounded-full border border-cyan-500/10" />

            {/* Orbiting Interactive Accomplishment Nodes */}
            {accomplishments.map((item, index) => {
              const angle = (index / totalItems) * 360 - 90 // Distribute circularly starting top
              const radius = 42 // Percentage radius from center
              const x = 50 + radius * Math.cos((angle * Math.PI) / 180)
              const y = 50 + radius * Math.sin((angle * Math.PI) / 180)
              const isActive = index === activeIdx

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIdx(index)}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group flex items-center justify-center transition-all duration-300 z-20`}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold font-mono transition-all duration-300 border ${
                      isActive
                        ? 'bg-cyan-400 text-zinc-950 border-cyan-300 scale-125 shadow-[0_0_20px_rgba(34,211,238,0.8)]'
                        : 'bg-zinc-900/80 text-cyan-300 border-cyan-500/30 hover:border-cyan-400 hover:scale-110'
                    }`}
                  >
                    {item.metric}
                  </span>

                  {/* Tooltip on Hover */}
                  <span className="absolute bottom-full mb-2 hidden group-hover:block whitespace-nowrap rounded-md bg-zinc-800 px-2 py-1 text-[10px] text-zinc-200 border border-zinc-700 shadow-xl z-30">
                    {item.title}
                  </span>
                </button>
              )
            })}

            {/* Cutout Center Object (Molecule Image without BG) */}
            <div className="relative z-10 w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center rounded-full border border-cyan-500/20 bg-zinc-950/80 shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden">
              <motion.div
                key={activeIdx}
                initial={{ scale: 0.9, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <img
                  src="/images/v2/molecule.png"
                  alt="Isolated glass molecule model"
                  className="absolute inset-0 h-full w-full object-contain p-4 drop-shadow-[0_0_25px_rgba(34,211,238,0.5)]"
                />
              </motion.div>
            </div>
          </div>

          {/* Active Detail Display Card */}
          <div className="lg:col-span-5">
            {!activeItem ? (
              <div
                aria-hidden="true"
                className="h-72 animate-pulse rounded-2xl border border-cyan-500/20 bg-zinc-900/60"
              />
            ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-cyan-500/20 bg-zinc-900/60 p-8 backdrop-blur-md shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full pointer-events-none" />

                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="rounded-md border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs font-medium text-cyan-400">
                      {activeItem.organization}
                  </span>
                  
                </div>

                <h3 className="font-display text-2xl font-semibold text-white mb-3">
                  {activeItem.title}
                </h3>

                <p className="text-sm leading-relaxed text-zinc-300 mb-6">
                  {activeItem.body}
                </p>

                {/* Progress / Selector indicator */}
                <div className="flex items-center justify-between border-t border-zinc-800 pt-4 text-xs text-zinc-500">
                  <span>
                    Accomplishment {activeIdx + 1} of {totalItems}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setActiveIdx((prev) => (prev > 0 ? prev - 1 : totalItems - 1))
                      }
                      className="p-1 hover:text-cyan-400 transition"
                      aria-label="Previous accomplishment"
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={() =>
                        setActiveIdx((prev) => (prev < totalItems - 1 ? prev + 1 : 0))
                      }
                      className="p-1 hover:text-cyan-400 transition"
                      aria-label="Next accomplishment"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}