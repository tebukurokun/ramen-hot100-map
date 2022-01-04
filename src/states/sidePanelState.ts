import { atom } from 'recoil'

export const stateSidePanel = atom<boolean>( {
  key: 'state-side-panel',
  default: false,
} )
