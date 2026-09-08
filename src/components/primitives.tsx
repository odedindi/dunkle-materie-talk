import type { ReactNode } from 'react'

export function Kicker({ children }: { children: ReactNode }): React.JSX.Element {
  return <p className="kicker">{children}</p>
}

export function SlideKicker({
  kicker,
  duration,
  training,
}: {
  kicker: string
  duration?: string
  training: boolean
}): React.JSX.Element {
  return (
    <p className="kicker">
      {kicker}
      {training && duration ? ` · ${duration}` : null}
    </p>
  )
}

export function SlideTitle({
  level,
  children,
}: {
  level: 1 | 2
  children: ReactNode
}): React.JSX.Element {
  return level === 1 ? (
    <h1 className="slide-title">{children}</h1>
  ) : (
    <h2 className="slide-title">{children}</h2>
  )
}

export function Grad({ children }: { children: ReactNode }): React.JSX.Element {
  return <span className="grad">{children}</span>
}

export function Lead({
  variant = 'default',
  center = false,
  children,
}: {
  variant?: 'default' | 'small'
  center?: boolean
  children: ReactNode
}): React.JSX.Element {
  const cls = ['lead', variant === 'small' ? 'small' : '', center ? 'center' : '']
    .filter(Boolean)
    .join(' ')
  return <p className={cls}>{children}</p>
}

type TickTone = 'default' | 'sky' | 'violet' | 'teal'

const TICK_TONE_CLASSES = {
  default: '',
  sky: 'tick-sky',
  violet: 'tick-violet',
  teal: 'tick-teal',
} as const satisfies Record<TickTone, string>

export function Bullet({
  marker,
  tone = 'default',
  size = 'md',
  children,
}: {
  marker: ReactNode
  tone?: TickTone
  size?: 'md' | 'lg'
  children: ReactNode
}): React.JSX.Element {
  const cls = ['tick', TICK_TONE_CLASSES[tone], size === 'lg' ? 'lg' : ''].filter(Boolean).join(' ')
  return (
    <li>
      <span className={cls}>{marker}</span>
      <span>{children}</span>
    </li>
  )
}

export function BulletList({ children }: { children: ReactNode }): React.JSX.Element {
  return <ul className="bullets">{children}</ul>
}

export function VocabBox({
  words,
  training,
}: {
  words: string[]
  training?: boolean
}): React.JSX.Element | null {
  if (words.length === 0 || !training) return null
  return (
    <div className="vocab" role="note" aria-label="Vokabeln">
      <b>Wörterbox B2:</b> {words.join(' · ')}
    </div>
  )
}

export function PhotoFigure({
  src,
  alt,
  caption,
  eager = false,
}: {
  src: string
  alt: string
  caption?: string
  eager?: boolean
}): React.JSX.Element {
  return (
    <figure className="photo-frame">
      <img className="photo" src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} />
      {caption && <figcaption className="photo-cap">{caption}</figcaption>}
    </figure>
  )
}

type CardAccent = 'sky' | 'violet'

const ACCENT_CLASSES = {
  sky: 'accent-sky',
  violet: 'accent-violet',
} as const satisfies Record<CardAccent, string>

export function MiniCard({
  title,
  accent,
  dashed = false,
  children,
}: {
  title: string
  accent?: CardAccent
  dashed?: boolean
  children: ReactNode
}): React.JSX.Element {
  const cardCls = dashed ? 'mini-card dashed' : 'mini-card'
  const titleCls = accent ? ACCENT_CLASSES[accent] : undefined
  return (
    <div className={cardCls}>
      <h3 className={titleCls}>{title}</h3>
      <p>{children}</p>
    </div>
  )
}
