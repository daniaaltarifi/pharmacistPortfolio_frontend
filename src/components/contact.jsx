
import { useState } from 'react'
import { ArrowUpRight, Globe, Mail, MapPin, Phone } from 'lucide-react'
import { profile } from '@/lib/portfolio-data'
import { sendContactMessage } from '@/lib/api'
import { Reveal } from './motion-primitives'

export function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setStatus('sending')
    try {
      await sendContactMessage(data)
      form.reset()
      setStatus('sent')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  const statusText = {
    idle: 'Replies within two business days.',
    sending: 'Sending…',
    sent: 'Thank you — your message has been sent.',
    error,
  }[status]

  const details = [
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
    { icon: Globe, label: profile.linkedin, href: `https://www.linkedin.com/in/feras-al-tarifi-6ab18240` },
    { icon: MapPin, label: profile.location },
  ]

  return (
    <section id="contact" className="pt-16 pb-24 lg:pt-20 lg:pb-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 lg:gap-16">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-primary">
            <span aria-hidden="true" className="h-px w-8 bg-primary" />
            Contact
            <span aria-hidden="true" className="h-px w-8 bg-primary" />
          </span>
          <h2 className="font-display text-4xl font-medium tracking-tight text-balance md:text-5xl">Get in Touch</h2>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            Have a project, partnership or speaking invitation in mind? Send a message and I’ll respond personally.
          </p>
        </Reveal>

        <div className="grid items-start gap-12 lg:grid-cols-12">
          <Reveal className="flex flex-col gap-6 lg:col-span-5">
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              Open to board appointments, advisory mandates, keynote invitations and strategic partnerships in
              pharmaceuticals and healthcare.
            </p>
            <ul className="flex flex-col">
              {details.map(({ icon: Icon, label, href }) => (
                <li key={label} className="border-b border-border">
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group flex items-center gap-4 py-4 transition-colors hover:text-primary"
                    >
                      <Icon className="size-5 text-primary" aria-hidden="true" />
                      <span className="flex-1">{label}</span>
                      <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="flex items-center gap-4 py-4">
                      <Icon className="size-5 text-primary" aria-hidden="true" />
                      {label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 md:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-muted-foreground">
                  Full name
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    className="rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-primary"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-muted-foreground">
                  Email
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-primary"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-2 text-sm text-muted-foreground">
                Message
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="resize-none rounded-lg border border-input bg-background px-4 py-3 text-base leading-relaxed text-foreground outline-none transition-colors focus:border-primary"
                />
              </label>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className={`text-sm ${status === 'error' ? 'text-red-500' : 'text-muted-foreground'}`} aria-live="polite">
                  {statusText}
                </p>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                >
                  Send message
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
