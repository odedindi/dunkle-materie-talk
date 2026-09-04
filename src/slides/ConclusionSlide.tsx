import { Grad, Lead, SlideKicker, SlideTitle } from '../components/primitives';
import type { SlideViewProps } from './types';

export default function ConclusionSlide({ slide, training }: SlideViewProps): React.JSX.Element {
  return (
    <div className="narrow-col">
      <SlideKicker kicker={slide.kicker} duration={slide.duration} training={training} />
      <SlideTitle level={2}>
        Das größte <Grad>Rätsel</Grad> bleibt
      </SlideTitle>
      <Lead center>
        <strong>Dunkle Materie</strong> ist eines der größten <strong>ungelösten Rätsel</strong> der Physik —
        und Missionen wie <strong>Roman</strong> könnten es in den <strong>kommenden Jahren</strong> endlich
        lösen.
      </Lead>
      <p className="dim-center">Vielen Dank — Fragen? Danach: Video.</p>
    </div>
  );
}
