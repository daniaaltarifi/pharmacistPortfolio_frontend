import { useProjects } from '@/hooks/use-projects'

export function Projects() {
  const { projects } = useProjects()

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10 text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Strategic Projects & Milestones
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Combining C-suite vision with specialized regulatory intelligence, academic and business leadership across MENA.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.id ?? project.title}
            className="flex flex-col overflow-hidden rounded-xl border border-border/60 bg-background/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-md"
          >
            {project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={project.title}
                loading="lazy"
                className="aspect-[16/9] w-full object-cover"
              />
            )}
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
              </div>
              {project.highlights.length > 0 && (
                <div className="mt-6 border-t border-border/40 pt-4">
                  <ul className="flex flex-wrap gap-1.5">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
