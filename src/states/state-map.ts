import { atom } from 'recoil'

import { MapState } from '../interfaces/MapState'

export const stateMap = atom<MapState>( {
  key: 'state-map-state',
  default: { lat: 36.8, lng: 138.1, zoom: 6 },
} )
