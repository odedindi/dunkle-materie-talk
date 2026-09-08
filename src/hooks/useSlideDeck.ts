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

export function useSlideDeck(training: boolean): SlideDeck {
  const [index, setIndex] = useState(0)
  const [showNotes, setShowNotes] = useState(false)
  const total = SLIDES.length
  const slide = SLIDES[Math.min(index, total - 1)] ?? SLIDES[0]

  const goTo = useCallback(
    (next: number) => {
      setIndex(Math.max(0, Math.min(total - 1, next)))
      setShowNotes(false)
    },
    [total],
  )
  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

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
