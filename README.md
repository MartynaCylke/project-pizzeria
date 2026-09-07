# Project Pizzeria

[![CI](https://github.com/MartynaCylke/project-pizzeria/actions/workflows/ci.yml/badge.svg)](https://github.com/MartynaCylke/project-pizzeria/actions/workflows/ci.yml)

Interactive restaurant application built with vanilla JavaScript and Sass. It
lets visitors configure dishes, manage a cart and book a table.

**[Open the live demo](https://martynacylke.github.io/project-pizzeria/)**

## Features

- configurable pizzas and salads with live price calculation;
- shopping cart with quantity controls and order summary;
- date, time and table selection for reservations;
- responsive interface compiled from modular Sass;
- static demo mode on GitHub Pages and a JSON Server API for local development.

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

The GitHub Pages build automatically uses the read-only data bundled in
`src/db/app.json`. Orders and reservations remain interactive in the browser,
but are not persisted in the public demo.

## Verification

```bash
npm test
npm run build
```

The test command validates HTML, JavaScript, and SCSS without modifying source
files. Formatting fixes should be made explicitly and reviewed before commit.

## Tech stack

JavaScript modules, Sass, Handlebars, JSON Server, ESLint, Stylelint and GitHub
Actions.
