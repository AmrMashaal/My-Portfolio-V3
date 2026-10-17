import { ArrowUpRight, ArrowUp, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { Reveal } from '@/components/reveal'
import { Wordmark } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { profile } from '@/data/content'

const year = new Date().getFullYear()

const socials = [
  { label: 'GitHub', href: profile.github, Icon: GithubIcon },
  { label: 'LinkedIn', href: profile.linkedin, Icon: LinkedinIcon },
] as const

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-paper py-24 text-ink sm:py-32"
    >
      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12">
        <Reveal className="lg:col-span-3">
          <p className="font-mono text-xs text-ink/60">04 / Contact</p>
        </Reveal>

        <Reveal className="lg:col-span-9">
          <h2
            id="contact-title"
            className="font-display text-[clamp(2.4rem,6.4vw,5.6rem)] font-semibold leading-[1] tracking-[-0.03em]"
          >
            Have something to build?
            <br />
            <span className="text-signal-deep">Let’s talk.</span>
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/70">
            I’m always glad to hear about a project, a role or just a good
            problem. Email is the quickest way to reach me.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="group h-12 rounded-full bg-ink px-6 text-base text-paper hover:bg-signal"
            >
              <a href={`mailto:${profile.email}`}>
                <Mail aria-hidden />
                {profile.email}
                <ArrowUpRight aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Button>

            {socials.map(({ label, href, Icon }) => (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant="outline"
                    size="icon"
                    className="size-12 rounded-full border-ink/30 bg-transparent hover:border-signal-deep hover:bg-transparent hover:text-signal-deep"
                  >
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${label} (opens in a new tab)`}
                    >
                      <Icon aria-hidden className="size-5" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{label}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <Separator className="bg-white/10" />
        <div className="flex flex-wrap items-center justify-between gap-4 py-8">
          <Wordmark />
          <p className="order-3 w-full font-mono text-xs text-paper/55 sm:order-none sm:w-auto">
            © {year} {profile.name}
          </p>
          <a
            href="#top"
            className="group inline-flex min-h-11 items-center gap-2 font-mono text-xs text-paper/70 transition-colors hover:text-paper focus-visible:outline-signal-light"
          >
            Back to top
            <ArrowUp aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
