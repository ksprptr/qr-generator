# QR Generator

> Modern QR code generator for permanent QR codes that never expire — fully client-side, no backend and no tracking.

- [Prerequisites](#prerequisites)
- [Features](#features)
- [Installation](#installation)
- [Run](#run)
- [Docker](#docker)
- [Configuration](#configuration)
- [License](#license)

## Prerequisites

- Node.js 24+ ([Download](https://nodejs.org/en/download/))
- IDE ([VS Code](https://code.visualstudio.com/), WebStorm, ...)
- Package manager ([pnpm (recommended)](https://pnpm.io/installation), npm, ...)
- Optional: [Docker](https://docs.docker.com/get-started/get-docker/) (to run the app in a container)

## Features

- **7 content types** — URL, text, WiFi, email, phone, SMS and contact (vCard)
- **Live preview** that updates as you type
- **Permanent codes** — the data is encoded directly into the QR, so it never expires
- **Privacy-first** — everything is generated in your browser, nothing is sent to a server
- **Export** to PNG and vector SVG, or copy straight to the clipboard
- **Selectable export size** (256 – 2048 px) and **error correction** level, with the resulting
  module count and pixels-per-square shown live
- **Logo page** (`/logo`) — download the app logo as a vector SVG
- **SEO ready** — OpenGraph/Twitter cards with a generated OG image, JSON-LD, manifest, robots,
  sitemap

## Installation

1. Clone the repository and navigate to the root: `cd qr-generator/`
2. Install all dependencies: `pnpm install`

## Run

- Development mode: `pnpm dev`
- Production mode: `pnpm build && pnpm start`
- Lint: `pnpm lint`
- Type check: `pnpm typecheck`
- Format: `pnpm format`

## Docker

The app ships a multi-stage `Dockerfile` (Next.js standalone output, non-root user) and a
`docker-compose.yml`.

```bash
cp .env.example .env          # optional — defaults work for localhost
docker compose up -d --build  # http://localhost:3000
docker compose logs -f qr-generator
docker compose down
```

Without compose:

```bash
docker build -t qr-generator --build-arg APP_URL=https://qr.example.com .
docker run --rm -p 3000:3000 -e APP_URL=https://qr.example.com qr-generator
```

`APP_URL` is inlined at **build time** — it feeds the prerendered canonical / OpenGraph / robots /
sitemap URLs and enables the `Strict-Transport-Security` header when it is an `https://` origin — so
pass it as a build arg for any non-localhost deployment, and keep the runtime value identical.
Request headers (`X-Forwarded-Host`) are deliberately not trusted: they are client-supplied, and
honoring them would let anyone put a foreign domain into the app's own canonical/OpenGraph URLs.

The compose file binds the published port to `127.0.0.1` (the container is meant to sit behind a
reverse proxy on the same host); drop that prefix to expose it on the network directly.

## Configuration

| Description       | Values                                          |
| ----------------- | ----------------------------------------------- |
| **Port:**         | 3000                                            |
| **Technologies:** | Next.js, React, Tailwind CSS                    |
| **URL:**          | http://localhost:3000                           |
| **Health check:** | http://localhost:3000/api/health                |
| **Env:**          | `APP_URL` (public origin), `APP_PORT` (compose) |

## License

> This software is developed by **Petr Kašpar** and is licensed under the MIT License.  
> For more details, please refer to the [LICENSE](./LICENSE) file.
