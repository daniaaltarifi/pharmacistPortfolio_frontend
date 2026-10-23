
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { profile } from '@/lib/portfolio-data'
import { SectionTitle } from './section-title'
import { Reveal, ScrollRevealText } from './motion-primitives'

const statement =
  `Multi-talent & skilled Individual with high degree of
adaptability with & within different departments & teams for
the sake of business success. It’s not just tenders nor sales
& marketing or BI but also the capability to seek/develop
potential business opportunities either existing or new. An
Individual of multi-dimensional look that helped having an
excellent networking & bridges on all levels, intra & intercompany & entities built on credibility, sincerity & compliance
for a mutual win-win situation.`

export function About() {
  const imageRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6">
        <SectionTitle symbol="Ab" label="About" title="From Ground Level Execution to Complex Strategic Missions" />

        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <ScrollRevealText
            text={statement}
            className="font-display text-2xl font-medium leading-snug tracking-tight md:text-3xl lg:col-span-7"
          />

          <div className="flex flex-col gap-6 lg:col-span-5">
            <div ref={imageRef} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <motion.div style={{ y }} className="absolute -inset-y-[12%] inset-x-0">
                <img
                  src="/images/v2/boardroom.png"
                  alt="Executive presenting to a board in a glass-walled boardroom at dusk"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </motion.div>
            </div>
            <Reveal className="flex flex-col gap-3 text-base leading-relaxed text-muted-foreground">
              {/* <p>
                As CEO of {profile.company}, I lead a vertically integrated group spanning sterile manufacturing,
                regional distribution and a 140-branch pharmacy network.
              </p> */}
              <p> My vision is based on
                cumulative results, achieved as a team & as an Individual, & my understanding for the market
                complexity that has grown with my career, armed with the beliefs I have “Innovation &
                Initiation are the Keys for Business Success”.
              </p>
              <p>
                My Objective is to have a Noticeable Fingerprint on Business Results Development
                , Actions Speak Louder Than Words nor Interviews.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
