---
name: verify
description: このリポジトリの地図アプリをheadlessブラウザで起動して変更をランタイム検証する手順
---

# Verify: hyakumeiten-map

Next.js + Leaflet の地図アプリ。テストは無いので、ランタイム検証は headless Chromium で実画面を driving する。

## 起動

```bash
npm run dev          # localhost:3000（バックグラウンドで起動、curlで200を確認）
```

## ブラウザ自動化

Playwright はプロジェクトに入っていないが、`~/Library/Caches/ms-playwright/` にブラウザキャッシュがある（例: `chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`）。
scratchpad に `npm i playwright-core` して `chromium.launch({ executablePath })` で起動するとダウンロード不要で動く。

## 検証のポイント

- **位置情報**: `browser.newContext({ permissions: ["geolocation"], geolocation: {...} })` でモック。permissions を空にすると PERMISSION_DENIED が発火する。`ctx.setGeolocation()` で移動もシミュレートできる。ページロード時に自動で現在地取得が走る。
- **現在地ボタン**: `button[aria-label="現在位置に移動する"]`
- **マーカー**: `.leaflet-marker-icon`（クラスタは class に `cluster` を含む）。ポップアップは `.leaflet-popup-content`。
- **現在地マーカー**: 専用ペイン `.leaflet-current-location-pane`（zIndex 650）内の SVG path ×2（精度円＋青点）。
- 地図タイルは OpenStreetMap 本番を叩くので `waitUntil: "networkidle"` + 数秒待ちが安定。
- ズームは `.leaflet-control-zoom-in` をクリック。
