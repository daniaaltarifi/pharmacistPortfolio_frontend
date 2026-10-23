import { cn } from '@/lib/utils'

export function ElementTile({
  number,
  symbol,
  name,
  detail,
  variant = 'outline',
  size = 'md',
  className,
}) {
  return (
    <div
      className={cn(
        'flex aspect-square flex-col justify-between rounded-lg border',
        variant === 'solid'
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-card text-card-foreground',
        size === 'sm' && 'p-3',
        size === 'md' && 'p-4',
        size === 'lg' && 'p-5',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2 text-xs tabular-nums">
        <span>{number}</span>
        {detail ? <span className="opacity-70">{detail}</span> : null}
      </div>
      <span
        className={cn(
          'font-display font-medium leading-none tracking-tight',
          size === 'sm' && 'text-3xl',
          size === 'md' && 'text-5xl',
          size === 'lg' && 'text-7xl',
        )}
      >
        {symbol}
      </span>
      {/* hyphens-auto: long names like "Pharmacoeconomics" break cleanly inside small tiles */}
      <span className={cn('leading-tight opacity-80 hyphens-auto', size === 'sm' ? 'text-xs' : 'text-sm')}>{name}</span>
    </div>
  )
}
