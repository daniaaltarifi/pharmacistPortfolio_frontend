import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useAwards } from '@/hooks/use-awards'
import { SectionTitle } from './section-title'
import { Reveal } from './motion-primitives'

// Hover reveals a row on mouse devices; touch devices have no hover, so a tap toggles it open.
function AwardRow({ award, open, onToggle }) {
  const hasDetails = Boolean(award.imageUrl || award.description)
  const detailsId = `award-details-${award.id ?? award.title}`

  return (
    <div className="group relative overflow-hidden border-b border-border">
      {/* Hover Background Accent */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 origin-left bg-primary transition-transform duration-500 ease-out ${
          open ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
      />

      {/* Main Header Row */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={hasDetails ? open : undefined}
        aria-controls={hasDetails ? detailsId : undefined}
        className="relative grid w-full cursor-pointer grid-cols-12 items-center gap-4 px-2 py-7 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary md:px-4"
      >
        <span
          className={`col-span-3 font-display text-lg tabular-nums transition-colors md:col-span-2 ${open ? 'text-primary-foreground' : 'text-primary group-hover:text-primary-foreground'}`}
        >
          {award.year}
        </span>
        <h3
          className={`col-span-9 font-display text-xl font-medium tracking-tight transition-colors md:col-span-5 md:text-2xl ${open ? 'text-primary-foreground' : 'group-hover:text-primary-foreground'}`}
        >
          {award.title}
        </h3>
        <p
          className={`col-span-9 col-start-4 text-sm transition-colors md:col-span-4 md:col-start-auto ${open ? 'text-primary-foreground/80' : 'text-muted-foreground group-hover:text-primary-foreground/80'}`}
        >
          {award.issuer}
        </p>
        <ArrowUpRight
          aria-hidden="true"
          className={`hidden size-5 justify-self-end transition-all md:col-span-1 md:block ${open ? 'rotate-45 text-primary-foreground' : 'text-muted-foreground group-hover:rotate-45 group-hover:text-primary-foreground'}`}
        />
      </button>

      {/* Expandable Content Drawer (only when there is something to show) */}
      {hasDetails && (
        <div
          id={detailsId}
          className={`relative grid transition-all duration-500 ease-in-out ${
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] group-hover:grid-rows-[1fr]'
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-6 px-2 pb-7 text-primary-foreground md:flex-row md:items-center md:px-4">
              {award.imageUrl && (
                <img
                  src={award.imageUrl}
                  alt={award.title}
                  loading="lazy"
                  className="aspect-[3/2] w-full max-w-xs rounded-lg object-cover shadow-md md:h-32 md:w-48"
                />
              )}
              {award.description && (
                <p className="max-w-2xl text-sm leading-relaxed opacity-90">{award.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function Awards() {
  const { awards } = useAwards()
  const [openKey, setOpenKey] = useState(null)

  return (
    <section id="awards" className="py-24 lg:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6">
        <SectionTitle symbol="Aw" label="Awards & Recognitions" title="Moments of recognition." />

        <ol className="flex flex-col border-t border-border">
          {awards.map((award, i) => {
            const key = award.id ?? award.title
            return (
              <li key={key}>
                <Reveal delay={i * 0.05}>
                  <AwardRow
                    award={award}
                    open={openKey === key}
                    onToggle={() => setOpenKey((current) => (current === key ? null : key))}
                  />
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
