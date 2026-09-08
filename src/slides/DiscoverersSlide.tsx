import { IMG } from '../images'
import { Grad, Lead, PhotoFigure, SlideKicker, SlideTitle } from '../components/primitives'
import type { SlideViewProps } from './types'

interface Person {
  name: string
  year: string
  img: string
  text: React.JSX.Element
}

const PEOPLE: Person[] = [
  {
    name: 'Fritz Zwicky',
    year: '1933 · SCHWEIZ',
    img: IMG.zwicky,
    text: (
      <>
        <strong>Astrophysiker</strong>, sah <strong>fehlende Masse</strong> in Galaxienhaufen und
        prägte <strong>„Dunkle Materie“</strong>.
      </>
    ),
  },
  {
    name: 'Vera Rubin',
    year: '1970ER · USA',
    img: IMG.rubin,
    text: (
      <>
        <strong>Astronomin</strong>, bewies sie mit <strong>präzisen Teleskop-Messungen</strong> der
        Galaxienrotation.
      </>
    ),
  },
]

export default function DiscoverersSlide({ slide, training }: SlideViewProps): React.JSX.Element {
  return (
    <>
      <div>
        <SlideKicker kicker={slide.kicker} duration={slide.duration} training={training} />
        <SlideTitle level={2}>
          Zwei, die <Grad>hinsahen</Grad>
        </SlideTitle>
        <Lead>Erst belächelt, dann bestätigt — so kam der Begriff in die Welt.</Lead>
        <div className="split2">
          {PEOPLE.map((p) => (
            <div className="person" key={p.name}>
              <img className="portrait" src={p.img} alt={`Porträt von ${p.name}`} loading="lazy" />
              <h3>{p.name}</h3>
              <div className="year">{p.year}</div>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="visual">
        <PhotoFigure
          src={IMG.abell}
          alt="Galaxienhaufen Abell 370 — solche Haufen untersuchte Zwicky"
          caption="Galaxienhaufen — Zwickys Revier · Hubble"
        />
      </div>
    </>
  )
}
