import { profile } from '@/lib/portfolio-data'

// TODO: replace with Dania's LinkedIn profile URL
const DEVELOPER_LINKEDIN = 'https://www.linkedin.com/in/dania-altarifi'

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <span>
          {'© '}
          {new Date().getFullYear()} {profile.name}, {profile.credentials}
        </span>
        <span>{profile.title}</span>
        <span>
          Powered by{' '}
          <a
            href={DEVELOPER_LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium  underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            DaniaTech
          </a>
        </span>
      </div>
    </footer>
  )
}
