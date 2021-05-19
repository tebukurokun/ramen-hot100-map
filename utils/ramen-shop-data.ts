import { RamenShop } from '../interfaces'
import * as data from './ramen-shops.json'

/**
 * jsonファイルから取得したデータ
 *
 * example: {id: '1', name: 'Alice', url: 'https://tabelog.com/tokyo/A1314/A131402/13006051/', address: '東京都港区三田2-16-4', lng: 139.74152, lat: 35.64804,}
 *   //

 */
const ramenShopsData: RamenShop[] = data.shops.map(
  ( shop ) => {
    return {
      id: shop.id,
      name: shop.name,
      url: shop.url,
      address: shop.address,
      lng: parseFloat( shop.fX ),
      lat: parseFloat( shop.fY ),
    }
  },
)

export { ramenShopsData }
