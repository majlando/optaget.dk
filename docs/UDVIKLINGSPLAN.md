# Udviklingsplan — optaget.dk

En samlet plan for hvor sitet kan bevæge sig hen: indhold, teknologi, UI/UX,
SEO, privatliv og drift. Tænkt som et levende dokument — ikke alt skal laves,
og rækkefølgen kan ændres.

---

## Vision

> **Danmarks klareste, hurtigste og mest troværdige gratis guide til studieoptag.**

Principper, vi holder fast i:

- **Enkelt frem for fuldstændigt** — forklar det vigtigste rigtig godt, frem for alt.
- **Uafhængigt og ærligt** — ingen reklamer, ingen login, tydelige kilder.
- **Hurtigt og privat** — statisk, self-hostede fonts, ingen unødige cookies, GDPR-sikkert.
- **Tilgængeligt for alle** — tosproget, WCAG AA, virker på enhver enhed.

---

## 1. Indhold (den vigtigste værdi)

Det er her sitet skal vinde. Prioriteret:

### 1A. Uddyb det vi har
- **Adgangskrav**: generelle vs. specifikke krav, fag­niveauer (A/B/C), karakterkrav, områdespecifikke krav.
- **Motiveret ansøgning**: en kort, konkret "sådan skriver du den"-guide (kvote 2).
- **Adgangskvotient & bonus**: hvordan kvotienten dannes, 1,08-ganges­bonus (tidlig start), A-fags­bonus, justeret snit.
- **Standby**: hvad det reelt betyder, hvornår man takker ja, garanti året efter.
- **Optagelsesprøver & samtaler**: hvilke uddannelser, hvad de tester.
- **Efter optagelse**: SU, bolig, studiestart, hvad man gør, hvis man fortryder.

### 1B. Nyt kerneindhold
- **Ordliste** med fagord (adgangskvotient, KOT, standby, optagelsesområde …).
- **Uddannelsestyper**: erhvervsakademi, professionsbachelor, universitet — forskelle.
- **GSK / suppleringskurser**: hvis man mangler fag eller karakter.
- **Sommer- vs. vinteroptag**.
- **Internationale/EU-ansøgere** (senere — passer godt til den engelske version).

### 1C. Troværdighed
- **"Sidst opdateret"-dato** på siden.
- **Kildehenvisninger** ved tal og frister (optagelse.dk, ug.dk, UFM).
- **Årlig vedligehold**: tjekliste til at opdatere datoer/kvotienter hvert år.

---

## 2. UI/UX

- **Indholdsfortegnelse / sticky mini-nav** når siden(rne) bliver længere.
- **Læse-progressbar** på lange sider.
- **On-page-søgning** når indholdet vokser.
- **Print/PDF-venlig udgave** (et `@media print`-stylesheet).
- **Tilgængeligheds-audit**: kontrast i begge temaer, fokus­rækkefølge, skærmlæser, `prefers-reduced-motion` (delvist på plads).
- **Beslutningshjælper** (let, valgfri): "Kvote 1 eller 2 for mig?" eller "Hvilken vej skal jeg gå?" — få spørgsmål, konkret svar.
- Bevar det rolige, redaktionelle udtryk — mikrointeraktioner med måde.

---

## 3. Funktioner

- **Nedtælling til næste frist** ✅ (kan udvides med alle nøgledatoer).
- **"Føj til kalender"** (.ics-fil) for kvote 1/2-frister og svardato.
- **Interaktiv ansøgnings-tjekliste** der gemmes lokalt (localStorage).
- **Snit-/bonus-hjælper** med tydelige forbehold (ikke officiel beregning).
- **Påmindelse om frister** (kræver backend/e-mailtjeneste — privatlivs­venligt, dobbelt-opt-in).

---

## 4. Teknologi & arkitektur

- **Nu**: rent statisk (HTML/CSS/vanilla JS). Behold den lave kompleksitet så længe det er én side.
- **Når indholdet vokser** (flere sider): migrér til en let **static-site-generator** — Astro eller Eleventy:
  - Indhold i **Markdown**, komponenter genbruges, temaet (CSS-variabler) flyttes 1:1.
  - **i18n** via generatorens routes (`/da`, `/en`) eller content-collections.
  - **Build-pipeline**: minificér HTML/CSS/JS, optimér billeder, auto-generér `sitemap.xml` og `hreflang`.
- Bevar "nul runtime-afhængigheder" i browseren.
- **Design-tokens**: CSS-variablerne er allerede et lille token-system — kan formaliseres.

---

## 5. SEO & distribution

- ✅ JSON-LD (`WebSite` + `FAQPage`), `og:image`, `sitemap.xml`, `robots.txt`.
- **HowTo-schema** på "Søg trin for trin" — stærkt match til rich results.
- **`hreflang`** for da/en + sprog-specifikke `<title>`/meta (kræver separate URL'er → punkt 4).
- **BreadcrumbList** når sitet bliver flersidet.
- **Google Search Console + Bing**: verificér og indsend sitemap.
- **Indholds-SEO**: skriv målrettet mod søgninger som "kvote 2 ansøgning", "adgangskvotient 2026", "optagelse.dk guide". Årlige opdaterings­artikler/nyheder.
- **Backlinks**: studievejledere, gymnasier, studieportaler.

---

## 6. Privatliv, tillid & compliance

- ✅ Self-hostede fonts (ingen Google-kald).
- **Cookie-fri statistik** (Plausible / Umami / Cloudflare Web Analytics) — besøgstal uden samtykke­banner.
- **Privatlivspolitik** (kun nødvendig hvis/ når der indsamles data).
- **Tilgængeligheds­erklæring**.
- **Om/kontakt-side** — hvem står bag, og at sitet ikke er en myndighed.

---

## 7. Kvalitet & drift

- **Lighthouse-mål**: 100 på performance/SEO/best-practices, AA på a11y.
- **CI på pull requests** (GitHub Actions): HTML-validering, link-tjek, evt. Lighthouse CI.
- **Årligt vedligehold**: opdatér datoer/kvotienter; changelog.
- **Bidrags-guide + issue-skabeloner** hvis andre skal kunne bidrage.

---

## Faseinddeling (forslag)

**Fase 1 — Fundament & indhold (nu → uger)**
HTTPS live · uddyb adgangskrav, motiveret ansøgning, efter optagelse · ordliste ·
"sidst opdateret" + kilder · HowTo-schema · cookie-fri statistik.

**Fase 2 — Interaktivitet & UX**
Tjekliste · .ics-frister · snit-hjælper · indholdsfortegnelse · søgning · print-stylesheet · a11y-audit.

**Fase 3 — Skalering**
Migrér til Astro/Eleventy · separate da/en-URL'er + hreflang · nyheder/blog · frist-påmindelser.

**Fase 4 — Vækst & modenhed**
Indholds-SEO i dybden · partnerskaber · tilgængeligheds­erklæring · CI-kvalitetsporte · løbende årlig drift.

---

## Allerede leveret

- Tosproget single-page (DA/EN) med lyst/mørkt tema, self-hostede fonts.
- Kerneindhold: KOT, kvote 1/2, datoer, søg-trin-for-trin, FAQ.
- Dynamisk nedtælling til næste frist + "næste frist"-badge.
- SEO-pakke: JSON-LD, og:image, sitemap, robots.
- Brand-ikon + komplet ikonsæt + web-manifest.
- 404-side. GitHub Pages-deploy via Actions + custom domain.
