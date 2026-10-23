// "2026-09-18" -> "18 Sept 2026". timeZone UTC so a date-only value never shifts a day in negative-offset time zones.
export const formatDate = (iso) =>
  new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(iso),
  )
