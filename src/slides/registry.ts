import type { ComponentType } from 'react'
import ConclusionSlide from './ConclusionSlide'
import DiscoverersSlide from './DiscoverersSlide'
import EvidenceSlide from './EvidenceSlide'
import IntroSlide from './IntroSlide'
import RomanSlide from './RomanSlide'
import SearchSlide from './SearchSlide'
import SourceSlide from './SourceSlide'
import UniverseSlide from './UniverseSlide'
import VideoSlide from './VideoSlide'
import type { SlideViewProps } from './types'

export const SLIDE_VIEWS = {
  0: IntroSlide,
  1: SourceSlide,
  2: UniverseSlide,
  3: EvidenceSlide,
  4: DiscoverersSlide,
  5: SearchSlide,
  6: RomanSlide,
  7: ConclusionSlide,
  8: VideoSlide,
} as const satisfies Record<number, ComponentType<SlideViewProps>>

export type SlideId = keyof typeof SLIDE_VIEWS
