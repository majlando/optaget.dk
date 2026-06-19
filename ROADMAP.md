# Roadmap — optaget.dk

Prioriteret plan for den videre udvikling. Afkryds efterhånden.

## 1. Live på domænet ✅ (under opsætning)
- [x] GitHub Pages-deploy via GitHub Actions (`.github/workflows/deploy.yml`)
- [x] `CNAME` med `optaget.dk`
- [ ] DNS pegt mod GitHub Pages hos domæneudbyder (A/AAAA + `www`-CNAME)
- [ ] HTTPS slået til (når DNS er verificeret, sker automatisk)
- [x] `404.html` i samme stil

## 2. Synlighed & SEO
- [x] Strukturerede data (JSON-LD: `WebSite` + `FAQPage`)
- [x] `og:image` (delekort, 1200×630) + Twitter-card
- [ ] Google Search Console: verificér domæne og indsend `sitemap.xml`
- [ ] `hreflang` for DA/EN, hvis sprogene får separate URL'er

## 3. Mere indhold
- [ ] Adgangskrav uddybet (generelle vs. specifikke, A/B/C-niveauer, karakterkrav)
- [ ] Efter optagelse: SU, bolig, studiestart
- [ ] Optagelsesprøver & samtaler (kvote 2 på nogle uddannelser)
- [ ] Ordliste med fagord (adgangskvotient, standby, KOT …)
- [ ] "Sidst opdateret"-dato + tydelige kildehenvisninger

## 4. Funktioner
- [x] Nedtælling til næste frist (dynamisk dato) — chip i hero + "Næste frist"-badge i tidslinjen
- [ ] Interaktiv ansøgnings-tjekliste (gemmes lokalt)
- [ ] Del-knapper og evt. on-page-søgning

## 5. Teknik, privatliv & kvalitet
- [x] Self-hostede fonts (ingen Google-kald — hurtigere og GDPR-sikkert)
- [ ] Cookie-fri statistik (Plausible / Umami / Cloudflare Web Analytics)
- [ ] Lighthouse-audit: ydeevne + tilgængelighed

## 6. Når indholdet vokser
- [ ] Flersidet struktur
- [ ] Evt. let static-site-generator (Astro/Eleventy) med indhold i Markdown
