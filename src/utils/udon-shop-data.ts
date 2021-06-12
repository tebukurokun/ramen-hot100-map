import { Shop } from '../interfaces'
import * as tokyoUdonData from './udon-tokyo.json'
import * as eastUdonData from './udon-east.json'
import * as westUdonData from './udon-west.json'

/**
 * jsonファイルから取得したtokyoデータ
 *
 * example: {id: '1', name: 'Alice', url: 'https://tabelog.com/tokyo/A1314/A131402/13006051/', address: '東京都港区三田2-16-4', lng: 139.74152, lat: 35.64804,}
 *
 */
const udonShopsDataToyko: Shop[] = tokyoUdonData.shops.map(
  ( shop ) => {
    return {
      id: `tokyo-${shop.id}`,
      name: shop.name,
      area: 'tokyo',
      url: shop.url,
      code: shop.code,
      // imgPath: `/static/images/udon/${shop.code}.jpg`,
      imgPath: '',
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
const udonShopsDataEast: Shop[] = eastUdonData.shops.map(
  ( shop ) => {
    return {
      id: `east-${shop.id}`,
      name: shop.name,
      area: 'east',
      url: shop.url,
      code: shop.code,
      // imgPath: `/static/images/udon/${shop.code}.jpg`,
      imgPath: '',
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
const udonShopsDataWest: Shop[] = westUdonData.shops.map(
  ( shop ) => {
    return {
      id: `west-${shop.id}`,
      name: shop.name,
      area: 'west',
      url: shop.url,
      code: shop.code,
      // imgPath: `/static/images/udon/${shop.code}.jpg`,
      imgPath: '',
      address: shop.address,
      lng: parseFloat( shop.fX ),
      lat: parseFloat( shop.fY ),
    }
  },
)

const udonShopsData: Shop[] = udonShopsDataToyko
  .concat( udonShopsDataEast )
  .concat( udonShopsDataWest )

export {
  udonShopsDataToyko, udonShopsDataEast, udonShopsDataWest, udonShopsData,
}
