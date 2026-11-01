# Ramen Hot 100 Map

[![Check](https://github.com/tebukurokun/ramen-hot100-map/actions/workflows/check.yml/badge.svg?branch=develop)](https://github.com/tebukurokun/ramen-hot100-map/actions/workflows/check.yml)

view [ramen hyakumeiten](https://award.tabelog.com/hyakumeiten/ramen_tokyo) on map

[ラーメン百名店](https://award.tabelog.com/hyakumeiten/ramen_tokyo)を地図上で見るためのアプリです。

Deploying to the cloud with [Vercel](https://vercel.com/) ([Documentation](https://nextjs.org/docs/deployment)).

## Usage

``` bash
# install
npm i

# run
npm run dev

# build
npm run build

# lint
npm run lint
```

## Notes

### OpenPOI API（2026-10 検討・見送り）

[OpenPOI API](https://docs.openpoiapi.com/)（Overture Maps + Japan Food Facilities 由来の国内 POI 検索 API、認証不要）の利用を検討したが、現時点では導入しない。

- 座標補正: 全店舗のうち tabelog ピン以外の座標は 5 件のみ。OpenPOI で照合したところ 3 件は既存座標と約 30m 以内で差がなく、1 件はヒットせず、1 件は住所が異なる別候補（約 200m ずれ）しか返らなかった
- 営業時間・評価・写真・閉店フラグ・データ鮮度は返らないため、閉店検知や情報の拡充には使えない
- 使う場合は出典表示が必要（CDLA-Permissive-2.0 / Apache-2.0 NOTICE / CC BY 4.0 など。[attribution](https://openpoiapi.com/attribution.html) 参照）

将来の候補: 外部データ生成処理で tabelog ピンが取れなかった店舗のフォールバックジオコーディング（`center`+`radius` での名寄せ）、店舗周辺の施設検索。

## References

- [食べログ 百名店](https://award.tabelog.com/hyakumeiten/)
- [Leaflet](https://leafletjs.com/)
- [React Leaflet](https://react-leaflet.js.org/)
- [material-ui](https://material-ui.com/)
- [next.js](https://nextjs.org/)
- https://www.mappity.org/
