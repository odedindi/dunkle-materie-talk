import Starfield from './components/Starfield';
import { ControlsFooter, NotesOverlay, ProgressHeader, SlideShell } from './components/chrome';
import { SLIDES } from './content';
import { useSlideDeck } from './hooks/useSlideDeck';
import { useTrainingMode } from './hooks/useTrainingMode';
import { SLIDE_VIEWS } from './slides/registry';

export default function App(): React.JSX.Element {
  const training = useTrainingMode();
  const deck = useSlideDeck(training);
  const { slide, index, total } = deck;
  const View = SLIDE_VIEWS[slide.id];

  return (
    <div className="app">
      <Starfield />
      <ProgressHeader index={index} total={total} items={SLIDES} onGo={deck.goTo} />

      <main className="stage-wrap">
        <SlideShell slide={slide} index={index} total={total}>
          {View ? <View slide={slide} training={training} /> : null}
        </SlideShell>
      </main>

      <ControlsFooter
        index={index}
        total={total}
        training={training}
        onPrev={deck.prev}
        onNext={deck.next}
        onToggleNotes={() => deck.setShowNotes((v) => !v)}
      />

      {training && deck.showNotes && (
        <NotesOverlay index={index} notes={slide.notes} onClose={() => deck.setShowNotes(false)} />
      )}
    </div>
  );
}
