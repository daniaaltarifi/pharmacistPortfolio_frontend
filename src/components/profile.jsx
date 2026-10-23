
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useProfiles } from '@/hooks/use-profiles'
import { SectionTitle } from './section-title'
import { Reveal } from './motion-primitives'

function ProfileCard({ item }) {
  return (
    <article className="flex w-full flex-col gap-6 rounded-2xl border border-border bg-card p-8 lg:w-[30rem] lg:shrink-0">
      <div className="flex items-center justify-between gap-4">
        <span className="font-display text-sm tracking-wide text-primary">{item.startYear} - {item.endYear ?? 'Present'}</span>
        <span className="text-sm text-muted-foreground">{item.place}</span>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-2xl font-medium tracking-tight">{item.role}</h3>
        <p className="text-muted-foreground">{item.org}</p>
      </div>
      <p className="leading-relaxed text-pretty">{item.summary}</p>
      <ul className="flex flex-col gap-3 border-t border-border pt-6">
        {item.points.map((point, i) => (
          <li key={i}className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
            <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
            {point}
          </li>
        ))}
      </ul>
    </article>
  )
}

export function Profile() {
  const { profiles } = useProfiles()
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [range, setRange] = useState(0)

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) setRange(Math.max(0, trackRef.current.scrollWidth - window.innerWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [profiles]) // re-measure once the cards arrive from the API

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -range])

  return (
    <section id="profile" ref={sectionRef} className="relative border-y border-border bg-card/40 lg:h-[300vh]">
      <div className="flex flex-col gap-12 py-24 lg:sticky lg:top-0 lg:h-screen lg:justify-center lg:overflow-hidden lg:pb-0 lg:pt-16">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-end md:justify-between">
          <SectionTitle symbol="Pp" label="Professional Profile" title={'Diverse Roles. One Goal. Mission Achieved.'} />
          <div className="hidden w-48 flex-col gap-2 lg:flex" aria-hidden="true">
            <span className="text-sm text-muted-foreground">Scroll to travel through time</span>
            <div className="h-px w-full bg-border">
              <motion.div style={{ scaleX: scrollYProgress }} className="h-px origin-left bg-primary" />
            </div>
          </div>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="hidden w-max gap-6 pl-6 pr-24 lg:flex xl:pl-[calc((100vw-80rem)/2+1.5rem)]"
        >
          {profiles.map((item) => (
            <ProfileCard key={item.id ?? item.role} item={item} />
          ))}
        </motion.div>

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 lg:hidden">
          {profiles.map((item, i) => (
            <Reveal key={item.id ?? item.role} delay={i * 0.05}>
              <ProfileCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
