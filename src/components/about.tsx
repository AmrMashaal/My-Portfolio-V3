import { Reveal } from '@/components/reveal'

const principles = [
  ['01', 'Learn by building', 'New tools stick when they’re used on something real.'],
  ['02', 'Write for the next reader', 'Small modules, clear names, code that’s easy to change.'],
  ['03', 'Build what’s useful', 'Practical products over clever demos.'],
] as const

/** Small connected-systems diagram that echoes the hero orbit. */
function SystemSketch() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 320 120"
      className="h-auto w-full max-w-sm text-ink"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <rect x="2" y="30" width="78" height="60" />
      <rect x="121" y="30" width="78" height="60" />
      <rect x="240" y="30" width="78" height="60" />
      <path d="M80 60H121M199 60H240" stroke="var(--color-signal-deep)" strokeDasharray="3 4" />
      <path d="M113 54l8 6-8 6M232 54l8 6-8 6" stroke="var(--color-signal-deep)" />
      <g fill="currentColor" stroke="none" fontFamily="var(--font-mono)" fontSize="10">
        <text x="41" y="64" textAnchor="middle">UI</text>
        <text x="160" y="64" textAnchor="middle">API</text>
        <text x="279" y="64" textAnchor="middle">DB</text>
        <text x="2" y="18" opacity="0.55">React</text>
        <text x="121" y="18" opacity="0.55">Node · Express</text>
        <text x="240" y="18" opacity="0.55">MongoDB · SQL</text>
      </g>
    </svg>
  )
}

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="bg-paper-2 py-24 text-ink sm:py-32"
    >
      <div className="mx-auto grid max-w-[88rem] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12">
        <Reveal className="lg:col-span-3">
          <p className="font-mono text-xs text-ink/60">02 / About</p>
        </Reveal>

        <div className="lg:col-span-9 xl:col-span-8">
          <Reveal>
            <h2
              id="about-title"
              className="font-display text-[clamp(1.9rem,4.2vw,3.5rem)] font-medium leading-[1.12] tracking-[-0.02em]"
            >
              I’m a full-stack developer who likes knowing{' '}
              <span className="text-signal-deep">how things work</span>, from the
              button on screen to the query behind it.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <Reveal delay={0.05} className="space-y-5 leading-relaxed text-ink/75">
              <p>
                I enjoy both halves of a web application: shaping an interface
                that’s clear and pleasant to use, and designing the backend that
                keeps it reliable. Most of my work is with React, TypeScript,
                Node.js and MongoDB.
              </p>
              <p>
                I learn by building, reading documentation and taking things
                apart until I understand them. I care about maintainable code,
                and about making products people can actually use.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <SystemSketch />
              <p className="mt-3 font-mono text-xs text-ink/55">
                fig. 02 — the layers I like to work across
              </p>
            </Reveal>
          </div>

          <Reveal as="div" delay={0.05} className="mt-16">
            <ul className="border-t border-ink/20">
              {principles.map(([n, title, text]) => (
                <li
                  key={n}
                  className="grid gap-1 border-b border-ink/20 py-5 sm:grid-cols-[4rem_1fr_1.4fr] sm:items-baseline sm:gap-6"
                >
                  <span className="font-mono text-xs text-signal-deep">{n}</span>
                  <span className="font-display text-xl font-medium">{title}</span>
                  <span className="text-ink/65">{text}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
