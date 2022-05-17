import { Shop, ShopData } from "../interfaces";
import { shops as yakinikuShops } from "./datafiles/yakiniku.json";
import { shops as curryShops } from "./datafiles/curry.json";
import { shops as japaneseShops } from "./datafiles/japanese.json";
import { shops as ramenShops } from "./datafiles/ramen.json";
import { shops as udonShops } from "./datafiles/udon.json";

type ShopsJson = typeof ramenShops;

const jsonToEntity = (json: ShopsJson): Shop[] => {
  return json.map((shop) => {
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
};

/**
 * jsonファイルから取得したデータ
 *
 */
const curryShopsData: Shop[] = jsonToEntity(curryShops);

const yakinikuShopsData: Shop[] = jsonToEntity(yakinikuShops);

const ramenShopsData: Shop[] = jsonToEntity(ramenShops);

const udonShopsData: Shop[] = jsonToEntity(udonShops);

const japaneseShopsData: Shop[] = jsonToEntity(japaneseShops);

const shopData: ShopData[] = [
  { category: "udon", categoryJp: "うどん百名店", shops: udonShopsData },
  { category: "curry", categoryJp: "カレー百名店", shops: curryShopsData },
  { category: "ramen", categoryJp: "ラーメン百名店", shops: ramenShopsData },
  { category: "yakiniku", categoryJp: "焼肉百名店", shops: yakinikuShopsData },
  { category: "japanese", categoryJp: "和食百名店", shops: japaneseShopsData },
];

export { shopData };
