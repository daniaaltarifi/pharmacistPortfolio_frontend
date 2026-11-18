import { motion } from 'motion/react'
import { useExperiences } from '@/hooks/use-experiences'
import { ElementTile } from './element-tile'
import { easeOut } from './motion-primitives'

// First letter of each word, e.g. "Strategic Leadership" -> "SL"; skips "&" and similar
const initials = (title = '') =>
  title
    .split(/\s+/)
    .filter((word) => /^\p{L}/u.test(word))
    .map((word) => word[0].toUpperCase())
    .join('')
    .slice(0, 3)

export function Experience() {
  const { experiences, loading } = useExperiences()

  return (
    <section id="experience" className="py-24 lg:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Ce - Critical Experiences
          </span>
          <h2 className="font-title text-2xl font-semibold tracking-tight md:text-3xl">Business Diversity</h2>
        </div>

        {/* 1 card per row on phones, 2 per row from tablets up. Cards in a row share the same height. */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {loading &&
            Array.from({ length: 4 }, (_, i) => (
              <div key={`skeleton-${i}`} aria-hidden="true" className="h-44 animate-pulse rounded-2xl border border-border bg-card" />
            ))}

          {experiences.map((c, i) => (
            <motion.article
              key={c.id ?? i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: easeOut }}
              whileHover={{ y: -4 }}
              // Tile beside the text from small screens up, so the wide cards stay compact
              className="flex h-full flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-start"
            >
              <ElementTile
                number={String(i + 1).padStart(2, '0')}
                symbol={initials(c.title)}
                variant={i === 0 ? 'solid' : 'outline'}
                className="w-24 shrink-0"
                size="sm"
              />
              <div className="flex min-w-0 flex-col gap-2">
                <h3 className="font-display text-xl font-medium tracking-tight text-balance">{c.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
