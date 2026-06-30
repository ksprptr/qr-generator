# QR Generator

> Modern QR code generator for permanent QR codes that never expire — fully client-side, no backend and no tracking.

- [Prerequisites](#Prerequisites)
- [Features](#Features)
- [Installation](#Installation)
- [Run](#Run)
- [Configuration](#Configuration)
- [License](#License)

## Prerequisites

- Node.js 24+ ([Download](https://nodejs.org/en/download/))
- IDE ([VS Code](https://code.visualstudio.com/), WebStorm, ...)
- Package manager ([pnpm (recommended)](https://pnpm.io/installation), npm, ...)

## Features

- **7 content types** — URL, text, WiFi, email, phone, SMS and contact (vCard)
- **Live preview** that updates as you type
- **Permanent codes** — the data is encoded directly into the QR, so it never expires
- **Privacy-first** — everything is generated in your browser, nothing is sent to a server
- **Export** to PNG and vector SVG, or copy straight to the clipboard
- **Customizable** error correction level

## Installation

1. Clone the repository and navigate to the root: `cd qr-generator/`
2. Install all dependencies: `pnpm install`

## Run

- Development mode: `pnpm dev`
- Production mode: `pnpm build && pnpm start`
- Lint: `pnpm lint`

## Configuration

| Description       | Values                           |
| ----------------- | -------------------------------- |
| **Port:**         | 3000                             |
| **Technologies:** | Next.js, React, Tailwind CSS     |
| **URL:**          | http://localhost:3000            |
| **Health check:** | http://localhost:3000/api/health |

## License

> This software is developed by **Petr Kašpar** and is licensed under the MIT License.  
> For more details, please refer to the [LICENSE](./LICENSE) file.
