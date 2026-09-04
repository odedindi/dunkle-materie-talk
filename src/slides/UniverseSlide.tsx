import { Bullet, BulletList, Grad, MiniCard, SlideKicker, SlideTitle, VocabBox } from '../components/primitives';
import DonutChart from '../components/DonutChart';
import type { SlideViewProps } from './types';

export default function UniverseSlide({ slide, training }: SlideViewProps): React.JSX.Element {
  return (
    <>
      <div>
        <SlideKicker kicker={slide.kicker} duration={slide.duration} training={training} />
        <SlideTitle level={2}>
          Woraus besteht das <Grad>Universum?</Grad>
        </SlideTitle>
        <BulletList>
          <Bullet marker="5" tone="sky" size="lg">
            <strong>Normale Materie:</strong> Sterne, Planeten, wir — alles Sichtbare.
          </Bullet>
          <Bullet marker="27" tone="violet" size="lg">
            <strong>Dunkle Materie:</strong> unsichtbar, aber über <strong>Schwerkraft</strong> messbar.
          </Bullet>
          <Bullet marker="68" tone="teal" size="lg">
            <strong>Dunkle Energie:</strong> treibt die <strong>beschleunigte Ausdehnung</strong>.
          </Bullet>
        </BulletList>
        <VocabBox words={slide.vocab ?? []} />
      </div>
      <div className="visual">
        <div className="donut-col">
          <DonutChart />
          <div className="card-grid stack">
            <MiniCard title="5 % normal" accent="sky">
              Was wir sehen und anfassen.
            </MiniCard>
            <MiniCard title="27 % dunkel" accent="violet">
              Unsichtbar, zieht aber.
            </MiniCard>
          </div>
        </div>
      </div>
    </>
  );
}
