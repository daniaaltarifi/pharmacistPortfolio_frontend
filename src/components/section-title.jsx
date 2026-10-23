import { cn } from '@/lib/utils'
import { Reveal } from './motion-primitives'

export function SectionTitle({
  symbol,
  label,
  title,
  className,
}) {
  return (
    <Reveal className={cn('flex flex-col gap-5', className)}>
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex size-10 items-center justify-center rounded-md border border-primary font-display text-sm font-medium text-primary"
        >
          {symbol}
        </span>
        <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      </div>
      <h2 className="max-w-3xl font-display text-4xl font-medium leading-tight tracking-tight text-balance md:text-5xl">
        {title}
      </h2>
    </Reveal>
  )
}
