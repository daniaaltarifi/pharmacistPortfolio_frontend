import { useProfiles } from '@/hooks/use-profiles'
import { SectionTitle } from './section-title'
import { Reveal } from './motion-primitives'

// h-full: both cards in a row take the height of the taller one, so the row reads as one even band.
function ProfileCard({ item }) {
  return (
    <article className="flex h-full flex-col gap-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <span className="font-display text-sm tracking-wide text-primary">{item.startYear} - {item.endYear ?? 'Present'}</span>
        <span className="text-right text-sm text-muted-foreground">{item.place}</span>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-2xl font-medium tracking-tight text-balance">{item.role}</h3>
        <p className="text-muted-foreground">{item.org}</p>
      </div>
      <p className="leading-relaxed text-pretty">{item.summary}</p>
      {item.points?.length > 0 && (
        <ul className="flex flex-col gap-3 border-t border-border pt-6">
          {item.points.map((point, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
              {point}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export function Profile() {
  const { profiles } = useProfiles()

  return (
    <section id="profile" className="border-y border-border bg-card/40 py-24 lg:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6">
        <SectionTitle symbol="Pp" label="Professional Profile" title={'Diverse Roles. One Goal. Mission Achieved.'} />

        {/* One card per row on phones, two per row from tablets up. Newest role first, read left to right. */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {profiles.map((item, i) => (
            <Reveal key={item.id ?? item.role} delay={(i % 2) * 0.08} className="h-full">
              <ProfileCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
