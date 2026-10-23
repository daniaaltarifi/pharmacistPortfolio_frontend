import { motion } from 'motion/react'
import { useReports } from '@/hooks/use-reports'
import { FeaturedCard, NewsRow } from './news'
import { SectionTitle } from './section-title'
import { easeOut } from './motion-primitives'

// Same layout as News (latest report featured, the rest as rows), without category tabs.
export function Reports() {
  const { reports, loading } = useReports()
  const [featured, ...rest] = reports

  return (
    <section id="reports" className="border-t border-border py-24 lg:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6">
        <SectionTitle symbol="Rp" label="Reports" title="In-depth analysis and  reports." />

        {loading ? (
          <div aria-hidden="true" className="h-[28rem] animate-pulse rounded-3xl border border-border bg-card" />
        ) : reports.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
            No reports yet.
          </p>
        ) : (
          <div className={`grid gap-6 ${rest.length ? 'lg:grid-cols-12' : ''}`}>
            <div className={rest.length ? 'lg:col-span-7' : ''}>
              <FeaturedCard item={featured} basePath="/reports" cta="Read report" />
            </div>
            {rest.length > 0 && (
              <div className="flex flex-col gap-4 lg:col-span-5">
                {rest.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: easeOut }}
                  >
                    <NewsRow item={item} basePath="/reports" />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
