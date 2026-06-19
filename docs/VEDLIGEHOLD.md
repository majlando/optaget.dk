# Årlig vedligeholdelse — optaget.dk

Indholdet skal tjekkes én gang om året, typisk **når det nye ansøgningsår
offentliggøres på [optagelse.dk](https://optagelse.dk) (omkring årsskiftet)**.
Det tager 15-30 minutter. Følg tjeklisten herunder.

> Tommelfingerregel: fristerne ligger næsten altid fast (kvote 2 = 15. marts,
> kvote 1 = 5. juli, svar = 28. juli), men **bekræft dem altid** mod de officielle
> kilder, før du opdaterer.

## Tjekliste

- [ ] **Bekræft datoerne** på optagelse.dk og [ug.dk](https://www.ug.dk):
      kvote 2-frist, kvote 1-frist, svardato, studiestart.
- [ ] **Opdatér datoer** i `assets/i18n.js` — ret både `da` og `en`:
  - `d.t1.date` … `d.t5.date` (datoerne i tidslinjen)
  - `d.t2.time`, `d.t3.time` (klokkeslæt, typisk "kl. 12:00")
- [ ] **Tjek nedtællingen** i `assets/app.js` → `DEADLINES`-arrayet
      (`{ key, month, day }`). Ret kun hvis en frist reelt flytter sig.
- [ ] **Opdatér "sidst opdateret"** i `assets/i18n.js`:
      `foot.updated` (da: "Sidst opdateret <måned> <år>", en: "Last updated …").
- [ ] **Hvis du tilføjer adgangskvotienter/tal:** notér kilde og årstal, og
      gør det tydeligt, at tal fra sidste år kun er vejledende.
- [ ] **Klik kildelinks igennem** (footer + `d.sources`) — at de stadig virker.
- [ ] **Test lokalt** og tjek begge sprog + begge temaer (DA/EN, lys/mørk).
- [ ] **Commit + push** → GitHub Actions deployer automatisk.

## Hvor tingene står

| Hvad | Fil | Nøgle/sted |
|------|-----|------------|
| Datoer i tidslinjen | `assets/i18n.js` | `d.t1.date` … `d.t5.date`, `d.t*.time` |
| Nedtællingens frister | `assets/app.js` | `DEADLINES` (måned/dag) |
| "Sidst opdateret" | `assets/i18n.js` | `foot.updated` (da + en) |
| Kildehenvisninger | `assets/i18n.js` + footer i `index.html` | `d.sources`, `foot.sources` |
| HowTo/FAQ strukturerede data | `index.html` | `<script type="application/ld+json">` |

> Bemærk: copyright-året i footeren sættes automatisk af JavaScript
> (`#year` i `app.js`) — det skal ikke opdateres manuelt.

## Sanity-tjek efter ændringer

```bash
# JSON-LD og JS er gyldige
node --check assets/app.js && node --check assets/i18n.js

# Alle i18n-nøgler findes i både da og en (skal alle vise 2)
#   se evt. scriptet i projektets historik
```

Bekræft til sidst på den kørende side, at nedtællingen viser det rigtige antal
dage til den næste reelle frist.
