import { basicData, profile } from '@/lib/portfolio-data'
import { ElementTile } from './element-tile'
import { SectionTitle } from './section-title'
import { Reveal } from './motion-primitives'

export function BasicData() {
  return (
    <section id="basic-data" className="py-24 lg:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6">
        <SectionTitle symbol="ID" label="IDENTIFICATION" title="Personal & Biographical Details." />

        <Reveal>
          <div className="grid gap-8 rounded-2xl border border-border bg-card p-6 md:grid-cols-12 md:p-10">
            <div className="md:col-span-4">
              <ElementTile
                number="22"
                detail="Pharmacist"
                symbol="FA"
                name={profile.name}
                variant="solid"
                size="lg"
                className="w-full max-w-64"
              />
            </div>
            <dl className="grid gap-x-10 sm:grid-cols-2 md:col-span-8">
              {basicData.map((row) => (
                <div key={row.label} className="flex flex-col gap-1 border-b border-border py-4">
                  <dt className="text-sm uppercase tracking-[0.15em] text-muted-foreground">{row.label}</dt>
                  <dd className="font-display text-lg font-medium">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
