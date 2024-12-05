import { useCallback } from 'react'
import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil'
import { RecoilAtomKeys, RecoilSelectorKeys } from './RecoilKeys'

const stateGeolocationLoading = atom<boolean>( {
  key: RecoilAtomKeys.GEOLOCATION_LOADING_STATE,
  default: false,
} )

// actions定義
type GeolocationLoadingActions = {
  useUpdateGeolocationLoading: () => ( loading: boolean ) => void
}

export const geolocationLoadingActions: GeolocationLoadingActions = {
  useUpdateGeolocationLoading: () => {
    const setState = useSetRecoilState( stateGeolocationLoading )

    return useCallback(
      ( loading: boolean ) => setState( ( ) => loading ),
      [],
    )
  }
}

// selector定義
type GeolocationLoadingSelectors = {
  useGeolocationLoading: () => boolean
}

const geolocationLoadingSelector = selector<boolean>(
  {
    key: RecoilSelectorKeys.GEOLOCATION_LOADING,
    get: ({get}) => get(stateGeolocationLoading)
  }
    )

  export const geolocationLoadingSelectors: GeolocationLoadingSelectors={
    useGeolocationLoading: () => useRecoilValue(geolocationLoadingSelector)
  }
