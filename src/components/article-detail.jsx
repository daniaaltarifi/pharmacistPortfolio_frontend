import { useEffect } from 'react'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { NewsMeta } from './news'
import { easeOut } from './motion-primitives'

function BackLink({ to, label }) {
  return (
    <Link
      to={to}
      className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      {label}
    </Link>
  )
}

// Shared details page for news and reports: image, meta (category if any + date), title, full description.
// `state` comes from useApiItem: { item, loading, notFound }.
export function ArticleDetail({ state, backTo, backLabel, notFoundTitle }) {
  const { item, loading, notFound } = state

  useEffect(() => {
    if (item) document.title = item.title
  }, [item])

  if (loading) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-24" aria-busy="true">
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
        <div className="aspect-[16/9] w-full animate-pulse rounded-3xl bg-muted" />
        <div className="h-10 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
      </div>
    )
  }

  if (notFound || !item) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 px-6 py-32">
        <h1 className="font-display text-4xl font-medium tracking-tight">{notFoundTitle}</h1>
        <p className="text-muted-foreground">It doesn’t exist or has been removed.</p>
        <BackLink to={backTo} label={backLabel} />
      </div>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOut }}
      className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-16 lg:py-24"
    >
      <BackLink to={backTo} label={backLabel} />

      {item.imageUrl && (
        <div className="overflow-hidden rounded-3xl bg-muted">
          <img src={item.imageUrl} alt={item.title} className="aspect-[16/9] w-full object-cover" />
        </div>
      )}

      <header className="flex flex-col gap-4">
        <NewsMeta item={item} />
        <h1 className="font-display text-4xl font-medium leading-tight tracking-tight text-balance md:text-5xl">
          {item.title}
        </h1>
      </header>

      {/* whitespace-pre-line keeps the paragraph breaks the admin typed in the description */}
      <div className="whitespace-pre-line text-lg leading-relaxed text-pretty text-foreground/90">{item.description}</div>

      {/* Optional external link (news only; reports have none) */}
      {item.link && (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          Read More
          <ExternalLink className="size-4" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}

      <div className="border-t border-border pt-8">
        <BackLink to={backTo} label={backLabel} />
      </div>
    </motion.article>
  )
}
