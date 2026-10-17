import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { navLinks } from '@/data/content'
import { cn } from '@/lib/utils'

export function Wordmark({ className }: { className?: string }) {
  return (
    <a
      href="#top"
      aria-label="Amr Mashaal, back to top"
      className={cn(
        'font-display text-xl font-bold tracking-tight outline-offset-4 focus-visible:outline-2 focus-visible:outline-signal-light',
        className,
      )}
    >
      AM<span className="text-signal">.</span>
    </a>
  )
}

/** Tracks which section is nearest the top of the viewport. */
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>('')
  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.35
      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])
  return active
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(navLinks.map((l) => l.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /** Close the sheet first so scroll lock is released, then update the hash. */
  const goTo = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault()
    setOpen(false)
    window.setTimeout(() => {
      window.location.hash = id
    }, 220)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled
          ? 'border-white/10 bg-ink/85 backdrop-blur-md'
          : 'border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between px-5 text-paper sm:px-8 lg:px-12">
        <Wordmark />

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? 'true' : undefined}
              className={cn(
                'group relative py-2 text-sm text-paper/70 transition-colors hover:text-paper focus-visible:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-light',
                active === link.id && 'text-paper',
              )}
            >
              {link.label}
              <span
                aria-hidden
                className={cn(
                  'absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-signal-light transition-transform duration-300 group-hover:scale-x-100',
                  active === link.id && 'scale-x-100',
                )}
              />
            </a>
          ))}
          <Button asChild size="sm" className="rounded-full bg-signal px-4 text-white hover:bg-signal-light hover:text-ink">
            <a href="#contact">
              Contact <ArrowUpRight aria-hidden />
            </a>
          </Button>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-11 text-paper hover:bg-white/10 hover:text-paper md:hidden"
              aria-label="Open menu"
            >
              <Menu aria-hidden className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[min(86vw,22rem)] border-white/10 bg-ink text-paper [&>button]:text-paper"
          >
            <SheetHeader className="text-left">
              <SheetTitle className="font-display text-paper">
                Menu
              </SheetTitle>
              <SheetDescription className="font-mono text-xs text-paper/50">
                Jump to a section
              </SheetDescription>
            </SheetHeader>
            <nav aria-label="Mobile" className="flex flex-col px-4">
              {navLinks.map((link, i) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={goTo(link.id)}
                  className="flex items-baseline gap-4 border-t border-white/10 py-5 font-display text-3xl font-medium focus-visible:outline-2 focus-visible:outline-signal-light"
                >
                  <span className="font-mono text-xs text-signal-light">
                    0{i + 1}
                  </span>
                  {link.label}
                </a>
              ))}
              <Button
                asChild
                size="lg"
                className="mt-8 h-12 rounded-full bg-signal text-white hover:bg-signal-light hover:text-ink"
              >
                <a href="#contact" onClick={goTo('contact')}>
                  Get in touch <ArrowUpRight aria-hidden />
                </a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
