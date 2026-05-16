# AGENTS.md

## Commands
- `npm run develop` — start webpack dev server
- `npm run build` — production build, outputs to `docs/` (GitHub Pages)
- `npm run test` — run Jest tests

No lint, typecheck, or formatter scripts exist.

## Architecture
- **Entry point**: `src/index.ts` — wires UI to chord logic, runs on `window.onload`
- **Core logic**: `src/chords.ts` — note/chord types, fingering generation, tuning presets
- **SVG rendering**: `src/svg.ts` — draws fretboard diagrams
- **UI helpers**: `src/text-ui.ts`
- **Template**: `src/chords.html` — used by HtmlWebpackPlugin

## Build output
Webpack bundles to `docs/bundle.js`. The `docs/` directory is published to GitHub Pages.

## Testing
- Single test file: `test/test.ts`
- Jest with `@babel/preset-typescript` (no separate ts-jest)
- Run single test: `npm run test -- -t "test name"`

## Toolchain quirks
- tsconfig is minimal: `noImplicitAny`, target ES5, module ES2015
- No strict mode, no lib declarations
- Notes are represented as integers (C=0 .. B=11)
- Tuning arrays are stored reversed (low string first)
