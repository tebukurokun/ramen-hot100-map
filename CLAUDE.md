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

**Category config (single source of truth):** `interfaces/categories.ts` defines `CATEGORIES`, a record keyed by category that holds label, emoji, switch color, JSON file name, default visibility, default pin state, and section. It also defines `SECTIONS` for grouping in the bottom sheet. The `CategoryKey` type, the `MarkerVisibility`/`PinnedCategories` maps, the data loader, atom initial state, marker rendering, the chip bar, and the bottom sheet are all derived from this object — adding a new category is a 2-step change (see below).

**Data flow:** Shop data lives as static JSON files in `data/` (one file per category, declared in `CATEGORIES[key].dataFile`). `pages/index.tsx` reads them at build time via `getStaticProps`, iterating `CATEGORY_KEYS` and injecting the `CategoryKey` into each shop. The result is a single `shopsByCategory: Record<CategoryKey, Shop[]>` prop passed to the Map component.

**Map rendering:** `components/Map.tsx` is loaded with `next/dynamic` and `ssr: false` because Leaflet requires a browser environment. The component waits for client-side hydration (`isClient` state) before rendering. It uses `react-leaflet` + `react-leaflet-markercluster` for clustering markers, and renders an emoji-based `L.divIcon` per shop using `CATEGORIES[key].emoji`.

**State management:** Jotai atoms in `atoms/` handle four pieces of shared state:
- `mapCenterAtom` — current map center coordinates (default: Tokyo Station)
- `markerVisibilityAtom` — `Record<CategoryKey, boolean>`, initial values derived from each category's `defaultVisible`
- `pinnedCategoriesAtom` — `Record<CategoryKey, boolean>`, persisted to localStorage via `atomWithStorage`; initial values from `defaultPinned`
- `currentLocationAtom` — user's geolocation

`GeolocationButton` writes to `mapCenterAtom` and `currentLocationAtom`; `CategoryChipBar` reads/writes `markerVisibilityAtom` and reads `pinnedCategoriesAtom`; `CategorySheet` reads/writes both `markerVisibilityAtom` and `pinnedCategoriesAtom`; `Map.tsx` reads `mapCenterAtom` and `markerVisibilityAtom`.

**Category selection UI:** A horizontally-scrolling chip bar (`components/CategoryChipBar.tsx`) sits at the bottom of the map and shows pinned categories plus any category currently ON. Tapping a chip toggles visibility. Its trailing "すべて" chip opens `components/CategorySheet.tsx`, a swipeable bottom sheet that lists every category grouped by `SECTIONS`, with search, per-row visibility toggle, and a star to pin/unpin.

**Key types** (in `interfaces/index.ts`, re-exported from `interfaces/categories.ts`):
- `Shop` — `lat`/`lng` as strings, `category` as `CategoryKey`
- `CategoryKey` — derived from `keyof typeof CATEGORIES`
- `SectionKey` — derived from `keyof typeof SECTIONS`
- `MarkerVisibility` / `PinnedCategories` — `Record<CategoryKey, boolean>`

## Tooling

- **Biome** for linting and formatting (2-space indent, double quotes for JS/TS). Run `npm run lint` before committing.
- **Tailwind CSS** + **MUI (Material UI)** for styling — MUI is used for UI components (Drawer, Chip, Switch, TextField, Button, icons), Tailwind for layout utilities.
- Deployed to Vercel. `NEXT_PUBLIC_APP_VERSION` is auto-injected from `package.json` via `next.config.js`.

## Adding a new shop category

Only two changes are needed — everything else (types, atom state, marker rendering, chip bar, bottom sheet) is derived from the config.

1. Add a JSON file to `data/` with a `shops` array matching the `Shop` shape (lat/lng as strings, `id` prefixed with the category key — e.g. `"tonkatsu-0"` — to match the existing convention). Do not include a `category` field; it is injected at build time.
2. Add a new entry to `CATEGORIES` in `interfaces/categories.ts` with all `CategoryConfig` fields: `label`, `shortLabel`, `emoji`, `switchColor`, `dataFile`, `defaultVisible`, `defaultPinned`, `section` (one of the keys in `SECTIONS`; add a new section entry there if none fits).
