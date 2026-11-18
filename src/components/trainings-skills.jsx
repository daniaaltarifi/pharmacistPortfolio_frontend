import { useState } from 'react'
import { motion } from 'motion/react'
import { ChevronDown, Pill } from 'lucide-react'
import { useSkills, useTrainings } from '@/hooks/use-trainings-skills'
import { ElementTile } from './element-tile'
import { SectionTitle } from './section-title'
import { easeOut, Reveal } from './motion-primitives'

// Trainings shown before "Show all" (three full rows of two cards)
const INITIAL_TRAININGS = 6

// Same look as the certification cards, in a compact horizontal form: image on the left
// (on top on phones), then title, provider and year.
function TrainingCard({ training }) {
  return (
    <article className="grid h-full overflow-hidden rounded-2xl border border-border bg-card shadow-lg sm:grid-cols-[2fr_3fr]">
      <div className="relative flex aspect-[4/3] items-center justify-center bg-muted p-4 sm:aspect-auto sm:min-h-56">
        {training.imageUrl ? (
          // Shown in full (never cropped) with rounded corners on the picture itself
          <img
            src={training.imageUrl}
            alt={training.title}
            loading="lazy"
            className="max-h-full max-w-full rounded-xl shadow-md sm:absolute sm:inset-4 sm:m-auto sm:max-h-[calc(100%-2rem)] sm:max-w-[calc(100%-2rem)]"
          />
        ) : (
          // No image yet: a quiet placeholder instead of an empty box
          <div className="flex flex-col items-center gap-2 text-muted-foreground" aria-hidden="true">
            <Pill className="size-10 text-primary/70" />
            <span className="font-display text-sm tabular-nums">{training.year}</span>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-col justify-between gap-6 p-6">
        <div className="flex flex-col gap-3">
          <h4 className="font-display text-xl font-medium leading-snug tracking-tight break-words text-balance">
            {training.title}
          </h4>
          {/* The provider is the card's description line */}
          <p className="text-sm leading-relaxed text-muted-foreground break-words">{training.provider}</p>
        </div>
        <div className="flex items-baseline gap-2 border-t border-border pt-4">
          <span className="font-display text-3xl font-medium tracking-tighter tabular-nums text-primary">{training.year}</span>
          <span className="text-sm text-muted-foreground">Year completed</span>
        </div>
      </div>
    </article>
  )
}

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

          {/* 1 card per row on phones, 2 per row from tablets up; cards in a row share the same height */}
          <ul id="trainings-list" className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {visibleTrainings.map((t, i) => (
              <li key={t.id ?? t.title}>
                <Reveal delay={(i % 2) * 0.08} className="h-full">
                  <TrainingCard training={t} />
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
