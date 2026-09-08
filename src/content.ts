import type { SlideId } from './slides/registry'

export const VIDEO_ID = '6QLA49tJfzY'

export interface Slide {
  id: SlideId
  kicker: string
  /** Shown only in training mode (`?training=1`); hidden in class. */
  duration?: string
  title: string
  layout?: 'single'
  vocab?: string[]
  notes: string[]
}

export const SLIDES: Slide[] = [
  {
    id: 0,
    kicker: 'Einführung',
    duration: '1 Minute',
    title: 'Was ist Dunkle Materie?',
    notes: [
      'Begrüßung: „Stellt euch vor, wir sehen nur etwa 5 % des Universums.“',
      'Framing: Der Rest ist unsichtbar — heute geht es um den größten unsichtbaren Anteil.',
      'Quelle nennen: Artikel aus der Zeitschrift „Hesch gwüsst?“ als Ausgangspunkt.',
    ],
  },
  {
    id: 1,
    kicker: 'Die Quelle',
    duration: '0,5 Minuten',
    title: 'Unsere Quelle',
    notes: [
      'Zeigen: Genau dieser Artikel ist unsere einzige Quelle — alles, was folgt, steht hier.',
      'Einordnen: Die Rubrik „Hesch gwüsst?“ erklärt jede Woche eine Frage aus der Wissenschaft, kurz und mit Bildern.',
      'Überleitung: Schauen wir uns zuerst die wichtigste Zahl an: 5, 27, 68.',
    ],
  },
  {
    id: 2,
    kicker: 'Das Universum in Zahlen',
    duration: '2 Minuten',
    title: 'Woraus besteht das Universum?',
    vocab: ['unsichtbar (invisible)', 'messen (to measure)', 'die Wechselwirkung (interaction)'],
    notes: [
      'Torte erklären: Nur 5 % normale Materie — alles, was wir anfassen und sehen können.',
      '27 % Dunkle Materie: unsichtbar, aber mit Schwerkraft messbar.',
      '68 % Dunkle Energie: treibt die beschleunigte Ausdehnung — nur kurz abgrenzen.',
      'Vokabeln laut vorlesen und an die Tafel schreiben lassen.',
    ],
  },
  {
    id: 3,
    kicker: 'Der Beweis',
    duration: '2 Minuten',
    title: 'Woher wissen wir, dass es sie gibt?',
    notes: [
      'Spiralgalaxie erklären: Außensterne müssten laut sichtbarer Masse langsamer kreisen.',
      'Beobachtung: Sie sind zu schnell — also muss unsichtbare Masse ziehen.',
      'Metapher „kosmischer Kleber“: dunkle Materie hält Galaxien wie ein Netz zusammen.',
    ],
  },
  {
    id: 4,
    kicker: 'Die Entdecker',
    duration: '2 Minuten',
    title: 'Zwicky & Rubin',
    notes: [
      'Fritz Zwicky (1933): Schweizer Astrophysiker, sah fehlende Masse in Galaxienhaufen, prägte „Dunkle Materie“.',
      'Vera Rubin (1970er): US-Astronomin, präzise Teleskop-Messungen der Galaxienrotation bestätigen Zwicky.',
      'Pointe: Zwicky wurde lange ignoriert — Rubin lieferte den Durchbruch.',
    ],
  },
  {
    id: 5,
    kicker: 'Fahndung',
    duration: '2 Minuten',
    title: 'Wie sucht man Unsichtbares?',
    notes: [
      'Teilchen-Hypothesen: WIMPs und Axionen — bisher nur theoretisch, sehr schwach wechselwirkend.',
      'Gravitationslinsen: Licht ferner Galaxien wird um unsichtbare Masse gebogen — Teleskope im All messen das.',
      'Untergrund-Detektoren: tief unter der Erde, abgeschirmt von Sonne und Strahlung, warten auf seltene Signale.',
    ],
  },
  {
    id: 6,
    kicker: 'Neu',
    duration: '1,5 Minuten',
    title: 'Das Roman-Weltraumteleskop',
    notes: [
      'Warum wichtig: verbindet Abschnitt 3–5 — misst unsichtbare Masse über Gravitationseffekte, aber im Riesen-Maßstab.',
      'Fakten: NASA, Start 30. August 2026 mit SpaceX Falcon Heavy ab Kennedy Space Center, Ziel: Sonne-Erde-L2.',
      'Benannt nach Nancy Grace Roman, erste Chef-Astronomin der NASA, „Mutter von Hubble“.',
      'Weitfeld-Infrarot: viel größeres Sichtfeld als Hubble — kartiert Dunkle Materie präzise wie nie.',
    ],
  },
  {
    id: 7,
    kicker: 'Fazit',
    duration: '0,5 Minuten',
    title: 'Das größte Rätsel bleibt',
    layout: 'single',
    notes: [
      'Kurz schließen: Dunkle Materie ist eines der größten ungelösten Rätsel der Physik.',
      'Ausblick: Neue Missionen wie Roman könnten es in den nächsten Jahren endlich lösen.',
      'Überleitung zum Video.',
    ],
  },
  {
    id: 8,
    kicker: 'Zum Abschluss · Video',
    title: 'Schlussvideo',
    layout: 'single',
    notes: [
      'Video nur per Klick starten (kein Autoplay).',
      'Falls kein Ton/Internet: Inhalt mündlich zusammenfassen.',
    ],
  },
]
