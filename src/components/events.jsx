import { useMemo } from 'react'
import { motion } from 'motion/react'
import { ExternalLink, MapPin, Mic } from 'lucide-react'
import { useEvents } from '@/hooks/use-events'
import { SectionTitle } from './section-title'
import { easeOut, Reveal } from './motion-primitives'

const parse = (iso) => new Date(`${iso}T00:00:00`)
const fmt = (iso, opts) => new Intl.DateTimeFormat('en-GB', opts).format(parse(iso))

// "Copenhagen, Denmark" -> "Denmark"
const countryOf = (location) => location.split(',').pop().trim()

// Optional external link set by the admin (event website, recording, ...). Opens in a new tab.
function EventLink({ href }) {
  if (!href) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 font-medium text-primary underline-offset-4 hover:underline"
    >
      <ExternalLink className="size-4" aria-hidden="true" />
      Visit link
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}

function FeaturedEvent({ event }) {
  return (
    <Reveal>
      <article className="group grid overflow-hidden rounded-3xl border border-border bg-card shadow-xl lg:grid-cols-12">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted lg:col-span-7 lg:aspect-auto lg:min-h-[26rem]">
          {event.imageUrl && (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08192d]/70 to-transparent" />
          <div className="absolute bottom-6 left-6 flex items-end gap-3 text-white">
            <span className="font-display text-7xl font-medium leading-none tracking-tighter tabular-nums">
              {fmt(event.eventDate, { day: '2-digit' })}
            </span>
            <span className="flex flex-col pb-1 font-display leading-tight">
              <span>{fmt(event.eventDate, { month: 'long' })}</span>
              <span className="text-white/70">{fmt(event.eventDate, { year: 'numeric' })}</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-8 p-8 md:p-10 lg:col-span-5">
          <div className="flex flex-col gap-4">
            <span className="w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary-foreground">
              Latest
            </span>
            <h3 className="font-display text-3xl font-medium leading-tight tracking-tight text-balance">{event.title}</h3>
            <p className="leading-relaxed text-muted-foreground">{event.summary}</p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-6 text-sm">
            <span className="flex items-center gap-2 font-medium text-primary">
              <Mic className="size-4" aria-hidden="true" />
              {event.role}
            </span>
            <span className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="size-4" aria-hidden="true" />
              {event.location}
            </span>
            <EventLink href={event.link} />
          </div>
        </div>
      </article>
    </Reveal>
  )
}

function EventCard({ event, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: easeOut }}
      className="relative pl-8 md:pl-10"
    >
      {/* Timeline dot */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-8 flex size-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background"
      >
        <span className="size-1.5 rounded-full bg-primary" />
      </span>

      <article className="group grid gap-5 overflow-hidden rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg sm:grid-cols-[10rem_1fr] md:p-5">
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted sm:aspect-auto sm:min-h-full">
          {event.imageUrl && (
            <img
              src={event.imageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          )}
        </div>
        <div className="flex min-w-0 flex-col gap-3 py-1">
          <time dateTime={event.eventDate} className="font-display text-sm tabular-nums text-primary">
            {fmt(event.eventDate, { day: 'numeric', month: 'short' })}
          </time>
          <h3 className="font-display text-xl font-medium leading-snug tracking-tight text-balance">{event.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{event.summary}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <Mic className="size-4 text-primary" aria-hidden="true" />
              {event.role}
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="size-4 text-primary" aria-hidden="true" />
              {event.location}
            </span>
            <EventLink href={event.link} />
          </div>
        </div>
      </article>
    </motion.li>
  )
}

export function Events() {
  const { events } = useEvents()

  const { latest, byYear, years, stats } = useMemo(() => {
    // The API already returns newest first; sorting again keeps the fallback data correct too.
    const sorted = [...events].sort((a, b) => parse(b.eventDate) - parse(a.eventDate))
    const [latest, ...older] = sorted

    // Group the older events by year for the timeline
    const byYear = older.reduce((acc, e) => {
      ;(acc[e.eventDate.slice(0, 4)] ||= []).push(e)
      return acc
    }, {})

    return {
      latest,
      byYear,
      years: Object.keys(byYear).sort((a, b) => b - a),
      stats: [
        { value: sorted.length, label: 'Events participated' },
        { value: sorted.filter((e) => /keynote/i.test(e.role)).length, label: 'Keynotes delivered' },
        { value: new Set(sorted.map((e) => countryOf(e.location))).size, label: 'Countries' },
      ],
    }
  }, [events])

  return (
    <section id="events" className="py-24 lg:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionTitle symbol="Ev" label="Events & Participation" title="Professional Engagements & Sector Contributions" />
          <Reveal delay={0.1}>
            <dl className="flex gap-8 md:gap-10">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <dt className="order-2 text-sm leading-snug text-muted-foreground">{s.label}</dt>
                  <dd className="order-1 font-display text-4xl font-medium tabular-nums">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {latest && <FeaturedEvent event={latest} />}

        <div className="flex flex-col gap-12">
          {years.map((year) => (
            <div key={year} className="grid gap-6 md:grid-cols-[8rem_1fr] md:gap-10">
              <div className="md:sticky md:top-24 md:self-start">
                <span className="font-display text-5xl font-medium tracking-tighter text-primary/80 tabular-nums">{year}</span>
                <p className="text-sm text-muted-foreground">
                  {byYear[year].length} {byYear[year].length === 1 ? 'event' : 'events'}
                </p>
              </div>
              <ol className="relative flex flex-col gap-5 border-l border-border">
                {byYear[year].map((event, i) => (
                  <EventCard key={event.id} event={event} index={i} />
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
