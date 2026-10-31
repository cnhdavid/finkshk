# Fink Haustechnik

Website von Fink Haustechnik: Next.js-Frontend (`web/`) und ASP.NET-Core-Backend (`api/`). Projektregeln und Fahrplan stehen in [CLAUDE.md](CLAUDE.md).

## Voraussetzungen

- Docker Desktop oder Docker Engine mit Compose
- Für die Arbeit im Dev-Container: VS Code mit der Erweiterung „Dev Containers“

## Lokal starten

Die App-Container laufen mit Docker Compose:

```bash
cp .env.example .env
docker compose -f compose.yaml -f compose.dev.yaml up --build
```

| Dienst | Adresse |
|---|---|
| Web | http://localhost:3000 |
| Web-Health | http://localhost:3000/health |
| API-Health | http://localhost:5080/health |
| Mailpit | http://localhost:8025 |

## Entwickeln im Dev-Container

Repository in VS Code öffnen und **Reopen in Container** wählen. Der Container enthält Node LTS, .NET 10 SDK, `dotnet-ef`, Git, GitHub CLI und Claude Code; Postgres und Mailpit laufen daneben.

Compose-Stack und Dev-Container belegen dieselben Ports, darum immer nur eines von beiden starten.

```bash
cd api && dotnet run --project Fink.Api
cd api && dotnet test
cd web && npm run dev
cd web && npm run lint && npm run typecheck && npm run build
node scripts/check-licenses.mjs
```

## Branches und Umgebungen

| Branch | Umgebung | Deployment |
|---|---|---|
| `feature/*`, `fix/*` | lokal | keines |
| `test` | `test.finkshk.de` | automatisch bei Push |
| `master` | `finkshk.de` | automatisch bei Push, nach manueller Freigabe |

Arbeitsfluss: `feature/*` → PR auf `test` → nach Abnahme PR `test` → `master`.

## GitHub einrichten

1. Branch Protection für `test` und `master`: Pull Request und grüne Checks `web`, `api`, `licenses` verlangen.
2. Environment `production` mit Pflicht-Reviewer anlegen.
3. Repository-Secrets anlegen:

| Secret | Inhalt |
|---|---|
| `VPS_HOST` | Hostname oder IP des Servers |
| `VPS_USER` | SSH-Benutzer mit Docker-Rechten |
| `VPS_SSH_KEY` | Privater Deploy-Schlüssel |
| `VPS_KNOWN_HOSTS` | Ausgabe von `ssh-keyscan <host>` |
| `GHCR_USER` | GitHub-Benutzer für den Image-Pull auf dem Server |
| `GHCR_TOKEN` | Token mit `read:packages` |

## Server einrichten

Einmalig auf dem VPS:

```bash
docker network create proxy
sudo mkdir -p /opt/fink /opt/fink-proxy
sudo chown "$USER" /opt/fink /opt/fink-proxy
```

`.env.test` und `.env.prod` nach dem Muster von `.env.example` in `/opt/fink` anlegen, jeweils mit eigenem Passwort und eigenem `POSTGRES_DB`. Diese Dateien liegen nur auf dem Server.

Proxy starten: `infra/proxy/compose.yaml`, `infra/proxy/Caddyfile` und `infra/proxy/.env.example` nach `/opt/fink-proxy` kopieren, die Vorlage in `.env` umbenennen und ausfüllen.

```bash
docker run --rm caddy:2.11-alpine caddy hash-password --plaintext '<passwort>'
cd /opt/fink-proxy && docker compose up -d
```

Der Hash muss in `.env` in einfachen Anführungszeichen stehen, weil er `$` enthält.

Mailpit der Test-Umgebung ist nur auf dem Server erreichbar, per Tunnel: `ssh -L 8025:127.0.0.1:8025 <user>@<host>`.

## Backups

`compose.prod.yaml` schreibt täglich einen `pg_dump` in das Volume `backups` und löscht Dumps nach `BACKUP_RETENTION_DAYS` Tagen. Das Volume liegt auf demselben Server, schützt also nicht vor einem Serverausfall.

## Lizenzen

`scripts/check-licenses.mjs` prüft alle npm- und NuGet-Pakete gegen eine Whitelist und läuft in der CI. Freigegebene Ausnahmen:

| Paket | Lizenz | Grund |
|---|---|---|
| `@img/sharp-*` | LGPL-3.0-or-later | Bibliothek `libvips` für `sharp`, unverändert genutzt |
| `caniuse-lite` | CC-BY-4.0 | Feste Abhängigkeit von Next.js |
| `axe-core` | MPL-2.0 | Nur Entwicklung, über das a11y-Lint-Plugin |
