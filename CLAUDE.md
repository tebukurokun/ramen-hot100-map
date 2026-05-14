# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm i          # install dependencies
npm run dev    # start dev server
npm run build  # production build
npm run lint   # run Biome linter/formatter check
npm run type-check  # TypeScript type checking
```

There are no tests in this project.

## Architecture

This is a Next.js (Pages Router) app that displays Tabelog Hyakumeiten (食べログ百名店) restaurants on an interactive map.

**Data flow:** Shop data lives as static JSON files in `data/` (ramen.json, udon.json, curry.json). `pages/index.tsx` reads these at build time via `getStaticProps` and injects the `ShopCategory` enum value into each shop before passing them to the Map component.

**Map rendering:** `components/Map.tsx` is loaded with `next/dynamic` and `ssr: false` because Leaflet requires a browser environment. The component waits for client-side hydration (`isClient` state) before rendering. It uses `react-leaflet` + `react-leaflet-markercluster` for clustering markers, with category-specific PNG icons served from `public/static/marker-icons/`.

**State management:** Jotai atoms in `atoms/` handle two pieces of shared state:
- `mapCenterAtom` — current map center coordinates (default: Tokyo Station)
- `markerVisibilityAtom` — which categories (ramen/udon/curry) are shown (default: ramen only)
- `currentLocationAtom` — user's geolocation

`GeolocationButton` writes to `mapCenterAtom` and `currentLocationAtom`; `SettingDialog` reads/writes `markerVisibilityAtom`; `Map.tsx` reads both atoms.

**Key types** (all in `interfaces/index.ts`):
- `Shop` — has `lat`/`lng` as strings, `category` as `ShopCategory` enum
- `MarkerVisibility` — `{ ramen: boolean, udon: boolean, curry: boolean }`

## Tooling

- **Biome** for linting and formatting (2-space indent, double quotes for JS/TS). Run `npm run lint` before committing.
- **Tailwind CSS** + **MUI (Material UI)** for styling — MUI is used for UI components (Dialog, Switch, Button, icons), Tailwind for layout utilities.
- Deployed to Vercel. `NEXT_PUBLIC_APP_VERSION` is auto-injected from `package.json` via `next.config.js`.

## Adding a new shop category

1. Add a JSON file to `data/` with a `shops` array matching the `Shop` shape (lat/lng as strings).
2. Add the new category to the `ShopCategory` enum in `interfaces/index.ts`.
3. Update `MarkerVisibility` type (it's derived from the enum keys, so this is automatic).
4. Load the data in `pages/index.tsx` `getStaticProps` and pass as a prop.
5. Add the marker icon PNG to `public/static/marker-icons/`.
6. Add the rendering logic in `components/Map.tsx` and a toggle switch in `components/SettingDialog.tsx`.
