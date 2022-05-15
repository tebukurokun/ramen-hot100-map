import { Shop } from "../interfaces";
import { shops } from "./datafiles/udon.json";

/**
 * jsonファイルから取得したeastデータ
 *
 */
const udonShopsData: Shop[] = shops.map((shop) => {
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

export { udonShopsData };
