import { useState } from 'react'
import { motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { useSkills, useTrainings } from '@/hooks/use-trainings-skills'
import { ElementTile } from './element-tile'
import { SectionTitle } from './section-title'
import { easeOut, Reveal } from './motion-primitives'

// Trainings shown before "Show all" (three full rows on desktop)
const INITIAL_TRAININGS = 9

export function TrainingsSkills() {
  const { trainings } = useTrainings()
  const { skills } = useSkills()
  const [showAll, setShowAll] = useState(false)

  const visibleTrainings = showAll ? trainings : trainings.slice(0, INITIAL_TRAININGS)
  const hiddenCount = trainings.length - INITIAL_TRAININGS

  return (
    <section id="skills" className="border-y border-border bg-card/40 py-24 lg:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6">
        <SectionTitle symbol="Ts" label="SKILLS & ACUMEN" title="Executive Competencies & Strategic Skillset." />

        {/* Skills and trainings are stacked (not side by side): there are far more trainings than skills,
            so two columns left a long list next to a short block of tiles. */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Core skills</h3>
          {/* 6 per row on desktop, 4 on tablets, 2 on phones; a last row that is not full is centred.
              Widths subtract the 0.75rem gaps so the row adds up exactly to 100%. */}
          <ul className="flex flex-wrap justify-center gap-3">
            {skills.map((s, i) => (
              <motion.li
                key={s.id ?? s.symbol}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 8) * 0.05, ease: easeOut }}
                whileHover={{ y: -4 }}
                className="w-[calc((100%-0.75rem)/2)] sm:w-[calc((100%-2.25rem)/4)] lg:w-[calc((100%-3.75rem)/6)]"
              >
                <ElementTile
                  number={String(i + 1).padStart(2, '0')}
                  symbol={s.symbol}
                  name={s.name}
                  size="sm"
                  variant={i % 5 === 0 ? 'solid' : 'outline'}
                  className="h-full min-w-0 break-words transition-colors hover:border-primary"
                />
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Executive trainings</h3>
            {trainings.length > 0 && (
              <span className="text-sm tabular-nums text-muted-foreground">{trainings.length} programmes</span>
            )}
          </div>

          {/* 1 column on phones, 2 on tablets, 3 on desktop */}
          <ul id="trainings-list" className="grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:grid-cols-3">
            {visibleTrainings.map((t, i) => (
              <li key={t.id ?? t.title} className="border-b border-border">
                <Reveal delay={(i % INITIAL_TRAININGS) * 0.04} className="flex items-baseline justify-between gap-4 py-4">
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="font-display text-lg font-medium leading-snug break-words">{t.title}</span>
                    <span className="text-sm text-muted-foreground">{t.provider}</span>
                  </div>
                  <span className="shrink-0 text-sm tabular-nums text-primary">{t.year}</span>
                </Reveal>
              </li>
            ))}
          </ul>

          {hiddenCount > 0 && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              aria-controls="trainings-list"
              className="mt-4 inline-flex w-fit items-center gap-2 self-center rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {showAll ? 'Show fewer' : `Show all ${trainings.length} trainings`}
              <ChevronDown
                className={`size-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
