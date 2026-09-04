import { useCallback, useEffect, useState } from 'react';
import DonutChart from './components/DonutChart';
import Starfield from './components/Starfield';
import { SLIDES, VIDEO_ID } from './content';

const BASE = import.meta.env.BASE_URL;
const IMG = {
  whirlpool: `${BASE}img/whirlpool.jpg`,
  andromeda: `${BASE}img/andromeda.jpg`,
  abell: `${BASE}img/abell370.jpg`,
  zwicky: `${BASE}img/zwicky.jpg`,
  rubin: `${BASE}img/rubin-aip.jpg`,
  romanScope: `${BASE}img/roman-telescope.png`,
  nancy: `${BASE}img/nancy-roman.jpg`,
};

export default function App(): React.JSX.Element {
  const [index, setIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [videoOn, setVideoOn] = useState(false);

  const slide = SLIDES[index];
  const total = SLIDES.length;

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(total - 1, next));
      setIndex(clamped);
      setVideoOn(false);
      setShowNotes(false);
    },
    [total],
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          next();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          prev();
          break;
        case 'Home':
          e.preventDefault();
          goTo(0);
          break;
        case 'End':
          e.preventDefault();
          goTo(total - 1);
          break;
        case 'n':
        case 'N':
          setShowNotes((v) => !v);
          break;
        case 'Escape':
          setShowNotes(false);
          break;
        case 'f':
        case 'F':
          if (document.fullscreenElement) void document.exitFullscreen();
          else void document.documentElement.requestFullscreen().catch(() => undefined);
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, goTo, total]);

  return (
    <div className="app">
      <Starfield />

      <header className="topbar">
        <div className="brand">
          <i aria-hidden="true" /> Dunkle Materie · B2-Vortrag
        </div>
        <div className="progress-track" role="progressbar" aria-valuenow={index + 1} aria-valuemin={1} aria-valuemax={total} aria-label="Fortschritt">
          <div className="progress-fill" style={{ width: `${((index + 1) / total) * 100}%` }} />
        </div>
        <nav className="dots" aria-label="Folien wählen">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Zu Folie ${i + 1}: ${s.title}`}
              title={`${i + 1} · ${s.title}`}
              className={i === index ? 'dot active' : i < index ? 'dot done' : 'dot'}
              onClick={() => goTo(i)}
            />
          ))}
        </nav>
      </header>

      <main className="stage-wrap">
        <section key={slide.id} className={slide.layout === 'single' || index === 7 ? 'stage single slide-anim' : 'stage slide-anim'} aria-roledescription="Folie" aria-label={`Folie ${index + 1} von ${total}: ${slide.title}`}>
          <span className="sr-only" aria-live="polite">{`Folie ${index + 1} von ${total}: ${slide.title}`}</span>
          {index === 0 && (
            <>
              <div>
                <p className="kicker">{slide.kicker}</p>
                <h1 className="slide-title">
                  Was ist <span className="grad">Dunkle Materie?</span>
                </h1>
                <p className="lead">
                  Wir sehen nur <strong>etwa 5&nbsp;%</strong> des Universums. Der Rest ist <strong>unsichtbar</strong> —
                  heute folgen wir den Spuren des größten unsichtbaren Anteils.
                </p>
                <p className="lead" style={{ fontSize: '1.05rem' }}>
                  Nach dem Magazin <strong>„Hesch gwüsst?“</strong> · 10 Minuten · 8 Szenen
                </p>
                <ul className="bullets">
                  <li><span className="tick">◉</span><span><strong>5&nbsp;%</strong> sehen wir — <strong>95&nbsp;%</strong> nicht.</span></li>
                  <li><span className="tick">◎</span><span>Eine detektivische Suche nach <strong>unsichtbarer Masse</strong>.</span></li>
                </ul>
              </div>
              <div className="visual">
                <figure className="photo-frame">
                  <img className="photo" src={IMG.whirlpool} alt="Spiralgalaxie M51 (Whirlpool-Galaxie), aufgenommen vom Hubble-Teleskop" loading="eager" />
                  <figcaption className="photo-cap">M51 · 23 Mio. Lichtjahre entfernt · NASA/ESA Hubble</figcaption>
                </figure>
              </div>
            </>
          )}

          {index === 1 && (
            <>
              <div>
                <p className="kicker">{slide.kicker}</p>
                <h2 className="slide-title">Woraus besteht das <span className="grad">Universum?</span></h2>
                <ul className="bullets">
                  <li><span className="tick" style={{ borderColor: '#7dd3fc66', color: '#7dd3fc', background: '#7dd3fc1f', width: "3ch", height: "3ch" }}>5</span><span><strong>Normale Materie:</strong> Sterne, Planeten, wir — alles Sichtbare.</span></li>
                  <li><span className="tick" style={{ borderColor: '#a78bfa66', color: '#a78bfa', background: '#a78bfa1f', width: "3ch", height: "3ch" }}>27</span><span><strong>Dunkle Materie:</strong> unsichtbar, aber über <strong>Schwerkraft</strong> messbar.</span></li>
                  <li><span className="tick" style={{ borderColor: '#22d3ee66', color: '#22d3ee', background: '#22d3ee1f', width: "3ch", height: "3ch" }}>68</span><span><strong>Dunkle Energie:</strong> treibt die <strong>beschleunigte Ausdehnung</strong>.</span></li>
                </ul>
                {slide.vocab && (
                  <div className="vocab" role="note" aria-label="Vokabeln">
                    <b>Wörterbox B2:</b> {slide.vocab.join(' · ')}
                  </div>
                )}
              </div>
              <div className="visual">
                <div style={{ width: 'min(100%, 420px)' }}>
                  <DonutChart />
                  <div className="card-grid" style={{ marginTop: 12 }}>
                    <div className="mini-card"><h3 style={{ color: '#7dd3fc' }}>5 % normal</h3><p>Was wir sehen und anfassen.</p></div>
                    <div className="mini-card"><h3 style={{ color: '#a78bfa' }}>27 % dunkel</h3><p>Unsichtbar, zieht aber.</p></div>
                  </div>
                </div>
              </div>
            </>
          )}

          {index === 2 && (
            <>
              <div>
                <p className="kicker">{slide.kicker}</p>
                <h2 className="slide-title">Außen zu <span className="grad">schnell</span></h2>
                <p className="lead">
                  Nach der <strong>sichtbaren Masse</strong> müssten äußere Sterne <strong>langsamer</strong> kreisen.
                  Sie sind aber <strong>schnell</strong> — also fehlt <strong>unsichtbare Masse</strong>.
                </p>
                <div className="mini-card" style={{ borderStyle: 'dashed', borderColor: 'rgba(167,139,250,0.5)' }}>
                  <h3>Metapher: kosmischer Kleber</h3>
                  <p>Ein <strong>schwach</strong> leuchtendes <strong>Netz</strong> hält Galaxien zusammen — wir sehen den Kleber nicht, nur seine Wirkung.</p>
                </div>
                <p style={{ display: 'flex', gap: 10, marginTop: 14, fontSize: '1rem', fontWeight: 600 }}>
                  <span style={{ color: '#7f8cbd' }}>┄ erwartet: langsam</span>
                  <span style={{ color: '#22d3ee' }}>━ beobachtet: schnell</span>
                </p>
              </div>
              <div className="visual">
                <figure className="photo-frame">
                  <img className="photo" src={IMG.andromeda} alt="Andromeda-Galaxie: Auch hier kreisen die äußeren Sterne zu schnell" loading="lazy" />
                  <figcaption className="photo-cap">Andromeda — Rubins wichtigstes Messobjekt</figcaption>
                </figure>
              </div>
            </>
          )}

          {index === 3 && (
            <>
              <div>
                <p className="kicker">{slide.kicker}</p>
                <h2 className="slide-title">Zwei, die <span className="grad">hinsahen</span></h2>
                <p className="lead">Erst belächelt, dann bestätigt — so kam der Begriff in die Welt.</p>
                <div className="split2">
                  <div className="person">
                    <img className="portrait" src={IMG.zwicky} alt="Porträt von Fritz Zwicky" loading="lazy" />
                    <h3>Fritz Zwicky</h3>
                    <div className="year">1933 · SCHWEIZ</div>
                    <p><strong>Astrophysiker</strong>, sah <strong>fehlende Masse</strong> in Galaxienhaufen und prägte <strong>„Dunkle Materie“</strong>.</p>
                  </div>
                  <div className="person">
                    <img className="portrait" src={IMG.rubin} alt="Porträt von Vera Rubin" loading="lazy" />
                    <h3>Vera Rubin</h3>
                    <div className="year">1970ER · USA</div>
                    <p><strong>Astronomin</strong>, bewies sie mit <strong>präzisen Teleskop-Messungen</strong> der Galaxienrotation.</p>
                  </div>
                </div>
              </div>
              <div className="visual">
                <figure className="photo-frame">
                  <img className="photo" src={IMG.abell} alt="Galaxienhaufen Abell 370 — solche Haufen untersuchte Zwicky" loading="lazy" />
                  <figcaption className="photo-cap">Galaxienhaufen — Zwickys Revier · Hubble</figcaption>
                </figure>
              </div>
            </>
          )}

          {index === 4 && (
            <>
              <div>
                <p className="kicker">{slide.kicker}</p>
                <h2 className="slide-title">Wie sucht man <span className="grad">Unsichtbares?</span></h2>
                <div className="card-grid">
                  <div className="mini-card">
                    <h3>Hypothetische Teilchen</h3>
                    <p><strong>WIMPs</strong> und <strong>Axionen</strong> — fast ohne <strong>Wechselwirkung</strong>, extrem schwer zu fangen.</p>
                  </div>
                  <div className="mini-card">
                    <h3>Weltraum-Teleskope</h3>
                    <p><strong>Gravitationslinsen:</strong> Licht wird um Masse <strong>gebogen</strong> — so wird Unsichtbares sichtbar.</p>
                  </div>
                </div>
                <div className="mini-card" style={{ marginTop: 12 }}>
                  <h3>Detektoren tief unter der Erde</h3>
                  <p><strong>Abgeschirmt</strong> von Sonne und Strahlung warten sie auf extrem seltene Signale.</p>
                </div>
              </div>
              <div className="visual">
                <figure className="photo-frame">
                  <img className="photo" src={IMG.abell} alt="Gravitationslinsen im Galaxienhaufen Abell 370: Licht ferner Galaxien wird zu Bögen verzerrt" loading="lazy" />
                  <figcaption className="photo-cap">Abell 370: Bögen = verbogenes Licht ferner Galaxien · Hubble</figcaption>
                </figure>
              </div>
            </>
          )}

          {index === 5 && (
            <>
              <div>
                <p className="kicker">{slide.kicker}</p>
                <h2 className="slide-title">Neu: <span className="grad">Roman-Teleskop</span></h2>
                <ul className="bullets">
                  <li><span className="tick">▲</span><span>NASA-Start: <strong>30. August 2026</strong>, <strong>SpaceX Falcon Heavy</strong>, ab <strong>Kennedy Space Center</strong> → Ziel <strong>Sonne-Erde-L2</strong>.</span></li>
                  <li><span className="tick">★</span><span>Benannt nach <strong>Nancy Grace Roman</strong> — erste Chef-Astronomin der NASA, <strong>„Mutter von Hubble“</strong>.</span></li>
                  <li><span className="tick">◉</span><span><strong>Ultra-weites Infrarot-Sichtfeld</strong> — viel größer als Hubble: kartiert <strong>Dunkle Materie</strong>, <strong>Dunkle Energie</strong> und <strong>Exoplaneten</strong>.</span></li>
                </ul>
                <div className="mini-card" style={{ marginTop: 12, display: 'flex', gap: 14, alignItems: 'center' }}>
                  <img src={IMG.nancy} alt="Nancy Grace Roman, NASA-Porträt von 1969" loading="lazy" style={{ width: 72, height: 92, objectFit: 'cover', borderRadius: 10, border: '1px solid var(--line)', flex: 'none' }} />
                  <p style={{ margin: 0 }}><strong>Nancy Grace Roman</strong> (1925–2018) setzte das Hubble-Teleskop gegen alle Widerstände durch.</p>
                </div>
              </div>
              <div className="visual">
                <figure className="photo-frame">
                  <img className="photo" src={IMG.romanScope} alt="Künstlerische Darstellung des Nancy Grace Roman-Weltraumteleskops" loading="lazy" />
                  <figcaption className="photo-cap">Roman: 100× Hubbles Sichtfeld · NASA Goddard</figcaption>
                </figure>
              </div>
            </>
          )}

          {index === 6 && (
            <div style={{ maxWidth: 820 }}>
              <p className="kicker" style={{ textAlign: 'center' }}>{slide.kicker}</p>
              <h2 className="slide-title">Das größte <span className="grad">Rätsel</span> bleibt</h2>
              <p className="lead" style={{ textAlign: 'center' }}>
                <strong>Dunkle Materie</strong> ist eines der größten <strong>ungelösten Rätsel</strong> der Physik —
                und Missionen wie <strong>Roman</strong> könnten es in den <strong>kommenden Jahren</strong> endlich lösen.
              </p>
              <p style={{ color: 'var(--dim)', textAlign: 'center' }}>Vielen Dank — Fragen? Danach: Video.</p>
            </div>
          )}

          {index === 7 && (
            <div style={{ width: '100%', maxWidth: 980 }}>
              <p className="kicker" style={{ textAlign: 'center' }}>{slide.kicker}</p>
              <h2 className="slide-title">Schlussvideo</h2>
              {!videoOn ? (
                <button type="button" className="video-facade" onClick={() => setVideoOn(true)} aria-label="Video abspielen">
                  <img
                    src={`https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`}
                    alt="Video-Vorschaubild: Film zum Thema Dunkle Materie"
                    loading="lazy"
                  />
                  <span className="play" aria-hidden="true"><span>▶</span></span>
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
              <p style={{ color: 'var(--dim)', textAlign: 'center', marginTop: 10 }}>
                Klick statt Autoplay · <a style={{ color: '#fff' }} href={`https://www.youtube.com/watch?v=${VIDEO_ID}`} target="_blank" rel="noreferrer">Auf YouTube öffnen</a>
              </p>
            </div>
          )}
        </section>
      </main>

      <footer className="controls">
        <button type="button" className="nav-btn" onClick={prev} disabled={index === 0} aria-label="Zurück">
          ← Zurück
        </button>

        <div className="center-hint">
          <span className="section-count">{index + 1} / {total}</span>
          <span><kbd>←</kbd> <kbd>→</kbd> blättern</span>
          <span><kbd>N</kbd> Notizen</span>
          <span><kbd>F</kbd> Vollbild</span>
          <button type="button" className="icon-btn" onClick={() => setShowNotes((v) => !v)} aria-label="Sprechernotizen umschalten" title="Notizen (N)">
            🗒
          </button>
        </div>

        <button type="button" className="nav-btn primary" onClick={next} disabled={index === total - 1} aria-label="Weiter">
          Weiter →
        </button>
      </footer>

      {showNotes && (
        <aside className="notes" role="dialog" aria-modal="false" aria-label="Sprechernotizen" onClick={() => setShowNotes(false)}>
          <h4>Notizen · Folie {index + 1} — nur für dich</h4>
          <ul>
            {slide.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <div className="close-hint">Versteckt fürs Publikum · Klick oder <kbd>N</kbd> zum Schließen</div>
        </aside>
      )}
    </div>
  );
}
