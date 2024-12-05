import { useCallback } from 'react'
import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil'
import { RecoilAtomKeys,  RecoilSelectorKeys } from './RecoilKeys'

const stateIsSidePanelOpen = atom<boolean>( {
  key: RecoilAtomKeys.SIDE_PANEL_STATE,
  default: false,
} )

// actions定義
type IsSidePanelOpenActions = {
  useUpdateIsSidePanelOpen: () => ( isSidePanelOpen: boolean ) => void
}

export const isSidePanelOpenActions: IsSidePanelOpenActions = {
  useUpdateIsSidePanelOpen: () => {
    const setState = useSetRecoilState( stateIsSidePanelOpen )

    return useCallback(
      ( isSidePanelOpen: boolean ) => setState( ( ) => isSidePanelOpen ),
      [],
    )
  }
}

// selector定義
type IsSidePanelOpenSelectors = {
  useIsSidePanelOpen: () => boolean
}

const isSidePanelOpenSelector = selector<boolean>(
  {
    key: RecoilSelectorKeys.SIDE_PANEL,
    get: ({get}) => get(stateIsSidePanelOpen)
  }
)

export const isSidePanelOpenSelectors: IsSidePanelOpenSelectors={
  useIsSidePanelOpen: () => useRecoilValue(isSidePanelOpenSelector)
}
