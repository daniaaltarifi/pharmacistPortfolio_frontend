import { ArrowUpRight } from 'lucide-react'
import { useAwards } from '@/hooks/use-awards'
import { SectionTitle } from './section-title'
import { Reveal } from './motion-primitives'

export function Awards() {
  const { awards } = useAwards()

  return (
  
    <section id="awards" className="py-24 lg:py-32">
  <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6">
    <SectionTitle symbol="Aw" label="Awards & Recognitions" title="Moments of recognition." />

    <ol className="flex flex-col border-t border-border">
      {awards.map((award, i) => (
        <li key={award.id ?? award.title}>
          <Reveal delay={i * 0.05}>
            <div className="group relative overflow-hidden border-b border-border">
              {/* Hover Background Accent */}
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100"
              />

              {/* Main Header Row */}
              <div className="relative grid grid-cols-12 items-center gap-4 px-2 py-7 md:px-4">
                <span className="col-span-3 font-display text-lg tabular-nums text-primary transition-colors group-hover:text-primary-foreground md:col-span-2">
                  {award.year}
                </span>
                <h3 className="col-span-9 font-display text-xl font-medium tracking-tight transition-colors group-hover:text-primary-foreground md:col-span-5 md:text-2xl">
                  {award.title}
                </h3>
                <p className="col-span-9 col-start-4 text-sm text-muted-foreground transition-colors group-hover:text-primary-foreground/80 md:col-span-4 md:col-start-auto">
                  {award.issuer}
                </p>
                <ArrowUpRight
                  aria-hidden="true"
                  className="hidden size-5 justify-self-end text-muted-foreground transition-all group-hover:rotate-45 group-hover:text-primary-foreground md:col-span-1 md:block"
                />
              </div>

              {/* Expandable Content Drawer (only when there is something to show) */}
              {(award.imageUrl || award.description) && (
                <div className="relative grid grid-rows-[0fr] transition-all duration-500 ease-in-out group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-6 px-2 pb-7 text-primary-foreground md:flex-row md:items-center md:px-4">
                      {award.imageUrl && (
                        <img
                          src={award.imageUrl}
                          alt={award.title}
                          loading="lazy"
                          className="h-32 w-48 rounded-lg object-cover shadow-md"
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
          </Reveal>
        </li>
      ))}
    </ol>
  </div>
</section>
  )
}
