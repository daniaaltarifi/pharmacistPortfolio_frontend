
import { motion } from 'motion/react'
import { useSkills, useTrainings } from '@/hooks/use-trainings-skills'
import { ElementTile } from './element-tile'
import { SectionTitle } from './section-title'
import { easeOut, Reveal } from './motion-primitives'

export function TrainingsSkills() {
  const { trainings } = useTrainings()
  const { skills } = useSkills()

  return (
    <section id="skills" className="border-y border-border bg-card/40 py-24 lg:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6">
        <SectionTitle symbol="Ts" label="SKILLS & ACUMEN" title="Executive Competencies & Strategic Skillset." />

        <div className="grid gap-14 lg:grid-cols-12">
          <div className="flex flex-col gap-10 lg:col-span-5">
            <div className="flex flex-col gap-4">
              <h3 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Executive trainings</h3>
              <ul className="flex flex-col">
                {trainings.map((t, i) => (
                  <li key={t.id ?? t.title} className="border-b border-border">
                    <Reveal delay={i * 0.05} className="flex items-baseline justify-between gap-4 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-display text-lg font-medium leading-snug">{t.title}</span>
                        <span className="text-sm text-muted-foreground">{t.provider}</span>
                      </div>
                      <span className="text-sm tabular-nums text-primary">{t.year}</span>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>

           
          </div>

          <div className="flex flex-col gap-4 lg:col-span-7">
            <h3 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Core skills</h3>
            {/* auto-fill: as many ~7.5rem tiles per row as the width allows, on every screen size */}
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-3">
              {skills.map((s, i) => (
                <motion.li
                  key={s.id ?? s.symbol}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: (i % 4) * 0.06 + Math.floor(i / 4) * 0.1, ease: easeOut }}
                  whileHover={{ y: -4 }}
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
        </div>
      </div>
    </section>
  )
}
