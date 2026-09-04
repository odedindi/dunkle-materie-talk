import { IMG } from '../images';
import { Grad, Lead, MiniCard, PhotoFigure, SlideKicker, SlideTitle } from '../components/primitives';
import type { SlideViewProps } from './types';

export default function EvidenceSlide({ slide, training }: SlideViewProps): React.JSX.Element {
  return (
    <>
      <div>
        <SlideKicker kicker={slide.kicker} duration={slide.duration} training={training} />
        <SlideTitle level={2}>
          Außen zu <Grad>schnell</Grad>
        </SlideTitle>
        <Lead>
          Nach der <strong>sichtbaren Masse</strong> müssten äußere Sterne <strong>langsamer</strong> kreisen.
          Sie sind aber <strong>schnell</strong> — also fehlt <strong>unsichtbare Masse</strong>.
        </Lead>
        <MiniCard title="Metapher: kosmischer Kleber" dashed>
          Ein <strong>schwach</strong> leuchtendes <strong>Netz</strong> hält Galaxien zusammen — wir sehen den
          Kleber nicht, nur seine Wirkung.
        </MiniCard>
        <p className="legend">
          <span className="legend-expected">┄ erwartet: langsam</span>
          <span className="legend-observed">━ beobachtet: schnell</span>
        </p>
      </div>
      <div className="visual">
        <PhotoFigure
          src={IMG.andromeda}
          alt="Andromeda-Galaxie: Auch hier kreisen die äußeren Sterne zu schnell"
          caption="Andromeda — Rubins wichtigstes Messobjekt"
        />
      </div>
    </>
  );
}
