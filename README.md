# Was ist Dunkle Materie? · B2-Präsentation

Interaktive Single-Page-Präsentation (statt PowerPoint) für einen ca. 10-minütigen Vortrag im Deutsch-B2-Kurs.
Thema nach dem Magazin **„Hesch gwüsst?“**. Live am Laptop/Beamer bedienen.

## Stack

- **Vite 8** + **React 19** + **TypeScript 7 (strict)** — keine weiteren Runtime-Deps
- **Yarn Berry 4.18** (`nodeLinker: node-modules`, vgl. `shapely`-Konvention im Workspace)
- Static Build, kein Backend

## Start

```sh
yarn install
yarn dev        # lokal, z. B. http://localhost:5173
yarn typecheck  # tsc -b
yarn build      # tsc -b && vite build → dist/
yarn preview    # dist/ lokal prüfen
```

## Deploy (statisch)

- **Vercel/Netlify:** Build-Command `yarn build`, Output `dist/`, kein Env nötig.
- Oder `dist/` per USB mitnehmen und `index.html`- preview via `yarn preview`.

## Bedienung im Unterricht

| Aktion | Wie |
|---|---|
| Weiter/Zurück | Buttons oder <kbd>←</kbd>/<kbd>→</kbd> (auch <kbd>Space</kbd>, <kbd>PgUp</kbd>/<kbd>PgDn</kbd>) |
| Anfang/Ende | <kbd>Home</kbd>/<kbd>End</kbd>, Punkte oben anklickbar |
| Sprechernotizen | <kbd>N</kbd> oder 🗒-Button (Overlay nur für dich, Publikum sieht es nicht) |
| Timer je Folie | Zielzeit oben (z. B. 2:00), Klick = Start/Pause/Reset; Gelb ≤ 15 s, Rot bei Überzug |
| Vollbild | <kbd>F</kbd> |
| Schließen | <kbd>Esc</kbd> schließt Notizen |

## Folien (8)

1. Einführung (1:00) · 2. Universum 5/27/68 (2:00 + Vokabelbox) · 3. Galaxienrotation (2:00) ·
4. Zwicky & Rubin (2:00) · 5. Suche: WIMPs/Axionen, Linsen, Untergrund (2:00) ·
6. Roman-Teleskop, Start 30.8.2026 (1:30) · 7. Fazit (0:30) · 8. YouTube-Schlussvideo (Klick statt Autoplay)

Alles Deutsch B2, Schlüsselbegriffe **fett**. Design: dunkles Cosmos-Thema, Starfield-Canvas,
SVG-Donut + Galaxien-Diagramm, `prefers-reduced-motion` wird respektiert.
