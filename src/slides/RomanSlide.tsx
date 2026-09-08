import { IMG } from '../images'
import {
  Bullet,
  BulletList,
  Grad,
  PhotoFigure,
  SlideKicker,
  SlideTitle,
} from '../components/primitives'
import type { SlideViewProps } from './types'

export default function RomanSlide({ slide, training }: SlideViewProps): React.JSX.Element {
  return (
    <>
      <div>
        <SlideKicker kicker={slide.kicker} duration={slide.duration} training={training} />
        <SlideTitle level={2}>
          Neu: <Grad>Roman-Teleskop</Grad>
        </SlideTitle>
        <BulletList>
          <Bullet marker="▲">
            NASA-Start: <strong>30. August 2026</strong>, <strong>SpaceX Falcon Heavy</strong>, ab{' '}
            <strong>Kennedy Space Center</strong> → Ziel <strong>Sonne-Erde-L2</strong>.
          </Bullet>
          <Bullet marker="★">
            Benannt nach <strong>Nancy Grace Roman</strong> — erste Chef-Astronomin der NASA,{' '}
            <strong>„Mutter von Hubble“</strong>.
          </Bullet>
          <Bullet marker="◉">
            <strong>Ultra-weites Infrarot-Sichtfeld</strong> — viel größer als Hubble: kartiert{' '}
            <strong>Dunkle Materie</strong>, <strong>Dunkle Energie</strong> und{' '}
            <strong>Exoplaneten</strong>.
          </Bullet>
        </BulletList>
        <div className="mini-card media-row stack">
          <img
            className="thumb"
            src={IMG.nancy}
            alt="Nancy Grace Roman, NASA-Porträt von 1969"
            loading="lazy"
          />
          <p style={{ margin: 0 }}>
            <strong>Nancy Grace Roman</strong> (1925–2018) setzte das Hubble-Teleskop gegen alle
            Widerstände durch.
          </p>
        </div>
      </div>
      <div className="visual">
        <PhotoFigure
          src={IMG.romanScope}
          alt="Künstlerische Darstellung des Nancy Grace Roman-Weltraumteleskops"
          caption="Roman: 100× Hubbles Sichtfeld · NASA Goddard"
        />
      </div>
    </>
  )
}
