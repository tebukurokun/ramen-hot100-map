import React, { useEffect } from 'react'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

interface Props {
    handleDisplayArea: ( areaList: Array<string> ) => void
}

const ToggleButtonsMultiple: React.VFC<Props> = ( { handleDisplayArea } ) => {
  const [areas, setAreas] = React.useState( () => ['tokyo', 'east', 'west'] )

  useEffect(
    () => {
      handleDisplayArea( areas )
    },
    [areas],
  )

  const handleAreas = ( event: React.MouseEvent<HTMLElement>, newFormats: string[] ) => {
    setAreas( newFormats )
  }

  return (
    <ToggleButtonGroup value={areas} onChange={handleAreas} aria-label="area to display">
      <ToggleButton value="tokyo" aria-label="tokyo" style={{ backgroundColor: '#F75850', width: '75px' }}>
        {/* <FormatBoldIcon /> */}
        tokyo
      </ToggleButton>
      <ToggleButton value="east" aria-label="east" style={{ backgroundColor: '#0093F6', width: '75px' }}>
        {/* <FormatItalicIcon /> */}
        east
      </ToggleButton>
      <ToggleButton value="west" aria-label="west" style={{ backgroundColor: '#61B844', width: '75px' }}>
        {/* <FormatUnderlinedIcon /> */}
        west
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default ToggleButtonsMultiple
