export const VIDEO_ID = '6QLA49tJfzY';

export interface Slide {
  id: number;
  kicker: string;
  title: string;
  targetSeconds: number;
  layout?: 'single';
  vocab?: string[];
  notes: string[];
}

export const SLIDES: Slide[] = [
  {
    id: 0,
    kicker: 'Einführung · 1 Minute',
    title: 'Was ist Dunkle Materie?',
    targetSeconds: 60,
    layout: 'single',
    notes: [
      'Begrüßung: „Stellt euch vor, wir sehen nur etwa 5 % des Universums.“',
      'Framing: Der Rest ist unsichtbar — heute geht es um den größten unsichtbaren Anteil.',
      'Quelle nennen: Artikel aus der Zeitschrift „Hesch gwüsst?“ als Ausgangspunkt.',
    ],
  },
  {
    id: 1,
    kicker: 'Das Universum in Zahlen · 2 Minuten',
    title: 'Woraus besteht das Universum?',
    targetSeconds: 120,
    vocab: ['unsichtbar (invisible)', 'messen (to measure)', 'die Wechselwirkung (interaction)'],
    notes: [
      'Torte erklären: Nur 5 % normale Materie — alles, was wir anfassen und sehen können.',
      '27 % Dunkle Materie: unsichtbar, aber mit Schwerkraft messbar.',
      '68 % Dunkle Energie: treibt die beschleunigte Ausdehnung — nur kurz abgrenzen.',
      'Vokabeln laut vorlesen und an die Tafel schreiben lassen.',
    ],
  },
  {
    id: 2,
    kicker: 'Der Beweis · 2 Minuten',
    title: 'Woher wissen wir, dass es sie gibt?',
    targetSeconds: 120,
    notes: [
      'Spiralgalaxie erklären: Außensterne müssten laut sichtbarer Masse langsamer kreisen.',
      'Beobachtung: Sie sind zu schnell — also muss unsichtbare Masse ziehen.',
      'Metapher „kosmischer Kleber“: dunkle Materie hält Galaxien wie ein Netz zusammen.',
    ],
  },
  {
    id: 3,
    kicker: 'Die Entdecker · 2 Minuten',
    title: 'Zwicky & Rubin',
    targetSeconds: 120,
    notes: [
      'Fritz Zwicky (1933): Schweizer Astrophysiker, sah fehlende Masse in Galaxienhaufen, prägte „Dunkle Materie“.',
      'Vera Rubin (1970er): US-Astronomin, präzise Teleskop-Messungen der Galaxienrotation bestätigen Zwicky.',
      'Pointe: Zwicky wurde lange ignoriert — Rubin lieferte den Durchbruch.',
    ],
  },
  {
    id: 4,
    kicker: 'Fahndung · 2 Minuten',
    title: 'Wie sucht man Unsichtbares?',
    targetSeconds: 120,
    notes: [
      'Teilchen-Hypothesen: WIMPs und Axionen — bisher nur theoretisch, sehr schwach wechselwirkend.',
      'Gravitationslinsen: Licht ferner Galaxien wird um unsichtbare Masse gebogen — Teleskope im All messen das.',
      'Untergrund-Detektoren: tief unter der Erde, abgeschirmt von Sonne und Strahlung, warten auf seltene Signale.',
    ],
  },
  {
    id: 5,
    kicker: 'Neu · 1,5 Minuten',
    title: 'Das Roman-Weltraumteleskop',
    targetSeconds: 90,
    notes: [
      'Warum wichtig: verbindet Abschnitt 3–5 — misst unsichtbare Masse über Gravitationseffekte, aber im Riesen-Maßstab.',
      'Fakten: NASA, Start 30. August 2026 mit SpaceX Falcon Heavy ab Kennedy Space Center, Ziel: Sonne-Erde-L2.',
      'Benannt nach Nancy Grace Roman, erste Chef-Astronomin der NASA, „Mutter von Hubble“.',
      'Weitfeld-Infrarot: viel größeres Sichtfeld als Hubble — kartiert Dunkle Materie präzise wie nie.',
    ],
  },
  {
    id: 6,
    kicker: 'Fazit · 0,5 Minuten',
    title: 'Das größte Rätsel bleibt',
    targetSeconds: 30,
    layout: 'single',
    notes: [
      'Kurz schließen: Dunkle Materie ist eines der größten ungelösten Rätsel der Physik.',
      'Ausblick: Neue Missionen wie Roman könnten es in den nächsten Jahren endlich lösen.',
      'Überleitung zum Video.',
    ],
  },
  {
    id: 7,
    kicker: 'Zum Abschluss · Video',
    title: 'Schlusvideo',
    targetSeconds: 0,
    notes: [
      'Video nur per Klick starten (kein Autoplay).',
      'Falls kein Ton/Internet: Inhalt mündlich zusammenfassen.',
    ],
  },
];

export function formatTime(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}
