import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '@/components/brand-icons'
import { motion, useReducedMotion } from 'motion/react'
import { Reveal } from '@/components/reveal'
import { Badge } from '@/components/ui/badge'
import { projects, type Project } from '@/data/content'
import { cn } from '@/lib/utils'

/** Typographic composition used until a real screenshot exists. */
function ProjectArt({ project }: { project: Project }) {
  const reduce = useReducedMotion()

  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`Screenshot of ${project.name}`}
        width={1600}
        height={1000}
        loading="lazy"
        decoding="async"
        className="size-full object-cover object-top transition-transform duration-700 ease-out group-hover/art:scale-[1.03]"
      />
    )
  }

  return (
    <div className="relative size-full overflow-hidden bg-ink text-paper">
      <svg aria-hidden className="absolute inset-0 size-full text-white/[0.06]">
        <defs>
          <pattern id={`g-${project.index}`} width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0H0V28" fill="none" stroke="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#g-${project.index})`} />
      </svg>

      {/* Window outline */}
      <div aria-hidden className="absolute inset-[9%] border border-white/15 transition-transform duration-700 ease-out group-hover/art:scale-[1.03]">
        <div className="flex h-7 items-center gap-1.5 border-b border-white/15 px-3">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-1.5 rounded-full bg-white/25" />
          ))}
          <span className="ml-3 font-mono text-[0.6rem] text-white/40">
            {project.name.toLowerCase()}
          </span>
        </div>
        <motion.div
          aria-hidden
          className="absolute left-0 top-7 h-px w-full origin-left bg-signal"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <p className="absolute bottom-[14%] left-[14%] font-display text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-none tracking-[-0.03em]">
        {project.name}
        <span className="text-signal-light">.</span>
      </p>
      <span className="absolute right-[14%] top-[17%] font-mono text-xs text-signal-light">
        screenshot pending
      </span>
    </div>
  )
}

function ProjectLinks({ project }: { project: Project }) {
  const base =
    'group/link inline-flex min-h-11 items-center gap-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-deep'

  if (!project.live && !project.repo) {
    return (
      <p className="font-mono text-xs text-ink/55">
        Live link and repository to be added.
      </p>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-x-7 gap-y-1">
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer noopener"
          className={cn(base, 'text-signal-deep hover:text-ink')}
        >
          View live {project.name}
          <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer noopener"
          className={cn(base, 'font-mono text-ink/70 hover:text-ink')}
        >
          <GithubIcon className="size-4" />
          Source code
          <span className="sr-only">for {project.name} (opens in a new tab)</span>
        </a>
      )}
    </div>
  )
}

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="scroll-mt-16 bg-paper py-24 text-ink sm:py-32"
    >
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <Reveal className="grid items-end gap-6 border-b border-ink/15 pb-8 lg:grid-cols-12">
          <p className="font-mono text-xs text-ink/60 lg:col-span-3">
            01 / Selected work
          </p>
          <h2
            id="projects-title"
            className="font-display text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.025em] lg:col-span-9"
          >
            Things I’ve built
            <br className="hidden sm:block" /> to learn how they work.
          </h2>
        </Reveal>

        <ol className="mt-4">
          {projects.map((project, i) => {
            const flip = i % 2 === 1
            return (
              <Reveal
                as="li"
                key={project.name}
                className="grid items-center gap-8 border-b border-ink/15 py-12 last:border-b-0 lg:grid-cols-12 lg:gap-12 lg:py-20"
              >
                <div
                  className={cn(
                    'group/art aspect-[8/5] overflow-hidden ring-1 ring-ink/10 transition-shadow duration-500 hover:shadow-[8px_8px_0_0_var(--color-signal)]',
                    flip ? 'lg:order-2 lg:col-span-7' : 'lg:col-span-7',
                  )}
                >
                  <ProjectArt project={project} />
                </div>

                <div className={cn('lg:col-span-5', flip && 'lg:order-1 lg:pr-6', !flip && 'lg:pl-4')}>
                  <p className="flex items-center gap-3 font-mono text-xs text-ink/60">
                    <span className="text-signal-deep">{project.index}</span>
                    <span aria-hidden className="h-px w-6 bg-ink/30" />
                    {project.kind}
                  </p>
                  <h3 className="mt-4 font-display text-[clamp(2.4rem,5vw,4.4rem)] font-semibold leading-none tracking-[-0.03em]">
                    {project.name}
                  </h3>
                  <p className="mt-5 text-lg leading-snug text-ink/85">
                    {project.summary}
                  </p>
                  <p className="mt-3 max-w-md leading-relaxed text-ink/65">
                    {project.purpose}
                  </p>
                  <ul aria-label={`${project.name} technologies`} className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <li key={tech}>
                        <Badge
                          variant="outline"
                          className="rounded-sm border-ink/25 px-2 py-0.5 font-mono text-[0.7rem] font-normal text-ink/75"
                        >
                          {tech}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <ProjectLinks project={project} />
                  </div>
                </div>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
