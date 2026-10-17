import { Reveal } from '@/components/reveal'
import { skillGroups } from '@/data/content'

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="bg-ink py-24 text-paper sm:py-32"
    >
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <Reveal className="grid items-end gap-6 pb-10 lg:grid-cols-12">
          <p className="font-mono text-xs text-paper/55 lg:col-span-3">03 / Skills</p>
          <h2
            id="skills-title"
            className="font-display text-[clamp(2.1rem,4.6vw,3.8rem)] font-semibold leading-[1.04] tracking-[-0.025em] lg:col-span-9"
          >
            The tools I reach for.
          </h2>
        </Reveal>

        <Reveal>
          <dl className="border-t border-white/15">
            {skillGroups.map((group) => (
              <div
                key={group.label}
                className="group grid gap-4 border-b border-white/15 py-7 transition-colors duration-300 hover:bg-white/[0.025] lg:grid-cols-12 lg:gap-10 lg:px-2"
              >
                <dt className="lg:col-span-3">
                  <span className="block font-display text-2xl font-medium transition-colors group-hover:text-signal-light">
                    {group.label}
                  </span>
                  <span className="mt-1 block text-sm text-paper/55">{group.note}</span>
                </dt>
                <dd className="lg:col-span-9">
                  <ul className="flex flex-wrap gap-x-2 gap-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-sm border border-white/20 px-3 py-1.5 font-mono text-sm text-paper/85 transition-colors duration-200 hover:border-signal-light hover:text-signal-light"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
