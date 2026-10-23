
import { motion } from 'motion/react'
import { Link } from 'react-router'
import { ArrowUpRight, FileText } from 'lucide-react'
import { heroFacts, profile } from '@/lib/portfolio-data'
import { ElementTile } from './element-tile'
import { Counter, easeOut } from './motion-primitives'
import idImg from '../assets/id-img.jpeg'
import executiveSummaryPdf from '../assets/Dr.Feras-Al-Tarifi.pdf'
const nameLines = ['Feras', 'Al-Tarifi']

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-28 lg:pb-28 lg:pt-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:items-end">
        <div className="flex flex-col gap-8 lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="text-sm uppercase tracking-[0.25em] text-primary"
          >
            {profile.title}
          </motion.p>

          <h1 className="font-display text-7xl font-medium leading-none tracking-tighter sm:text-8xl xl:text-9xl">
            {nameLines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-2">
                <motion.span
                  className="block"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.15 + i * 0.12, ease: easeOut }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="sr-only">, {profile.credentials}</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: easeOut }}
            className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty"
          >
            {profile.credentials}. Bridging pharmaceutical strategy, Business development, regulatory intelligence, and commercial execution for over 25 years, built on credibility, innovation, and an unwavering commitment to pharma sector and healthcare advancement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: easeOut }}
            className="flex flex-wrap items-center gap-3"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Start a conversation
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href={executiveSummaryPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-foreground transition-colors hover:border-primary"
            >
              Executive Summary
              <FileText className="size-4" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="grid grid-cols-3 gap-6 border-t border-border pt-8"
          >
            {heroFacts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1">
                <dt className="order-2 text-sm leading-snug text-muted-foreground">{fact.label}</dt>
                <dd className="order-1 font-display text-3xl font-medium tracking-tight md:text-4xl">
                  <Counter value={fact.value} />
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="relative lg:col-span-5">
          <motion.div
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 1.3, delay: 0.25, ease: easeOut }}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl"
          >
            <motion.div
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, delay: 0.25, ease: easeOut }}
              className="absolute inset-0"
            >
              <img
                // src="/images/v2/portrait-studio.png"
                src={idImg}
                alt={`Portrait of ${profile.name}`}
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: -4 }}
            transition={{ duration: 0.9, delay: 1, ease: easeOut }}
            className="absolute -bottom-6 -left-4 w-36 sm:w-44 lg:-left-10"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            >
              <ElementTile
                number="22"
                detail="Pharmacist"
                symbol="FA"
                name="Feras Al-Tarifi"
                variant="solid"
                size="lg"
                className="shadow-2xl"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: easeOut }}
            className="absolute -right-2 top-8 rounded-full border border-border bg-background/80 px-4 py-2 text-sm backdrop-blur-md lg:-right-6"
          >
            <span  />
            {profile.company}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
