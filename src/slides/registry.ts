import type { ComponentType } from 'react';
import ConclusionSlide from './ConclusionSlide';
import DiscoverersSlide from './DiscoverersSlide';
import EvidenceSlide from './EvidenceSlide';
import IntroSlide from './IntroSlide';
import RomanSlide from './RomanSlide';
import SearchSlide from './SearchSlide';
import UniverseSlide from './UniverseSlide';
import VideoSlide from './VideoSlide';
import type { SlideViewProps } from './types';

export const SLIDE_VIEWS = {
  0: IntroSlide,
  1: UniverseSlide,
  2: EvidenceSlide,
  3: DiscoverersSlide,
  4: SearchSlide,
  5: RomanSlide,
  6: ConclusionSlide,
  7: VideoSlide,
} as const satisfies Record<number, ComponentType<SlideViewProps>>;

export type SlideId = keyof typeof SLIDE_VIEWS;
