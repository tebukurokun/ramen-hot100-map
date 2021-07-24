import { atom } from 'recoil'

export const stateGeolocationLoading = atom<boolean>( {
  key: 'state-geolocation-loading',
  default: false,
} )
