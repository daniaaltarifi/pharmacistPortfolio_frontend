import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useNews } from '@/hooks/use-news'
import { formatDate } from '@/lib/format'
import { SectionTitle } from './section-title'
import { easeOut, Reveal } from './motion-primitives'

const ALL = 'all'

// Shared by news and reports. Reports have no category, so the badge only shows when there is one.
export function NewsMeta({ item, light }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 text-sm ${light ? 'text-white/80' : 'text-muted-foreground'}`}>
      {item.category && (
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider ${
            light ? 'bg-white/15 text-white backdrop-blur-md' : 'bg-primary/10 text-primary'
          }`}
        >
          {item.category.name}
        </span>
      )}
      <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
    </div>
  )
}

// `basePath` decides where the card links to: "/news" -> /news/:id, "/reports" -> /reports/:id.
export function FeaturedCard({ item, basePath = '/news', cta = 'Read story' }) {
  return (
    <Link
      to={`${basePath}/${item.id}`}
      className="group relative flex h-full min-h-[28rem] overflow-hidden rounded-3xl bg-[#08192d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#08192d] via-[#08192d]/60 to-transparent" />
      <article className="relative mt-auto flex flex-col gap-4 p-8 md:p-10">
        <NewsMeta item={item} light />
        <h3 className="max-w-xl font-display text-3xl font-medium leading-tight tracking-tight text-white text-balance md:text-4xl">
          {item.title}
        </h3>
        <p className="line-clamp-3 max-w-xl leading-relaxed text-white/80">{item.description}</p>
        <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#08192d] transition-transform group-hover:-translate-y-0.5">
          {cta}
          <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" aria-hidden="true" />
        </span>
      </article>
    </Link>
  )
}

export function NewsRow({ item, basePath = '/news' }) {
  return (
    <Link
      to={`${basePath}/${item.id}`}
      className="group flex gap-5 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-xl bg-muted sm:w-32">
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
      </div>
      <article className="flex min-w-0 flex-col justify-center gap-2">
        <NewsMeta item={item} />
        <h3 className="font-display text-lg font-medium leading-snug tracking-tight text-balance">{item.title}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
      </article>
    </Link>
  )
}

export function News() {
  const { news } = useNews()
  const [active, setActive] = useState(ALL)

  // One tab per category that actually has news (several news items can share a category).
  const categories = useMemo(() => {
    const byId = new Map(news.map((n) => [n.category.id, n.category]))
    return [{ id: ALL, name: 'All' }, ...byId.values()]
  }, [news])

  const filtered = active === ALL ? news : news.filter((n) => n.category.id === active)
  const [featured, ...rest] = filtered

  return (
    <section id="news" className="border-t border-border bg-card/40 py-24 lg:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle symbol="Nw" label="News & Insights" title="Latest from the lab, the boardroom and the field." />
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter news">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={active === cat.id}
                  onClick={() => setActive(cat.id)}
                  className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors"
                >
                  {active === cat.id && (
                    <motion.span
                      layoutId="news-filter"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative ${active === cat.id ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: easeOut }}
            className={`grid gap-6 ${rest.length ? 'lg:grid-cols-12' : ''}`}
          >
            {featured && (
              <div className={rest.length ? 'lg:col-span-7' : ''}>
                <FeaturedCard item={featured} />
              </div>
            )}
            {rest.length > 0 && (
              <div className="flex flex-col gap-4 lg:col-span-5">
                {rest.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: easeOut }}
                  >
                    <NewsRow item={item} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
