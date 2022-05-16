import { Shop, ShopData } from "../interfaces";
import { shops as yakinikuShops } from "./datafiles/yakiniku.json";
import { shops as curryShops } from "./datafiles/curry.json";
import { shops as ramenShops } from "./datafiles/ramen.json";
import { shops as udonShops } from "./datafiles/udon.json";

/**
 * jsonファイルから取得したデータ
 *
 */
const curryShopsData: Shop[] = curryShops.map((shop) => {
  return {
    id: shop.id,
    name: shop.name,
    url: shop.url,
    code: shop.code,
    // imgPath: `/static/images/ramen/${shop.code}.jpg`,
    imgPath: "",
    address: shop.address,
    lng: parseFloat(shop.lng),
    lat: parseFloat(shop.lat),
  };
});

const yakinikuShopsData: Shop[] = yakinikuShops.map((shop) => {
  return {
    id: shop.id,
    name: shop.name,
    area: "west",
    url: shop.url,
    code: shop.code,
    // imgPath: `/static/images/yakiniku/${shop.code}.jpg`,
    imgPath: "",
    address: shop.address,
    lng: parseFloat(shop.lng),
    lat: parseFloat(shop.lat),
  };
});

const ramenShopsData: Shop[] = ramenShops.map((shop) => {
  return {
    id: shop.id,
    name: shop.name,
    url: shop.url,
    code: shop.code,
    // imgPath: `/static/images/ramen/${shop.code}.jpg`,
    imgPath: "",
    address: shop.address,
    lng: parseFloat(shop.lng),
    lat: parseFloat(shop.lat),
  };
});

const udonShopsData: Shop[] = udonShops.map((shop) => {
  return {
    id: shop.id,
    name: shop.name,
    area: "west",
    url: shop.url,
    code: shop.code,
    // imgPath: `/static/images/udon/${shop.code}.jpg`,
    imgPath: "",
    address: shop.address,
    lng: parseFloat(shop.lng),
    lat: parseFloat(shop.lat),
  };
});

const shopData: ShopData[] = [
  { category: "udon", categoryJp: "うどん百名店", shops: udonShopsData },
  { category: "curry", categoryJp: "カレー百名店", shops: curryShopsData },
  { category: "ramen", categoryJp: "ラーメン百名店", shops: ramenShopsData },
  { category: "yakiniku", categoryJp: "焼肉百名店", shops: yakinikuShopsData },
];

export { shopData };
