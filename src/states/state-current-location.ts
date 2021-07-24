import { atom } from 'recoil'

import { Location } from '../interfaces/Location'

export const stateCurrentLocation = atom<Location>( {
  key: 'state-current-location',
  default: { lat: 36.8, lng: 138.1 },
} )
