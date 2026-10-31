# CLAUDE.md – Rebuild finkshk.de

Rebuild der bestehenden Wix-Website von **Fink Haustechnik** (https://www.finkshk.de) als moderne React-App mit eigenem Backend. Ziel: schneller, SEO-starker, DSGVO-sauberer Auftritt eines lokalen SHK-Meisterbetriebs, den der Betreiber selbst pflegen kann (Projekte/Referenzen).

**Kostenvorgabe:** Außer Hosting (VPS) und Domain darf nichts Geld kosten. Keine kostenpflichtigen Libraries, APIs, SaaS-Dienste oder Lizenzen.

## Kunde & Inhalte

- Firma: Fink Haustechnik, Inhaber Andreas Fink
- Adresse: Rheinbergstraße 55, 65594 Runkel (Raum Limburg-Weilburg)
- Telefon: +49 172 9167075
- E-Mail: info@fink-haustechnik.de
- Instagram: https://www.instagram.com/finkshk/
- Positionierung: Meisterbetrieb für Sanitär, Heizung und Klima; Qualität, Kundenorientierung, Erfahrung, moderne Werkzeuge

### Seitenstruktur (1:1 übernehmen, dann verbessern)

| Route | Inhalt |
|---|---|
| `/` | Hero, Kurzvorstellung, Leistungs-Teaser, Referenz-Teaser, CTA Kontakt |
| `/leistungen/bad` | Badplanung bis Umsetzung: Bäder, Duschen, WC-Anlagen, Armaturen; Funktion, Ästhetik, hochwertige Materialien |
| `/leistungen/heizung` | Beratung und Installation: Heizsysteme, Wärmepumpen, Regelungstechnik; Nachhaltigkeit, Effizienz |
| `/leistungen/lueftung` | Raumklima: weniger Schadstoffe, Allergene, Feuchtigkeit, CO2 |
| `/leistungen/wartung` | Wartung, Inspektion, Reparatur, Effizienzoptimierung (auf alter Seite nur Abschnitt, hier eigene Seite) |
| `/ueber-uns` | Betrieb, Meister, Team, Werte |
| `/projekte` | Referenzgalerie aus dem Backend |
| `/projekte/[slug]` | Einzelprojekt mit Bildern, Kategorie, Ort, Beschreibung |
| `/kontakt` | Kontaktformular, Telefon, WhatsApp, Karte (consent-gated) |
| `/impressum` | Pflichtangaben nach § 5 DDG |
| `/datenschutz` | DSGVO-Erklärung passend zum neuen Stack |

Die Texte stammen von der alten Seite und liegen in `web/messages/de.json`. Bilder in voller Auflösung beim Kunden anfordern, nicht von Wix scrapen. Fehlende Inhalte mit `TODO(content)` markieren.

### Bekannte Probleme der alten Seite (im Rebuild beheben)

- WhatsApp-Icon ohne Link → `https://wa.me/491729167075` verwenden
- Mail-Domain (`fink-haustechnik.de`) weicht von Website-Domain (`finkshk.de`) ab → mit Kunde klären, welche Domain führend ist
- Wix-Overhead (JS-lastig, schlechte Core Web Vitals)

## Lizenzen & Kosten

- Nur Abhängigkeiten mit freier Lizenz für kommerzielle Nutzung: MIT, Apache 2.0, BSD, ISC, PostgreSQL License, OFL (Fonts)
- Vor jeder neuen Abhängigkeit Lizenz auf npm/NuGet prüfen; bei kommerzieller, Dual- oder unklarer Lizenz nicht installieren, sondern nachfragen
- MUI: nur `@mui/material`, `@mui/icons-material`, `@mui/material-nextjs` und MUI X Community-Pakete (`@mui/x-data-grid`, `@mui/x-date-pickers`). **Keine** `*-pro`/`*-premium`-Pakete
- .NET: keine Libraries, die auf kommerzielle Lizenz umgestellt haben (z. B. MediatR, AutoMapper, FluentAssertions ≥ 8, MassTransit ≥ 9). Stattdessen Framework-Bordmittel
- Keine kostenpflichtigen APIs: keine Google Maps Static/JS API mit API-Key, kein reCAPTCHA Enterprise, kein bezahlter Mail- oder Storage-Dienst
- Stock-Fotos nur mit freier Lizenz (z. B. Unsplash, Pexels), bevorzugt echte Kundenfotos

## Tech-Stack

### Frontend (`/web`)
- Next.js (aktuelle stabile Version), App Router, TypeScript strict, `output: "standalone"` für Self-Hosting
- Statische Generierung (SSG) für alle Inhaltsseiten, ISR für `/projekte`
- UI: MUI (`@mui/material`) mit Emotion, eingebunden über `AppRouterCacheProvider` aus `@mui/material-nextjs` im Root-Layout
- Kein Tailwind, kein zweites Styling-System; Styling ausschließlich über MUI-Theme, `sx` und `styled`
- Eigenes Theme in `web/src/theme/theme.ts` mit `createTheme({ cssVariables: true })`: Farben aus Logo, Typografie, Abstände, Komponenten-Overrides. Ziel: kein generischer Material-Look, sondern eigenständiger Handwerker-Auftritt
- Icons über `@mui/icons-material`, nur einzeln importieren (`@mui/icons-material/Phone`), nie Barrel-Imports
- Client-Komponenten (`"use client"`) nur wo nötig (Formulare, Menü, Galerie); Seiten bleiben Server-Komponenten
- `next/image` für alle Bilder (AVIF/WebP, responsive sizes; `sharp` installiert für Self-Hosting)
- `next/font` mit selbst gehosteten Fonts (OFL), keine Laufzeit-Requests an Google Fonts; Font im MUI-Theme referenzieren
- Formulare: React Hook Form + Zod, Felder als MUI-Komponenten über `Controller`
- Eigene wiederverwendbare Komponenten unter `web/src/components`
- i18n: `next-intl` ohne Locale-Routing; jeder sichtbare Text inklusive Metadaten und ARIA-Labels liegt in `web/messages/de.json`, im Code nur Keys. Client-Komponenten bekommen Texte als Props aus Server-Komponenten

### Backend (`/api`)
- ASP.NET Core (.NET 10, Minimal APIs)
- EF Core mit PostgreSQL (Npgsql)
- Endpunkte:
  - `POST /api/contact` – Kontaktanfrage speichern + Mail an Betrieb senden
  - `GET /api/projects`, `GET /api/projects/{slug}` – öffentliche Referenzen
  - `POST/PUT/DELETE /api/admin/projects` – Pflege durch Betreiber (Auth erforderlich)
  - `POST /api/admin/uploads` – Bild-Upload
- Mailversand über SMTP (MailKit) mit dem Postfach des Domain-Anbieters, Zugangsdaten nur über Umgebungsvariablen
- Spamschutz Kontaktformular: Honeypot-Feld + Rate Limiting (`Microsoft.AspNetCore.RateLimiting`), kein CAPTCHA-Dienst
- Admin-Auth: ASP.NET Core Identity mit Cookie-Auth, ein Admin-Account, kein Self-Signup
- Bild-Storage: lokales Docker-Volume (Abstraktion `IFileStorage`, Implementierung `LocalFileStorage`); Originale speichern, Optimierung übernimmt `next/image` mit `sharp`. Kein ImageSharp im Backend (Split-Lizenz)
- Validierung mit der eingebauten Minimal-API-Validierung von .NET 10 (`builder.Services.AddValidation()` + DataAnnotations), Fehler als `ProblemDetails`
- OpenAPI-Spec über `Microsoft.AspNetCore.OpenApi` generieren; Frontend-Typen daraus erzeugen (`openapi-typescript`)

### Admin-Bereich
- Unter `/admin` im Next.js-Frontend, nicht indexiert (`robots: noindex`)
- Mit MUI umgesetzt: `AppBar` + `Drawer`-Layout, Projektliste mit `@mui/x-data-grid` (Community), Formulare mit MUI-Feldern, Feedback über `Snackbar`
- Funktionen: Login, Projekte anlegen/bearbeiten/löschen, Bilder hochladen und sortieren, Kontaktanfragen einsehen
- Nach Änderung an Projekten: Next.js On-Demand-Revalidation über geschützten Webhook auslösen

## Umgebungen & Branches

| Branch | Umgebung | URL | Deployment |
|---|---|---|---|
| `feature/*`, `fix/*` | lokal (Dev-Container) | `localhost` | – |
| `test` | Test/Staging | `test.finkshk.de` | automatisch bei Push auf `test` |
| `master` | Produktion | `finkshk.de` | automatisch bei Push auf `master`, mit manueller Freigabe (GitHub Environment `production`) |

- Arbeitsfluss: `feature/*` → PR auf `test` → nach Abnahme PR `test` → `master`
- Direkte Pushes auf `test` und `master` verboten (Branch Protection), PRs brauchen grüne CI
- Test-Umgebung: eigene Datenbank, eigenes Upload-Volume, HTTP Basic Auth über Caddy, `X-Robots-Tag: noindex`, Mails an Mailpit statt echtem Postfach
- Prod und Test laufen auf demselben VPS als getrennte Compose-Projekte (`-p fink-prod`, `-p fink-test`)

## Docker

- **Dev-Container** (`.devcontainer/`): Entwicklung komplett im Container. Image mit Node LTS, .NET 10 SDK, `dotnet-ef`, Git, GitHub CLI, Claude Code CLI. Postgres und Mailpit als Begleit-Services über Compose. Ports: web 3000, api 5080, Mailpit 8025
- **Dockerfiles** pro App, Multi-Stage, Non-Root-User, Healthcheck:
  - `web/Dockerfile`: deps → build → runner (Next.js `standalone`)
  - `api/Dockerfile`: `sdk` build/publish → `aspnet` runtime; Migrationen beim Start über eigenen Befehl, nicht automatisch im Request-Pfad
- **Compose-Dateien** (Basis + Override):
  - `compose.yaml` – gemeinsame Services: `web`, `api`, `db`
  - `compose.dev.yaml` – lokale Builds, Mailpit, Ports nach außen
  - `compose.test.yaml` – Images mit Tag `test`, Mailpit, Basic Auth
  - `compose.prod.yaml` – Images mit Tag `latest`, Restart-Policies, Backup-Container
- **Reverse Proxy** separat unter `infra/proxy/` (eigener Compose-Stack mit Caddy, externes Docker-Netzwerk `proxy`), routet beide Domains auf die jeweiligen Stacks
- Images in der GitHub Container Registry (`ghcr.io`), Tags: `test`, `latest`, Commit-SHA
- Env-Dateien: `.env.example` im Repo; `.env.test` und `.env.prod` nur auf dem Server

## CI/CD (GitHub Actions)

- `ci.yml` – bei jedem PR: Lint, Typecheck, Build, `dotnet test`, Lizenz-Check
- `deploy-test.yml` – Push auf `test`: Images bauen/pushen (Tag `test` + SHA), per SSH `docker compose -p fink-test ... pull && up -d`, danach Migrationen
- `deploy-prod.yml` – Push auf `master`: gleich, Tag `latest` + SHA, Environment `production` mit manueller Freigabe
- Secrets (SSH-Key, Host, Registry) nur als GitHub Secrets

## Projektstruktur

```
/
├── CLAUDE.md
├── README.md
├── .devcontainer/            devcontainer.json, Dockerfile, compose
├── .github/workflows/        ci.yml, deploy-test.yml, deploy-prod.yml
├── compose.yaml
├── compose.dev.yaml
├── compose.test.yaml
├── compose.prod.yaml
├── .env.example
├── infra/proxy/              Caddy-Stack (compose.yaml, Caddyfile)
├── web/                      Next.js
│   ├── messages/             Übersetzungsdateien (de.json)
│   └── src/
│       ├── app/              Routen
│       ├── components/
│       ├── theme/            MUI-Theme
│       ├── lib/              API-Client, Utils
│       ├── i18n/             next-intl-Konfiguration
│       └── content/          Kontaktdaten, Leistungs-Slugs, Typen (keine Texte)
└── api/
    ├── Fink.Api/             Endpunkte, Program.cs
    ├── Fink.Domain/          Entities
    ├── Fink.Infrastructure/  EF Core, Mail, Storage
    └── Fink.Tests/           xUnit + Testcontainers
```

## Design

- Seriöser Handwerksbetrieb, modern, viel Weißraum, große echte Projektfotos
- Farben aus Logo ableiten (Logo beim Kunden als SVG anfragen), zentral im MUI-Theme definieren
- MUI-Defaults bewusst überschreiben (Rundungen, Schatten, Buttons, Typografie), damit es nicht nach Standard-Material-Design aussieht
- Mobile first: Telefonnummer und WhatsApp auf Mobile immer erreichbar (Sticky-CTA, z. B. `Fab` oder fixierte Bottom-Bar)
- Klickbare `tel:`- und `mailto:`-Links (alte Seite unterdrückt Telefon-Erkennung)
- Barrierefreiheit: WCAG 2.2 AA, semantisches HTML (`component`-Prop nutzen, z. B. `Typography component="h1"`), sichtbarer Fokus, Alt-Texte Pflicht im Admin-Upload

## Karte

- Kein API-Key, keine kostenpflichtige Maps-API
- Standardanzeige: statisches Kartenbild (selbst erstellter OpenStreetMap-Ausschnitt mit Attribution „© OpenStreetMap-Mitwirkende“) als lokale Datei
- Zwei-Klick-Lösung: erst nach Zustimmung kostenloses Google-Maps-iframe (Embed ohne Key) oder OSM-iframe laden
- Zusätzlich Link „Route planen“ zu Google Maps

## SEO & lokale Auffindbarkeit

- Pro Seite eigene `metadata` (Title, Description, Canonical, Open Graph)
- JSON-LD `LocalBusiness` bzw. `Plumber`/`HVACBusiness` mit Adresse, Telefon, Einzugsgebiet, Öffnungszeiten (beim Kunden erfragen)
- `sitemap.xml` und `robots.txt` über Next.js-Routen generieren
- 301-Redirects von alten Wix-URLs in `next.config` (alte URL-Liste vor Go-Live aus Google Search Console oder Wix exportieren)
- Ortsbezug in Texten: Runkel, Limburg, Weilburg, Landkreis Limburg-Weilburg
- Ziel Lighthouse: Performance ≥ 90, alle anderen Kategorien ≥ 95. Wegen MUI/Emotion auf Bundle-Größe achten: einzelne Imports, wenig Client-Komponenten

## Datenschutz & Recht (Deutschland)

- Kein Tracking, keine Cookies außer technisch notwendigem Admin-Session-Cookie → kein Cookie-Banner nötig
- Falls Analytics gewünscht: nur cookielos und self-hosted (Umami im selben Docker-Setup)
- Google Maps nur per Zwei-Klick-Lösung (siehe Karte)
- Instagram nur als Link, kein Embed
- Kontaktformular: Hinweis auf Datenschutzerklärung, Anfragen nach definierter Frist löschen (Background-Job im API)
- Impressum- und Datenschutztexte vom Kunden bzw. kostenlosem Generator liefern lassen, nicht selbst erfinden → `TODO(legal)`

## Hosting & Deployment

- Ein günstiger VPS (z. B. Hetzner) mit Docker Compose: `web`, `api`, `postgres`, `caddy`
- Kein Vercel: der kostenlose Hobby-Plan ist nur für nicht-kommerzielle Nutzung
- Caddy als Reverse Proxy mit automatischem Let's-Encrypt-HTTPS; `/api/*` → API, Rest → Next.js
- Volumes für Postgres-Daten und Uploads; tägliches `pg_dump`-Backup per Cron-Container
- Deployment über GitHub Actions (Free Tier): Images bauen, per SSH auf VPS `docker compose pull && up -d`

## Konventionen

- Sprache der UI: Deutsch (Sie-Form). Code, Bezeichner, Commits: Englisch
- Keine Kommentare im Code; sprechende Namen statt Kommentare
- Conventional Commits mit Scope `web` oder `api`, z. B. `feat(web): add services pages`
- Frontend: ESLint + Prettier, keine `any`
- Backend: Nullable enabled, `TreatWarningsAsErrors`
- Secrets nur über `.env` / User Secrets, nie committen; `.env.example` pflegen

## Befehle

Im Dev-Container:

```
cd api && dotnet run --project Fink.Api
cd api && dotnet test
cd api && dotnet ef migrations add <Name> -p Fink.Infrastructure -s Fink.Api
cd web && npm install && npm run dev
cd web && npm run lint && npm run build
cd web && npm run gen:api
docker compose -f compose.yaml -f compose.dev.yaml up --build
```

## Vorgehen beim Rebuild

1. Repo-Gerüst: Dev-Container, Dockerfiles, Compose-Dateien (dev/test/prod), `infra/proxy`, GitHub-Workflows, `.env.example`, `.gitignore`, README; leeres Next.js-Projekt mit Healthcheck-Route und leeres .NET-Solution mit `GET /health`. Fertig, wenn `compose.dev` beide Apps startet und die CI lokal grün wäre
2. MUI-Setup (`AppRouterCacheProvider`, Theme, Font), Layout, Header/Navigation, Footer mit Kontaktdaten
3. Statische Seiten: Home, Leistungen, Über uns, Impressum, Datenschutz
4. Backend: Contact-Endpoint inkl. Mail, Rate Limit, Honeypot; Kontaktseite inkl. Karte anbinden
5. Backend: Projects-Domain, Migrationen, öffentliche Endpunkte; Projektseiten mit ISR
6. Admin: Auth, Projekt-CRUD, Bild-Upload, Revalidation-Webhook
7. SEO: Metadata, JSON-LD, Sitemap, Redirects
8. Tests, Lizenz-Check aller Abhängigkeiten (`npx license-checker --summary`, NuGet-Lizenzen), Lighthouse-Check, Deployment

Jeden Schritt einzeln abschließen und bauen/testen, bevor der nächste beginnt.

## Offene Punkte beim Kunden

- Originaltexte, Logo (SVG), Fotos in Originalauflösung, Bildrechte
- Führende Domain und Mail-Adresse, SMTP-Zugangsdaten des Postfachs
- Öffnungszeiten, Einzugsgebiet, Zertifikate/Partnerlogos
- Impressum-Pflichtangaben (Handwerkskammer, Registereintrag, USt-ID)
- VPS-Anbieter und wer den Server betreibt