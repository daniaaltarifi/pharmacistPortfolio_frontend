
import { motion } from 'motion/react'
import { GraduationCap } from 'lucide-react'
import { education } from '@/lib/portfolio-data'
import { SectionTitle } from './section-title'
import { easeOut, Reveal } from './motion-primitives'

export function Education() {
  return (
    <section id="education" className="border-y border-border bg-card/40 py-24 lg:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6">
        <SectionTitle symbol="Ed" label="Education" title="Trained in science. Sharpened in business." />

        <div className="relative">
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: easeOut }}
            className="absolute left-0 right-0 top-5 hidden h-px origin-left bg-primary md:block"
          />
          <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
            {education.map((e, i) => (
              <li key={e.degree}>
                <Reveal delay={0.2 + i * 0.15} className="flex flex-col gap-5">
                  <span className="relative flex size-10 items-center justify-center rounded-full border border-primary bg-background text-primary">
                    <GraduationCap className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm tabular-nums text-primary">{e.years}</span>
                  <h3 className="font-display text-2xl font-medium leading-snug tracking-tight text-balance">{e.degree}</h3>
                  <p className="text-foreground">{e.school}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{e.note}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
