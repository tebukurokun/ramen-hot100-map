import React from 'react'
import SlidingPanel from 'react-sliding-side-panel'
import CloseIcon from '@material-ui/icons/Close'
import {
  makeStyles, createStyles,
} from '@material-ui/core/styles'
import styled from 'styled-components'
import 'react-sliding-side-panel/lib/index.css'
import { Button } from '@material-ui/core'
import { useRecoilState } from 'recoil'
import { stateSidePanel } from '../../states/state-side-panel'
import SidePanelContent from './SidePanelContent'

const PanelContainer = styled.div`
  height: 100%;
  width: 100%;
  background: rgb(240,240,240,0.8);
  flex-direction: column;
`

const StyledButton = styled( Button )`
  border-radius: 0;
  opacity: 0.8;
`

const useStyles = makeStyles( ( ) => createStyles( {
  sidePanel: {
    boxShadow: '-10px 0 20px rgb(0 0 0 / 0.3)',
  },
} ) )

const SidePanel = ( ): JSX.Element => {
  const classes = useStyles()

  const [isOpen, setIsOpen] = useRecoilState( stateSidePanel )

  const onClose = () => {
    setIsOpen( false )
  }

  return (
    <div>
      <SlidingPanel
        type="right"
        isOpen={isOpen}
        size={30}
        backdropClicked={onClose}
        panelContainerClassName={classes.sidePanel}
      >
        <PanelContainer>
          <div className="silepanel-button-area">
            <StyledButton variant="contained" color="secondary" onClick={onClose}>
              <CloseIcon />
            </StyledButton>
          </div>

          <SidePanelContent />

        </PanelContainer>
      </SlidingPanel>
    </div>
  )
}

export default SidePanel
