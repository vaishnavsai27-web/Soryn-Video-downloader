import { useId } from 'react'
import type { CSSProperties } from 'react'
import { BRAND } from '../../config/brand'
import { WORDMARK_PATH, WORDMARK_VIEWBOX } from './wordmark'
import './SorynLogo.css'

/**
 * Soryn logo: a V-shaped horizon with a sun rising out from behind it.
 *
 * Geometry lives on a 64 x 64 grid:
 *   - the V is one polygon (flat-topped chevron, tip at y = 60)
 *   - the sun sits on the V's axis and is drawn *behind* the V, so as it
 *     rises it emerges from the notch of the V
 *
 * Animation is pure CSS (transform + opacity only) and is switched off by
 * `animated={false}` or by the user's `prefers-reduced-motion` setting. The
 * un-animated state is the finished logo, so nothing depends on JS or CSS
 * animation support to look right.
 *
 * The favicon (public/favicon.svg) and the pre-React loading splash in
 * index.html reuse the same geometry; keep them in sync if the V changes.
 */

const V_POINTS = '6,12 19,12 32,36 45,12 58,12 32,60'

type Variant = 'full' | 'mark' | 'responsive'

interface SorynLogoProps {
  /**
   * `full` = symbol + wordmark, `mark` = symbol only,
   * `responsive` = full, collapsing to symbol-only on narrow screens.
   */
  variant?: Variant
  /** Play the sunrise / glow / light-sweep animation. Defaults to true. */
  animated?: boolean
  /** Height of the symbol in px (the wordmark scales with it). */
  height?: number
  className?: string
}

function SorynMark({ animated }: { animated: boolean }) {
  // useId output contains characters that are awkward inside url(#...)
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const id = (name: string) => `soryn-${name}-${uid}`

  return (
    <svg
      className="soryn-mark"
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
      data-animated={animated}
    >
      <defs>
        <linearGradient id={id('v')} x1="0" y1="12" x2="0" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F3E2BC" />
          <stop offset="0.55" stopColor="#D2A455" />
          <stop offset="1" stopColor="#9E6B34" />
        </linearGradient>
        <linearGradient id={id('sun')} x1="0" y1="12" x2="0" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F8CB78" />
          <stop offset="0.5" stopColor="#F09A42" />
          <stop offset="1" stopColor="#D9572B" />
        </linearGradient>
        <radialGradient id={id('glow')} cx="32" cy="21" r="26" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F2A24E" stopOpacity="0.75" />
          <stop offset="0.45" stopColor="#E0743A" stopOpacity="0.22" />
          <stop offset="1" stopColor="#E0743A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('sweep')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFF4D9" stopOpacity="0" />
          <stop offset="0.5" stopColor="#FFF4D9" stopOpacity="0.85" />
          <stop offset="1" stopColor="#FFF4D9" stopOpacity="0" />
        </linearGradient>
        <clipPath id={id('v-clip')}>
          <polygon points={V_POINTS} />
        </clipPath>
        {/* Everything below y = 40 is hidden behind the V anyway; clipping
            there stops the sun poking out beside the tip while it is low. */}
        <clipPath id={id('sky-clip')}>
          <rect x="-12" y="-12" width="88" height="52" />
        </clipPath>
      </defs>

      <g className="sm-glow-in">
        <circle className="sm-glow" cx="32" cy="21" r="26" fill={`url(#${id('glow')})`} />
      </g>

      <g clipPath={`url(#${id('sky-clip')})`}>
        <circle className="sm-sun" cx="32" cy="21" r="8.5" fill={`url(#${id('sun')})`} />
      </g>

      <polygon points={V_POINTS} fill={`url(#${id('v')})`} />

      <g clipPath={`url(#${id('v-clip')})`}>
        <polygon
          className="sm-sweep"
          points="0,0 13,0 5,64 -8,64"
          fill={`url(#${id('sweep')})`}
        />
      </g>
    </svg>
  )
}

function SorynWordmark() {
  return (
    <svg
      className="soryn-wordmark"
      viewBox={WORDMARK_VIEWBOX}
      aria-hidden="true"
      focusable="false"
    >
      <path d={WORDMARK_PATH} fill="currentColor" />
    </svg>
  )
}

export function SorynLogo({
  variant = 'full',
  animated = true,
  height = 40,
  className,
}: SorynLogoProps) {
  const classes = ['soryn-logo', `soryn-logo--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <span
      className={classes}
      role="img"
      aria-label={BRAND.name}
      style={{ '--soryn-h': `${height}px` } as CSSProperties}
    >
      <SorynMark animated={animated} />
      {variant !== 'mark' && <SorynWordmark />}
    </span>
  )
}
