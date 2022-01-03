import { atom, useSetRecoilState } from 'recoil'
import { useCallback } from 'react'
import { RecoilAtomKeys } from './RecoilKeys'

interface MapSetting {
  lat: number
  lng: number
  zoom: number
}

export const mapSettingState = atom<MapSetting>( {
  key: RecoilAtomKeys.MAP_STATE,
  default: { lat: 36.8, lng: 138.1, zoom: 6 },
} )

type MapSettingActions = {
  useUpdateMapSetting: () => ( mapSetting: MapSetting ) => void
}

export const mapSettingActions: MapSettingActions = {
  useUpdateMapSetting: () => {
    const setState = useSetRecoilState( mapSettingState )

    return useCallback(
      ( mapSetting: MapSetting ) => setState( ( ) => mapSetting ),
      [],
    )
  },
}
