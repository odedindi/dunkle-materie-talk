import { IMG } from '../images'
import { Grad, MiniCard, PhotoFigure, SlideKicker, SlideTitle } from '../components/primitives'
import type { SlideViewProps } from './types'

export default function SearchSlide({ slide, training }: SlideViewProps): React.JSX.Element {
  return (
    <>
      <div>
        <SlideKicker kicker={slide.kicker} duration={slide.duration} training={training} />
        <SlideTitle level={2}>
          Wie sucht man <Grad>Unsichtbares?</Grad>
        </SlideTitle>
        <div className="card-grid">
          <MiniCard title="Hypothetische Teilchen">
            <strong>WIMPs</strong> und <strong>Axionen</strong> — fast ohne{' '}
            <strong>Wechselwirkung</strong>, extrem schwer zu fangen.
          </MiniCard>
          <MiniCard title="Weltraum-Teleskope">
            <strong>Gravitationslinsen:</strong> Licht wird um Masse <strong>gebogen</strong> — so
            wird Unsichtbares sichtbar.
          </MiniCard>
        </div>
        <div className="stack">
          <MiniCard title="Detektoren tief unter der Erde">
            <strong>Abgeschirmt</strong> von Sonne und Strahlung warten sie auf extrem seltene
            Signale.
          </MiniCard>
        </div>
      </div>
      <div className="visual">
        <PhotoFigure
          src={IMG.abell}
          alt="Gravitationslinsen im Galaxienhaufen Abell 370: Licht ferner Galaxien wird zu Bögen verzerrt"
          caption="Abell 370: Bögen = verbogenes Licht ferner Galaxien · Hubble"
        />
      </div>
    </>
  )
}
