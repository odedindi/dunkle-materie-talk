import { IMG } from '../images';
import { Bullet, BulletList, Grad, Lead, PhotoFigure, SlideKicker, SlideTitle } from '../components/primitives';
import type { SlideViewProps } from './types';

export default function SourceSlide({ slide, training }: SlideViewProps): React.JSX.Element {
  return (
    <>
      <div>
        <SlideKicker kicker={slide.kicker} duration={slide.duration} training={training} />
        <SlideTitle level={2}>
          Unsere <Grad>Quelle</Grad>
        </SlideTitle>
        <Lead>
          Alle Zahlen in diesem Vortrag stammen aus <strong>einem einzigen Artikel</strong> der
          Coopzeitung-Rubrik <strong>„Hesch gwüsst?“</strong>.
        </Lead>
        <BulletList>
          <Bullet marker="▤">
            Unser Artikel: <strong>Nr. 83</strong> aus dem Jahr <strong>2024</strong>.
          </Bullet>
        </BulletList>
      </div>
      <div className="visual">
        <div className="source-large">
          <PhotoFigure
            src={IMG.heschArtikel}
            alt="Der Artikel „Was ist dunkle Materie?“ aus Hesch gwüsst?, Coopzeitung Nr. 83"
            caption="„Was ist dunkle Materie?“ · Hesch gwüsst?, Nr. 83"
            eager
          />
        </div>
      </div>
    </>
  );
}
