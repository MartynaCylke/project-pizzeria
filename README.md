# Project Pizzeria

A browser-based pizzeria application with product configuration, a shopping
cart, table booking, and a local JSON API.

## Requirements

- Node.js 20.19 or newer
- npm

## Installation

```bash
npm ci
```

## Development

```bash
npm run watch
```

The website is served from `dist/`, while JSON Server exposes the development
API on port `3131`.

## Verification

```bash
npm test
npm run build
```

The test command validates HTML, JavaScript, and SCSS without modifying source
files. Formatting fixes should be made explicitly and reviewed before commit.
