import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ease } from '@/lib/motion'
import { profile } from '@/data/content'

/** Points on the orbit where the three layers of a full-stack app sit. */
const nodes = [
  { cx: 488, cy: 204, label: 'UI' },
  { cx: 32, cy: 396, label: 'API' },
  { cx: 255, cy: 424, label: 'DB' },
] as const

/**
 * Portrait composition: a dark panel with a fine grid, the portrait on top,
 * and an orbit whose back half passes behind the image and front half in front,
 * linking UI, API and DB nodes. The orbit is the site's one signature motif.
 */
export function Portrait() {
  const reduce = useReducedMotion()
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading')
  const failed = status === 'failed'

  useEffect(() => {
    const probe = new Image()
    probe.onload = () => setStatus('ready')
    probe.onerror = () => setStatus('failed')
    probe.src = profile.portrait
    return () => {
      probe.onload = null
      probe.onerror = null
    }
  }, [])

  const draw = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { duration: 1.6, ease, delay },
        }

  return (
    <motion.figure
      className="relative mx-auto w-full max-w-[26rem] lg:max-w-none"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease, delay: 0.25 }}
    >
      {/* Offset outline frame */}
      <div
        aria-hidden
        className="absolute inset-0 translate-x-4 translate-y-4 border border-signal/60 sm:translate-x-6 sm:translate-y-6"
      />

      {/* Portrait panel */}
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-2 ring-1 ring-white/10">
        <svg
          aria-hidden
          className="absolute inset-0 size-full text-white/[0.07]"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M32 0H0V32" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {failed ? (
          <div
            role="img"
            aria-label="Portrait placeholder for Amr Mashaal"
            className="absolute inset-0 grid place-items-center"
          >
            <span className="font-display text-[7rem] font-bold leading-none tracking-tighter text-paper/90">
              AM<span className="text-signal">.</span>
            </span>
          </div>
        ) : status === 'ready' ? (
          <img
            src={profile.portrait}
            alt="Portrait of Amr Mashaal"
            width={800}
            height={1000}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 size-full object-cover object-top"
          />
        ) : null}

        {/* Soft ground so a transparent PNG settles into the panel */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink-2/80 to-transparent"
        />

        {/* Corner annotations */}
        <span className="absolute left-3 top-3 font-mono text-[0.65rem] text-paper/50">
          fig. 01
        </span>
        <span className="absolute bottom-3 right-3 font-mono text-[0.65rem] text-paper/50">
          amr.m / {failed ? 'portrait pending' : 'portrait'}
        </span>
      </div>

      {/* Orbit: sits outside the panel and over its edges */}
      <svg
        aria-hidden
        viewBox="0 0 520 600"
        className="pointer-events-none absolute -inset-[6%] size-[112%] overflow-visible"
      >
        <g transform="rotate(-18 260 300)" fill="none">
          <motion.ellipse
            cx="260"
            cy="300"
            rx="250"
            ry="118"
            stroke="var(--color-signal)"
            strokeWidth="1.25"
            strokeOpacity="0.75"
            {...draw(0.6)}
          />
          <motion.path
            d="M10 300 A250 118 0 0 0 510 300"
            stroke="var(--color-signal-light)"
            strokeWidth="2"
            {...draw(0.9)}
          />
        </g>
        {nodes.map((n, i) => (
          <motion.g
            key={n.label}
            initial={reduce ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease, delay: 1.5 + i * 0.12 }}
            style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
          >
            <circle cx={n.cx} cy={n.cy} r="5" fill="var(--color-ink)" stroke="var(--color-signal-light)" strokeWidth="2" />
            <text
              x={n.cx}
              y={n.cy - 14}
              textAnchor="middle"
              className="fill-paper/70 font-mono"
              fontSize="12"
            >
              {n.label}
            </text>
          </motion.g>
        ))}
      </svg>
      <figcaption className="sr-only">
        Portrait of Amr Mashaal framed by an orbit linking UI, API and database nodes.
      </figcaption>
    </motion.figure>
  )
}
