import { useCallback, useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { SLIDES, type Slide } from '../content'

export interface SlideDeck {
  index: number
  total: number
  slide: Slide
  goTo: (next: number) => void
  next: () => void
  prev: () => void
  showNotes: boolean
  setShowNotes: Dispatch<SetStateAction<boolean>>
}

const HASH_RE = /^#\/?(\d+)$/

/**
 * Read the current slide index from the URL hash (`#`, `#3`, `#/3`).
 * Returns -1 when the hash carries no valid index; callers clamp to a range.
 */
function parseIndexFromHash(total: number): number {
  const m = HASH_RE.exec(window.location.hash)
  if (!m) return -1
  const n = Number(m[1])
  return Number.isInteger(n) && n >= 0 && n < total ? n : -1
}

/** Persist the slide index to the URL, using a `#N` hash for slides 1+ and no hash for slide 0. */
function writeHash(index: number): void {
  const target = index > 0 ? `#${index}` : ''
  // Skip when already in sync to avoid redundant history entries.
  if (window.location.hash === target) return

  if (index > 0) {
    window.location.hash = target
  } else {
    // Slide 0: drop the hash entirely but still record a history entry so back/forward work.
    history.pushState(null, '', window.location.pathname + window.location.search)
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  }
}

export function useSlideDeck(training: boolean): SlideDeck {
  const total = SLIDES.length
  const [index, setIndex] = useState(() => {
    const fromHash = parseIndexFromHash(total)
    return fromHash >= 0 ? fromHash : 0
  })
  const [showNotes, setShowNotes] = useState(false)
  const slide = SLIDES[Math.min(index, total - 1)] ?? SLIDES[0]

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(total - 1, next))
      setIndex(clamped)
      writeHash(clamped)
      setShowNotes(false)
    },
    [total],
  )
  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    const onHashChange = (): void => {
      const fromHash = parseIndexFromHash(total)
      if (fromHash >= 0) setIndex(fromHash)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [total])

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          e.preventDefault()
          next()
          break
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          prev()
          break
        case 'Home':
          e.preventDefault()
          goTo(0)
          break
        case 'End':
          e.preventDefault()
          goTo(total - 1)
          break
        case 'n':
        case 'N':
          if (training) setShowNotes((v) => !v)
          break
        case 'Escape':
          setShowNotes(false)
          break
        case 'f':
        case 'F':
          if (document.fullscreenElement) void document.exitFullscreen()
          else void document.documentElement.requestFullscreen().catch(() => undefined)
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, goTo, total, training])

  return { index, total, slide, goTo, next, prev, showNotes, setShowNotes }
}
