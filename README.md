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

> **Kanoniche URL:** Die SEO/AI-Metadaten (`index.html`, `robots.txt`, `sitemap.xml`, `llms.txt`)
> zeigen auf **`https://dunkle-materie.odedo.dev`** (Open-Graph-Tags, JSON-LD, Sitemap, Canonical).

## SEO & KI-Zugriff

Die Single-Page-App ist JS-rendert; für Suchmaschinen und KI-Crawler liegt der Inhalt deshalb
**ohne Ausführung zusätzlich** als reiner Text bereit:

- **`index.html`**: `og:`/`twitter:`-Meta (soziale Vorschau), JSON-LD Structured Data
  (`LearningResource` mit allen Folien inkl. `#/N`-Deep-Links) und ein `<noscript>`-Block mit dem
  kompletten Folieninhalt.
- **`public/llms.txt`**: maschinenlesbarer Gesamtinhalt nach der `llmstxt.org`-Konvention für
  LLM-Crawler.
- **`public/robots.txt`** + **`public/sitemap.xml`**: erlauben das Indexieren und listen die
  Ausgangs-Page plus alle neun `#/0`–`#/8`-Tiefenlinks.

### Navigation über die URL (Hash-Routing)

Der aktuelle Folienindex liegt in der URL (History API): `#/` (Start) bzw. `#/0`–`#/8` für einzelne
Folien. Dadurch funktionieren **Zurück/Vorwärts**, Deep-Links und das Neuladen auf der gewünschten
Folie. Die Folie 0 hat dabei keinen Number-Hash.

## Modi: Üben vs. Vortragen

- **Training:** `?training=1` anhängen (z. B. `http://localhost:4173/?training=1`) — zeigt
  Sprechernotizen (Button + <kbd>N</kbd>), Notiz-Hinweis und Zeitangaben pro Folie.
- **Klasse (Standard):** URL ohne Parameter — Notizen, Notizen-Button und Zeitangaben sind
  komplett ausgeblendet, auch per Tastatur nicht aufrufbar.

## Bedienung im Unterricht

| Aktion          | Wie                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------- |
| Weiter/Zurück   | Buttons oder <kbd>←</kbd>/<kbd>→</kbd> (auch <kbd>Space</kbd>, <kbd>PgUp</kbd>/<kbd>PgDn</kbd>) |
| Anfang/Ende     | <kbd>Home</kbd>/<kbd>End</kbd>, Punkte oben anklickbar                                          |
| Sprechernotizen | <kbd>N</kbd> oder 🗒-Button (Overlay nur für dich, Publikum sieht es nicht)                      |
| Vollbild        | <kbd>F</kbd>                                                                                    |
| Schließen       | <kbd>Esc</kbd> schließt Notizen                                                                 |

## Folien (9)

1. Einführung (1:00) · 2. Unsere Quelle (0:30) · 3. Universum 5/27/68 (2:00 + Vokabelbox) ·
4. Galaxienrotation (2:00) · 5. Zwicky & Rubin (2:00) · 6. Suche: WIMPs/Axionen, Linsen, Untergrund (2:00) ·
7. Roman-Teleskop, Start 30.8.2026 (1:30) · 8. Fazit (0:30) · 9. YouTube-Schlussvideo (Klick statt Autoplay)

Alles Deutsch B2, Schlüsselbegriffe **fett**. Design: dunkles Cosmos-Thema, Starfield-Canvas,
echte Fotos (NASA/ESA Hubble, Wikimedia Commons), `prefers-reduced-motion` wird respektiert.

## Bildnachweise (alle in `public/img/` gebündelt, offline lauffähig)

- M51 / Andromeda / Abell 370 / Roman-Render: NASA, ESA, Hubble / Goddard (gemeinfrei)
- Vera Rubin: American Institute of Physics (Nutzung mit Namensnennung)
- Nancy Grace Roman (1969): NASA (gemeinfrei)
- Fritz Zwicky (1960): ETH-Bibliothek via Wikimedia Commons (CC BY-SA 4.0)
