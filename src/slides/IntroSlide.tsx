import { IMG } from '../images';
import { Bullet, BulletList, Grad, Lead, PhotoFigure, SlideKicker, SlideTitle } from '../components/primitives';
import type { SlideViewProps } from './types';

export default function IntroSlide({ slide, training }: SlideViewProps): React.JSX.Element {
  return (
    <>
      <div>
        <SlideKicker kicker={slide.kicker} duration={slide.duration} training={training} />
        <SlideTitle level={1}>
          Was ist <Grad>Dunkle Materie?</Grad>
        </SlideTitle>
        <Lead>
          Wir sehen nur <strong>etwa 5&nbsp;%</strong> des Universums. Der Rest ist <strong>unsichtbar</strong> —
          heute folgen wir den Spuren des größten unsichtbaren Anteils.
        </Lead>
        <Lead variant="small">
          Nach dem Magazin <strong>„Hesch gwüsst?“</strong> · 10 Minuten · 8 Szenen
        </Lead>
        <BulletList>
          <Bullet marker="◉">
            <strong>5&nbsp;%</strong> sehen wir — <strong>95&nbsp;%</strong> nicht.
          </Bullet>
          <Bullet marker="◎">
            Eine detektivische Suche nach <strong>unsichtbarer Masse</strong>.
          </Bullet>
        </BulletList>
      </div>
      <div className="visual">
        <PhotoFigure
          src={IMG.whirlpool}
          alt="Spiralgalaxie M51 (Whirlpool-Galaxie), aufgenommen vom Hubble-Teleskop"
          caption="M51 · 23 Mio. Lichtjahre entfernt · NASA/ESA Hubble"
          eager
        />
      </div>
    </>
  );
}
