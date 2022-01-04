import React from 'react'

import { red, blue, amber } from '@material-ui/core/colors'

import { withStyles } from '@material-ui/core/styles'

import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { markerDispActions, markerDispSelectors } from '../../states'

const RedSwitch = withStyles( {
  switchBase: {
    color: red[300],
    '&$checked': {
      color: red[700],
    },
    '&$checked + $track': {
      backgroundColor: red[500],
    },
  },
  checked: {},
  track: {},
} )( Switch )

const BlueSwitch = withStyles( {
  switchBase: {
    color: blue[300],
    '&$checked': {
      color: blue[700],
    },
    '&$checked + $track': {
      backgroundColor: blue[500],
    },
  },
  checked: {},
  track: {},
} )( Switch )

const TurmericSwitch = withStyles( {
  switchBase: {
    color: amber[300],
    '&$checked': {
      color: amber[700],
    },
    '&$checked + $track': {
      backgroundColor: amber[500],
    },
  },
  checked: {},
  track: {},
} )( Switch )

const MarkerDispToggleButtons: React.VFC = () => {

  const markerDispState = markerDispSelectors.useMarkerDisp()
  const setMarkerDispState = markerDispActions.useUpdateMarkerDisp()

  const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    setMarkerDispState( { ...markerDispState, [event.target.name]: event.target.checked } )
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">表示対象設定</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<RedSwitch checked={markerDispState.ramen} onChange={handleChange} name="ramen" />}
          label="ラーメン"
          labelPlacement="start"
        />
        <FormControlLabel
          control={<BlueSwitch checked={markerDispState.udon} onChange={handleChange} name="udon" />}
          label="うどん"
          labelPlacement="start"
        />
        <FormControlLabel
          control={<TurmericSwitch checked={markerDispState.curry} onChange={handleChange} name="curry" />}
          label="カレー"
          labelPlacement="start"
        />
      </FormGroup>
    </FormControl>
  )
}

export default MarkerDispToggleButtons
