# Workit — marketplace concept

Interactieve, Nederlandstalige mockup voor een Booking.com-achtige zoekervaring, gericht op Belgische vakmensen: loodgieters, klusjesmannen, aannemers, elektriciens en schilders.

## Starten

Open **index.html** in een browser. Geen installatie, buildproces, account of database nodig. Voor een lokale webserver kun je bijvoorbeeld uitvoeren:

    python3 -m http.server 8000

Open daarna http://localhost:8000.

## Wat werkt in de demo?

- Zoeken op type vakman, regio en gewenste timing
- Categoriekaarten, sorteren en filters (prijs, verificatie, beoordeling)
- Interactieve resultaatkaarten met fictieve profielen
- Profielen bewaren met het hartje en ze opnieuw filteren
- Offerteformulier met validatie en simulatie van een bevestiging
- Illustratieve kaart (bewust geen echte adressen)
- Responsive desktop- en mobiele layout

## Belangrijk

**Dit is een UX/UI-prototype, geen werkende marktplaats.** Alle namen, reviews, afstanden, prijzen en beschikbaarheden zijn fictief. Er worden geen offertes verzonden, persoonsgegevens opgeslagen of afspraken geboekt. De foto's zijn illustratieve externe afbeeldingen; als een afbeelding niet laadt, wordt een gekleurde placeholder getoond.

## Technisch

De demo bestaat uit drie statische bestanden:

- \`index.html\` — paginaopbouw en formulieren
- \`styles.css\` — responsive styling
- \`app.js\` — voorbeelddata en client-side interacties

Fonts worden geladen via Google Fonts; zonder internet valt de typografie terug op systeemfonts.

## Logische volgende fase

Eerst valideren welke informatie klanten echt nodig hebben om een vakman te kiezen. Daarna kan een echte versie gekoppeld worden aan gebruikersaccounts, geverifieerde bedrijfsprofielen, postcode-/radiuszoekopdrachten, beschikbaarheden en een offerte- en berichtensysteem.

**Branch:** \`feature/booking-style-marketplace\`
