import { Shop } from '../interfaces'
import * as curryData from './curry.json'

/**
 * jsonファイルから取得したデータ
 *
 */
const curryShopsData: Shop[] = curryData.shops.map(
  ( shop ) => {
    return {
      id: `tokyo-${shop.id}`,
      name: shop.name,
      url: shop.url,
      code: shop.code,
      // imgPath: `/static/images/ramen/${shop.code}.jpg`,
      imgPath: '',
      address: shop.address,
      lng: parseFloat( shop.lng ),
      lat: parseFloat( shop.lat ),
    }
  },
)

export {
  curryShopsData,
}
