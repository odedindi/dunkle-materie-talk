import { useState } from 'react';
import { VIDEO_ID } from '../content';
import { SlideKicker, SlideTitle } from '../components/primitives';
import type { SlideViewProps } from './types';

export default function VideoSlide({ slide, training }: SlideViewProps): React.JSX.Element {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="video-col">
      <SlideKicker kicker={slide.kicker} duration={slide.duration} training={training} />
      <SlideTitle level={2}>Schlussvideo</SlideTitle>
      {!playing ? (
        <button type="button" className="video-facade" onClick={() => setPlaying(true)} aria-label="Video abspielen">
          <img
            src={`https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`}
            alt="Video-Vorschaubild: Film zum Thema Dunkle Materie"
            loading="lazy"
          />
          <span className="play" aria-hidden="true">
            <span>▶</span>
          </span>
        </button>
      ) : (
        <iframe
          className="video-frame"
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
          title="Schlussvideo: Dunkle Materie"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
      <p className="dim-center" style={{ marginTop: 10 }}>
        Klick statt Autoplay ·{' '}
        <a style={{ color: '#fff' }} href={`https://www.youtube.com/watch?v=${VIDEO_ID}`} target="_blank" rel="noreferrer">
          Auf YouTube öffnen
        </a>
      </p>
    </div>
  );
}
