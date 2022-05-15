import { Shop } from "../interfaces";
import { shops } from "./datafiles/yakiniku.json";

/**
 * jsonファイルから取得したデータ
 *
 */
const yakinikuShopsData: Shop[] = shops.map((shop) => {
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

export { yakinikuShopsData };
