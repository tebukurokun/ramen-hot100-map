import { atom } from 'recoil'

import { MarkerDispState } from '../interfaces/MarkerDispState'
import { RecoilAtomKeys } from './RecoilKeys'

export const stateMarkerDisp = atom<MarkerDispState>( {
  key: RecoilAtomKeys.MARKER_DISP_STATE,
  default: { ramen: true, udon: true, curry: true },
} )
