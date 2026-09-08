import type { ReactNode } from 'react'
import type { Slide } from '../content'

export interface SlideMeta {
  id: number
  title: string
}

export function ProgressHeader({
  index,
  total,
  items,
  onGo,
}: {
  index: number
  total: number
  items: SlideMeta[]
  onGo: (next: number) => void
}): React.JSX.Element {
  return (
    <header className="topbar">
      <div className="brand">
        <i aria-hidden="true" /> Dunkle Materie · B2-Vortrag
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={index + 1}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label="Fortschritt"
      >
        <div className="progress-fill" style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>
      <nav className="dots" aria-label="Folien wählen">
        {items.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Zu Folie ${i + 1}: ${s.title}`}
            aria-current={i === index ? 'step' : undefined}
            title={`${i + 1} · ${s.title}`}
            className={i === index ? 'dot active' : i < index ? 'dot done' : 'dot'}
            onClick={() => onGo(i)}
          />
        ))}
      </nav>
    </header>
  )
}

export function ControlsFooter({
  index,
  total,
  training,
  onPrev,
  onNext,
  onToggleNotes,
}: {
  index: number
  total: number
  training: boolean
  onPrev: () => void
  onNext: () => void
  onToggleNotes: () => void
}): React.JSX.Element {
  return (
    <footer className="controls">
      <button
        type="button"
        className="nav-btn"
        onClick={onPrev}
        disabled={index === 0}
        aria-label="Zurück"
      >
        ← Zurück
      </button>

      <div className="center-hint">
        <span className="section-count">
          {index + 1} / {total}
        </span>
        <span>
          <kbd>←</kbd> <kbd>→</kbd> blättern
        </span>
        {training && (
          <span>
            <kbd>N</kbd> Notizen
          </span>
        )}
        <span>
          <kbd>F</kbd> Vollbild
        </span>
        {training && (
          <button
            type="button"
            className="icon-btn"
            onClick={onToggleNotes}
            aria-label="Sprechernotizen umschalten"
            title="Notizen (N)"
          >
            🗒
          </button>
        )}
      </div>

      <button
        type="button"
        className="nav-btn primary"
        onClick={onNext}
        disabled={index === total - 1}
        aria-label="Weiter"
      >
        Weiter →
      </button>
    </footer>
  )
}

export function NotesOverlay({
  index,
  notes,
  onClose,
}: {
  index: number
  notes: string[]
  onClose: () => void
}): React.JSX.Element {
  return (
    <aside
      className="notes"
      role="dialog"
      aria-modal="false"
      aria-label="Sprechernotizen"
      onClick={onClose}
    >
      <h4>Notizen · Folie {index + 1} — nur für dich</h4>
      <ul>
        {notes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
      <div className="close-hint">
        Versteckt fürs Publikum · Klick oder <kbd>N</kbd> zum Schließen
      </div>
    </aside>
  )
}

export function SlideShell({
  slide,
  index,
  total,
  children,
}: {
  slide: Slide
  index: number
  total: number
  children: ReactNode
}): React.JSX.Element {
  const single = slide.layout === 'single'
  return (
    <section
      key={slide.id}
      className={single ? 'stage single slide-anim' : 'stage slide-anim'}
      aria-roledescription="Folie"
      aria-label={`Folie ${index + 1} von ${total}: ${slide.title}`}
    >
      <span
        className="sr-only"
        aria-live="polite"
      >{`Folie ${index + 1} von ${total}: ${slide.title}`}</span>
      {children}
    </section>
  )
}
