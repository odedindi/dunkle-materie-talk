import { useCallback, useEffect, useState } from 'react';
import DonutChart from './components/DonutChart';
import GalaxyDiagram from './components/GalaxyDiagram';
import Starfield from './components/Starfield';
import { SLIDES, VIDEO_ID, formatTime } from './content';

function useSectionTimer(targetSeconds: number, slideId: number) {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(targetSeconds > 0);

  useEffect(() => {
    setElapsed(0);
    setRunning(targetSeconds > 0);
  }, [slideId, targetSeconds]);

  useEffect(() => {
    if (!running || targetSeconds <= 0) return;
    const id = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => window.clearInterval(id);
  }, [running, targetSeconds]);

  const remaining = Math.max(0, targetSeconds - elapsed);
  const frac = targetSeconds > 0 ? Math.min(1, elapsed / targetSeconds) : 0;
  return { elapsed, remaining, frac, running, setRunning, setElapsed };
}

export default function App(): React.JSX.Element {
  const [index, setIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [videoOn, setVideoOn] = useState(false);

  const slide = SLIDES[index];
  const total = SLIDES.length;
  const { elapsed, remaining, frac, running, setRunning, setElapsed } = useSectionTimer(
    slide.targetSeconds,
    slide.id,
  );

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

  const timerClass = slide.targetSeconds <= 0 ? 'timer' : remaining <= 0 ? 'timer over' : remaining <= 15 ? 'timer warn' : 'timer';

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
        <section key={slide.id} className={slide.layout === 'single' || index === 7 ? 'stage single slide-anim' : 'stage slide-anim'} aria-live="polite">
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
              <div className="visual" aria-hidden="true">
                <svg viewBox="0 0 300 300" style={{ maxWidth: 380 }}>
                  <circle cx="150" cy="150" r="120" fill="none" stroke="#a78bfa" strokeWidth="1.5" opacity="0.5" />
                  <circle cx="150" cy="150" r="80" fill="none" stroke="#7dd3fc" strokeWidth="1.2" opacity="0.6" />
                  <circle cx="150" cy="150" r="34" fill="#fff" opacity="0.95" />
                  <circle cx="150" cy="150" r="46" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.7" />
                  <circle cx="230" cy="90" r="3" fill="#fff" />
                  <circle cx="80" cy="200" r="2.4" fill="#7dd3fc" />
                  <circle cx="200" cy="220" r="2" fill="#fff" />
                  <circle cx="110" cy="70" r="2" fill="#fbbf24" />
                </svg>
              </div>
            </>
          )}

          {index === 1 && (
            <>
              <div>
                <p className="kicker">{slide.kicker}</p>
                <h2 className="slide-title">Woraus besteht das <span className="grad">Universum?</span></h2>
                <ul className="bullets">
                  <li><span className="tick" style={{ borderColor: '#7dd3fc66', color: '#7dd3fc', background: '#7dd3fc1f' }}>5</span><span><strong>Normale Materie:</strong> Sterne, Planeten, wir — alles Sichtbare.</span></li>
                  <li><span className="tick" style={{ borderColor: '#a78bfa66', color: '#a78bfa', background: '#a78bfa1f' }}>27</span><span><strong>Dunkle Materie:</strong> unsichtbar, aber über <strong>Schwerkraft</strong> messbar.</span></li>
                  <li><span className="tick" style={{ borderColor: '#22d3ee66', color: '#22d3ee', background: '#22d3ee1f' }}>68</span><span><strong>Dunkle Energie:</strong> treibt die <strong>beschleunigte Ausdehnung</strong>.</span></li>
                </ul>
                {slide.vocab && (
                  <div className="vocab" role="note" aria-label="Vokabeln">
                    <b>Wörterbox B2:</b> {slide.vocab.join(' · ')}
                  </div>
                )}
              </div>
              <div className="visual">
                <div style={{ width: 'min(100%, 380px)' }}>
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
                  <p>Ein faint leuchtendes <strong>Netz</strong> hält Galaxien zusammen — wir sehen den Kleber nicht, nur seine Wirkung.</p>
                </div>
              </div>
              <div className="visual"><GalaxyDiagram /></div>
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
                    <div className="avatar" style={{ background: 'radial-gradient(circle at 30% 30%, #7dd3fc, #1d4ed8)', color: '#04122b' }}>FZ</div>
                    <h3>Fritz Zwicky</h3>
                    <div className="year">1933 · SCHWEIZ</div>
                    <p><strong>Astrophysiker</strong>, sah <strong>fehlende Masse</strong> in Galaxienhaufen und prägte <strong>„Dunkle Materie“</strong>.</p>
                  </div>
                  <div className="person">
                    <div className="avatar" style={{ background: 'radial-gradient(circle at 30% 30%, #f472b6, #7c3aed)', color: '#fff' }}>VR</div>
                    <h3>Vera Rubin</h3>
                    <div className="year">1970ER · USA</div>
                    <p><strong>Astronomin</strong>, bewies sie mit <strong>präzisen Teleskop-Messungen</strong> der Galaxienrotation.</p>
                  </div>
                </div>
              </div>
              <div className="visual" aria-hidden="true">
                <svg viewBox="0 0 300 260" style={{ maxWidth: 340 }}>
                  <circle cx="90" cy="110" r="52" fill="none" stroke="#7dd3fc" strokeWidth="2" opacity="0.8" />
                  <circle cx="90" cy="110" r="8" fill="#7dd3fc" />
                  <circle cx="210" cy="110" r="52" fill="none" stroke="#f472b6" strokeWidth="2" opacity="0.8" />
                  <circle cx="210" cy="110" r="8" fill="#f472b6" />
                  <path d="M142 110 H158" stroke="#fbbf24" strokeWidth="2" strokeDasharray="5 5" />
                  <text x="150" y="140" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="700">BESTÄTIGT</text>
                  <text x="90" y="190" textAnchor="middle" fill="#b9c3ea" fontSize="12">1933 · Idee</text>
                  <text x="210" y="190" textAnchor="middle" fill="#b9c3ea" fontSize="12">1970er · Beweis</text>
                </svg>
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
              <div className="visual" aria-hidden="true">
                <svg viewBox="0 0 320 260" style={{ maxWidth: 380 }}>
                  <circle cx="160" cy="120" r="34" fill="#a78bfa" opacity="0.35" />
                  <circle cx="160" cy="120" r="16" fill="#a78bfa" opacity="0.8" />
                  <text x="160" y="124" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="800">MASSE</text>
                  <path d="M10 80 Q160 110 310 60" stroke="#7dd3fc" strokeWidth="2" fill="none" opacity="0.9" />
                  <path d="M10 170 Q160 140 310 190" stroke="#7dd3fc" strokeWidth="2" fill="none" opacity="0.9" />
                  <text x="160" y="220" textAnchor="middle" fill="#b9c3ea" fontSize="12">Licht ferner Galaxien wird gebogen</text>
                  <rect x="40" y="232" width="240" height="4" rx="2" fill="#fbbf24" opacity="0.5" />
                  <text x="160" y="250" textAnchor="middle" fill="#7f8cbd" fontSize="11">Detektor: tief, dunkel, abgeschirmt</text>
                </svg>
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
              </div>
              <div className="visual" aria-hidden="true">
                <svg viewBox="0 0 320 280" style={{ maxWidth: 380 }}>
                  <rect x="130" y="60" width="60" height="80" rx="10" fill="#cbd5e1" opacity="0.9" />
                  <rect x="142" y="30" width="36" height="34" rx="6" fill="#7dd3fc" opacity="0.9" />
                  <rect x="60" y="90" width="46" height="16" rx="4" fill="#334155" />
                  <rect x="214" y="90" width="46" height="16" rx="4" fill="#334155" />
                  <circle cx="160" cy="190" r="10" fill="#fbbf24" />
                  <circle cx="60" cy="220" r="2.5" fill="#fff" />
                  <circle cx="260" cy="200" r="2" fill="#fff" />
                  <circle cx="240" cy="60" r="2.4" fill="#7dd3fc" />
                  <text x="160" y="240" textAnchor="middle" fill="#b9c3ea" fontSize="12">Weitfeld · Infrarot · L2</text>
                </svg>
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
            <div style={{ width: '100%', maxWidth: 900 }}>
              <p className="kicker" style={{ textAlign: 'center' }}>{slide.kicker}</p>
              <h2 className="slide-title">Schlussvideo</h2>
              {!videoOn ? (
                <button type="button" className="video-facade" onClick={() => setVideoOn(true)} aria-label="Video abspielen">
                  <img src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`} alt="Video-Vorschaubild" loading="lazy" />
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
          {slide.targetSeconds > 0 ? (
            <button
              type="button"
              className={timerClass}
              onClick={() => (running ? setRunning(false) : (remaining <= 0 ? setElapsed(0) : setRunning(true)))}
              title="Timer starten/pausieren/zurücksetzen"
              aria-label={`Timer: ${formatTime(remaining)} übrig von ${formatTime(slide.targetSeconds)}`}
            >
              <span className="t-label">Ziel {formatTime(slide.targetSeconds)}</span>
              <span className="t-time">{formatTime(remaining)}</span>
              <span className="t-bar" aria-hidden="true"><i style={{ width: `${(1 - frac) * 100}%` }} /></span>
              <span style={{ fontSize: 12, color: 'var(--dim)' }}>{running ? '⏸' : remaining <= 0 ? '↺' : '▶'}</span>
            </button>
          ) : (
            <span className="timer" aria-label="Kein Zeitlimit">▶ Video</span>
          )}
          <button type="button" className="icon-btn" onClick={() => setShowNotes((v) => !v)} aria-label="Sprechernotizen umschalten" title="Notizen (N)">
            🗒
          </button>
        </div>

        <button type="button" className="nav-btn primary" onClick={next} disabled={index === total - 1} aria-label="Weiter">
          Weiter →
        </button>
      </footer>

      {showNotes && (
        <aside className="notes" role="complementary" aria-label="Sprechernotizen" onClick={() => setShowNotes(false)}>
          <h4>Notizen · Folie {index + 1} — nur für dich</h4>
          <ul>
            {slide.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <div className="close-hint">Versteckt fürs Publikum · Klick oder <kbd>N</kbd> zum Schließen · elapsed {formatTime(elapsed)}</div>
        </aside>
      )}
    </div>
  );
}
