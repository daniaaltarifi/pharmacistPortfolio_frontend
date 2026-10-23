
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useCertifications } from '@/hooks/use-certifications'
import { SectionTitle } from './section-title'
import { Projects } from './projects'

function CertificationCard({ certification }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1])

  return (
    <article
      ref={ref}
      className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-2xl md:min-h-[28rem] md:grid-cols-2"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted md:aspect-auto">
        {certification.imageUrl && (
          <motion.div style={{ scale }} className="absolute inset-0">
            <img
              src={certification.imageUrl}
              alt={certification.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>
        )}
      </div>
      <div className="flex flex-col justify-between gap-10 p-8 md:p-10">
        <div className="flex flex-col gap-4">
          <span className="w-fit rounded-full border border-primary px-3 py-1 text-sm text-primary">
            {certification.institution}
          </span>
          <h3 className="font-display text-3xl font-medium tracking-tight text-balance">{certification.title}</h3>
          <p className="whitespace-pre-line leading-relaxed text-muted-foreground">{certification.description}</p>
        </div>
        <div className="flex flex-col gap-1 border-t border-border pt-6">
          <span className="font-display text-5xl font-medium tracking-tighter tabular-nums text-primary">
            {certification.year}
          </span>
          <span className="text-sm text-muted-foreground">Year certified</span>
        </div>
      </div>
    </article>
  )
}



export function Certifications() {
  const { certifications, loading } = useCertifications()
  return (
    <section id="projects" className="py-24 lg:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6">
        <SectionTitle symbol="CR" label="Certifications" title="Formulas put into experience." />

        {loading ? (
          <div aria-hidden="true" className="h-[28rem] animate-pulse rounded-2xl border border-border bg-card" />
        ) : certifications.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
            No certifications yet.
          </p>
        ) : (
          <div className="flex flex-col gap-8">
            {certifications.map((certification, i) => (
              <div key={certification.id} className="sticky" style={{ top: `${6 + i * 1.5}rem` }}>
                <CertificationCard certification={certification} />
              </div>
            ))}
          </div>
        )}

   
      </div>


<Projects />
  
  
      
    </section>
  )
}
