import React, { useEffect } from 'react'

import styled from 'styled-components'
import MarkerDispToggleButtons from './MarkerDispToggleButtons'

const PanelContentArea = styled.div`
  padding-left: 1rem;
`

const SidePanelContent = (): JSX.Element => {
  return (
    <PanelContentArea>
      <h1>設定</h1>
      <MarkerDispToggleButtons />
      <p>機能追加予定</p>

    </PanelContentArea>
  )
}

export default SidePanelContent
