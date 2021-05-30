import { RamenShop } from '../interfaces'
import * as tokyoData from './ramen-shops-tokyo.json'
import * as eastData from './ramen-shops-east.json'
import * as westData from './ramen-shops-west.json'

/**
 * jsonファイルから取得したtokyoデータ
 *
 * example: {id: '1', name: 'Alice', url: 'https://tabelog.com/tokyo/A1314/A131402/13006051/', address: '東京都港区三田2-16-4', lng: 139.74152, lat: 35.64804,}
 *
 */
const ramenShopsDataToyko: RamenShop[] = tokyoData.shops.map(
  ( shop ) => {
    return {
      id: shop.id,
      name: shop.name,
      url: shop.url,
      code: shop.code,
      address: shop.address,
      lng: parseFloat( shop.fX ),
      lat: parseFloat( shop.fY ),
    }
  },
)

/**
 * jsonファイルから取得したeastデータ
 *
 * example: {id: '1', name: 'Alice', url: 'https://tabelog.com/tokyo/A1314/A131402/13006051/', address: '東京都港区三田2-16-4', lng: 139.74152, lat: 35.64804,}
 *
 */
const ramenShopsDataEast: RamenShop[] = eastData.shops.map(
  ( shop ) => {
    return {
      id: shop.id,
      name: shop.name,
      url: shop.url,
      code: shop.code,
      address: shop.address,
      lng: parseFloat( shop.fX ),
      lat: parseFloat( shop.fY ),
    }
  },
)

/**
 * jsonファイルから取得したeastデータ
 *
 * example: {id: '1', name: 'Alice', url: 'https://tabelog.com/tokyo/A1314/A131402/13006051/', address: '東京都港区三田2-16-4', lng: 139.74152, lat: 35.64804,}
 *
 */
const ramenShopsDataWest: RamenShop[] = westData.shops.map(
  ( shop ) => {
    return {
      id: shop.id,
      name: shop.name,
      url: shop.url,
      code: shop.code,
      address: shop.address,
      lng: parseFloat( shop.fX ),
      lat: parseFloat( shop.fY ),
    }
  },
)

export { ramenShopsDataToyko, ramenShopsDataEast, ramenShopsDataWest }
