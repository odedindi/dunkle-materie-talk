import { useState } from 'react'

/**
 * Training mode is toggled via query param (`?training=1`).
 * In class mode (default) all coaching chrome stays hidden:
 * speaker notes, notes shortcuts and per-slide durations.
 * Read once — toggling means opening the other URL.
 */
export function useTrainingMode(): boolean {
  const [training] = useState(
    () => new URLSearchParams(window.location.search).get('training') === '1',
  )
  return training
}
