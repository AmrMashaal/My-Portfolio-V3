import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Portrait } from '@/components/portrait'
import { ease } from '@/lib/motion'
import { profile } from '@/data/content'

const lines = ['Thoughtful web apps,', 'from the interface', 'to the database.']

export function Hero() {
  const reduce = useReducedMotion()
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease, delay },
  })

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-x-clip bg-ink text-paper"
    >
      {/* Fine vertical rules give the dark section a quiet structure */}
      <div aria-hidden className="pointer-events-none absolute inset-0 mx-auto grid max-w-[88rem] grid-cols-4 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border-l border-white/[0.05] last:border-r" />
        ))}
      </div>

      <div className="relative mx-auto grid min-h-svh max-w-[88rem] items-center gap-14 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:pb-24">
        <div className="lg:col-span-7">
          <motion.p
            {...rise(0)}
            className="flex items-center gap-3 font-mono text-xs text-paper/60 sm:text-sm"
          >
            <span aria-hidden className="h-px w-8 bg-signal" />
            Full-stack developer
          </motion.p>

          <h1
            id="hero-title"
            className="mt-6 font-display text-[clamp(2.2rem,8.4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.02em] sm:text-[clamp(3rem,7vw,4.6rem)] lg:text-[clamp(3.2rem,5vw,5rem)]"
          >
            {lines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.1em] sm:whitespace-nowrap">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease, delay: 0.1 + i * 0.1 }}
                >
                  {i === 2 ? (
                    <>
                      to the <span className="text-signal-light">database.</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            {...rise(0.55)}
            className="mt-8 max-w-[34rem] text-base leading-relaxed text-paper/70 sm:text-lg"
          >
            I’m Amr Mashaal. I design and build full-stack web applications,
            with equal care for how they feel to use and how they’re put
            together underneath.
          </motion.p>

          <motion.div {...rise(0.7)} className="mt-9 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="group h-12 rounded-full bg-signal px-6 text-base text-white hover:bg-signal-light hover:text-ink"
            >
              <a href="#projects">
                Explore My Work
                <ArrowDown aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group h-12 rounded-full border-white/25 bg-transparent px-6 text-base text-paper hover:border-paper hover:bg-transparent hover:text-paper"
            >
              <a href="#contact">
                Get in Touch
                <ArrowUpRight aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Button>
          </motion.div>

          <motion.p
            {...rise(0.85)}
            className="mt-10 flex items-center gap-2 font-mono text-xs text-paper/55"
          >
            <MapPin aria-hidden className="size-3.5 text-signal-light" />
            Based in {profile.location}
          </motion.p>
        </div>

        <div className="lg:col-span-5 lg:pl-6 lg:pr-4 xl:pr-8">
          <Portrait />
        </div>
      </div>
    </section>
  )
}
