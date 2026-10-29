# bh02 – Időpontfoglaló javítása

Csatlos Erik – Webfejlesztés, UMFST

| # | Hiba | Ok | Javítás |
|---|---|---|---|
| 1 | Dupla foglalás ugyanarra az időre | `indexOf` szöveget keres objektumok tömbjében | `some(f => f.ido === ido)` |
| 2 | 9 beteg fér be 8 helyett | Off-by-one: `>` | `>=` |
| 3 | A lista nincs időrendben | A `sort` true/false-t kapott szám helyett | `localeCompare` |
| 4 | HTML-kód a névben lefut (stored XSS) | Felhasználói adat `innerHTML`-ben | `createElement` + `textContent` |
| 5 | Lassú renderelés sok foglalásnál | `innerHTML +=` ciklusban (O(n²)) | `DocumentFragment`, egyszeri hozzáfűzés |
| 6 | A Törlés billentyűzettel nem érhető el | `span` gomb helyett (WCAG 2.1.1, 4.1.2) | `<button>` + `aria-label` + eseménydelegálás |

**Tesztelés:** kézi tesztlépések minden hibára (dupla foglalás, 9. foglalás, rendezés, XSS-név, Tab-bejárás), Local Storage ürítése a DevTools Application fülén.

**Tanulság:** felhasználói adatot soha nem szabad `innerHTML`-be tenni; a határértékeket (8 vs. 9) mindig tesztelni kell; natív `button` a kattintható elemekhez.

Javítás: https://github.com/ErikCsatlos12/umfst-bh02-idopontfoglalo/commit/ce98d365636a197bb5290a6bd5da426a58bb2fb4