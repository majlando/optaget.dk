# Roadmap — optaget.dk

Prioriteret plan for den videre udvikling. Afkryds efterhånden.

## 1. Live på domænet ✅
- [x] GitHub Pages-deploy via GitHub Actions (`.github/workflows/deploy.yml`)
- [x] `CNAME` med `optaget.dk`
- [x] DNS pegt mod GitHub Pages (A/AAAA + `www`-CNAME) hos One.com
- [x] HTTPS slået til (Let's Encrypt, Enforce HTTPS aktiv, http/www → https)
- [x] `404.html` i samme stil

## 2. Synlighed & SEO
- [x] Strukturerede data (JSON-LD: `WebSite` + `HowTo` + `FAQPage`)
- [x] `og:image` (delekort, 1200×630) + Twitter-card
- [ ] Google Search Console: verificér domæne og indsend `sitemap.xml`
- [ ] `hreflang` for DA/EN, hvis sprogene får separate URL'er

## 3. Mere indhold
- [x] Adgangskrav uddybet (generelle vs. specifikke, A/B/C-niveauer, karakterkrav)
- [x] Uddannelsestyper (erhvervsakademi / professionsbachelor / universitet)
- [x] Ordliste med fagord (adgangskvotient, standby, KOT …)
- [ ] Efter optagelse: SU, bolig, studiestart
- [ ] Optagelsesprøver & samtaler (kvote 2 på nogle uddannelser)
- [x] "Sidst opdateret"-dato + tydelige kildehenvisninger

## 4. Funktioner
- [x] Nedtælling til næste frist (dynamisk dato) — chip i hero + "Næste frist"-badge i tidslinjen
- [x] Læse-progressbar i toppen
- [ ] Interaktiv ansøgnings-tjekliste (gemmes lokalt)
- [ ] Del-knapper og evt. on-page-søgning

## 5. Teknik, privatliv & kvalitet
- [x] Self-hostede fonts (ingen Google-kald — hurtigere og GDPR-sikkert)
- [x] Tilgængeligheds-audit: WCAG AA-kontrast i begge temaer (+ `aria-current`)
- [x] Print/PDF-venligt stylesheet (tvinger lyst tema, folder FAQ ud)
- [x] Årlig vedligeholdelses-proces (`docs/VEDLIGEHOLD.md`)
- [x] Cookie-fri statistik (Cloudflare Web Analytics-loader — klar, mangler kun token)
- [ ] Lighthouse-audit: ydeevne + tilgængelighed
- [ ] Google Search Console + Bing: verificér domæne (kræver token fra din konto)

## 6. Når indholdet vokser
- [ ] Flersidet struktur
- [ ] Evt. let static-site-generator (Astro/Eleventy) med indhold i Markdown
