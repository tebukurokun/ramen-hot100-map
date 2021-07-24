import { atom } from 'recoil'

export const stateZoom = atom<number>( {
  key: 'state-zoom',
  default: 6,
} )
