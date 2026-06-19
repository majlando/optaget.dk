# optaget.dk

En enkel, statisk guide om studieoptag i Danmark — kvote 1 & 2, vigtige datoer
og hvordan man søger trin for trin på optagelse.dk.

Tosproget (dansk/engelsk) med lyst og mørkt tema. Ingen build-værktøjer, ingen
afhængigheder. Bare HTML, CSS og lidt vanilla JS.

## Funktioner

- **Sprog (DA/EN):** auto-detekteres fra browseren og kan skiftes med knappen i
  toppen. Valget gemmes i `localStorage`.
- **Lyst/mørkt tema:** følger systemets indstilling som udgangspunkt, kan
  skiftes med sol/måne-knappen, og valget huskes. Virker også uden JS via
  `prefers-color-scheme`.
- **Tilgængeligt & responsivt:** semantisk HTML, skip-link, fokus-markering,
  mobilmenu og «reduced motion»-respekt.

## Filstruktur

```
optaget-dk/
├─ index.html          # Hele one-pageren (indhold som data-i18n-nøgler)
├─ favicon.svg         # Ikon
├─ robots.txt          # Søgemaskine-instruktioner
├─ sitemap.xml
├─ README.md
└─ assets/
   ├─ styles.css       # Al styling (lys + mørk via CSS-variabler øverst)
   ├─ i18n.js          # Alle tekster på dansk og engelsk
   └─ app.js           # Sprog, tema, mobilmenu, aktiv-sektion
```

## Kør lokalt

Åbn `index.html` direkte i browseren — eller start en lille webserver for at
få fonte/relative stier til at opføre sig som i produktion:

```bash
# Python (medfølger på de fleste maskiner)
python -m http.server 8000
# → åbn http://localhost:8000
```

## Udgiv (deploy)

Det er rene statiske filer, så de kan ligge hos stort set enhver host:

- **Almindelig webhost / dit nuværende domæne:** upload hele mappens indhold
  til web-roden (typisk `public_html/` eller `www/`) via FTP.
- **Netlify / Vercel / Cloudflare Pages:** træk mappen ind, eller forbind et
  git-repo. Ingen build-kommando; "publish directory" = projektroden.

Husk at pege DNS for `optaget.dk` mod din host og slå HTTPS til.

## Vedligehold & indhold

- **Tekst:** al tekst ligger i `assets/i18n.js` — ét objekt pr. sprog (`da` og
  `en`) med samme nøgler. Ret en tekst begge steder, så sprogene følges ad. I
  `index.html` peger hvert element på sin nøgle via `data-i18n` (ren tekst) eller
  `data-i18n-html` (tekst med fed/kursiv m.m.).
- **Tilføj indhold:** opret et nyt element med `data-i18n="min.nøgle"` i
  `index.html` og tilføj `"min.nøgle"` i både `da` og `en` i `i18n.js`.
- **Farver/typografi:** justér CSS-variablerne i toppen af `assets/styles.css`.
  Det lyse tema står i `:root`, det mørke i `[data-theme="dark"]` (og en kopi i
  `@media (prefers-color-scheme: dark)` til brug uden JS).
- **Datoer:** fristerne i tidslinjen er de typiske. Bekræft de præcise datoer
  for det aktuelle ansøgningsår på [optagelse.dk](https://optagelse.dk), før de
  offentliggøres.

> Bemærk: optaget.dk er en uafhængig guide, ikke en offentlig myndighed.
> De officielle kilder er [optagelse.dk](https://optagelse.dk) og
> [ug.dk](https://www.ug.dk).

## Klar til at vokse

One-pageren er bygget så den let kan blive til flere sider: hver `<section>`
(kvote 1, kvote 2, datoer …) kan flyttes til sin egen `.html`-fil, og menuen i
toppen kan pege på rigtige sider i stedet for ankre. CSS'en og favicon kan
genbruges som de er.
