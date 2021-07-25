import { atom } from 'recoil'

import { MarkerDispState } from '../interfaces/MarkerDispState'

export const stateMarkerDisp = atom<MarkerDispState>( {
  key: 'state-marker-disp',
  default: { ramen: true, udon: true },
} )
