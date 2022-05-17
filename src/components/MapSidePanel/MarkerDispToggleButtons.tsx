import React from "react";

import { red, blue, amber, green, grey } from "@material-ui/core/colors";

import { withStyles } from "@material-ui/core/styles";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { markerDispActions, markerDispSelectors } from "../../states";

const RedSwitch = withStyles({
  switchBase: {
    color: red[300],
    "&$checked": {
      color: red[700],
    },
    "&$checked + $track": {
      backgroundColor: red[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

const BlueSwitch = withStyles({
  switchBase: {
    color: blue[300],
    "&$checked": {
      color: blue[700],
    },
    "&$checked + $track": {
      backgroundColor: blue[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

const TurmericSwitch = withStyles({
  switchBase: {
    color: amber[300],
    "&$checked": {
      color: amber[700],
    },
    "&$checked + $track": {
      backgroundColor: amber[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

const GreenSwitch = withStyles({
  switchBase: {
    color: green[300],
    "&$checked": {
      color: green[700],
    },
    "&$checked + $track": {
      backgroundColor: green[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

const GreySwitch = withStyles({
  switchBase: {
    color: grey[300],
    "&$checked": {
      color: grey[700],
    },
    "&$checked + $track": {
      backgroundColor: grey[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

const MarkerDispToggleButtons: React.VFC = () => {
  const markerDispState = markerDispSelectors.useMarkerDisp();
  const setMarkerDispState = markerDispActions.useUpdateMarkerDisp();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMarkerDispState({
      ...markerDispState,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">表示対象設定</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <RedSwitch
              checked={markerDispState.ramen}
              onChange={handleChange}
              name="ramen"
            />
          }
          label="ラーメン"
          labelPlacement="start"
        />
        <FormControlLabel
          control={
            <BlueSwitch
              checked={markerDispState.udon}
              onChange={handleChange}
              name="udon"
            />
          }
          label="うどん"
          labelPlacement="start"
        />
        <FormControlLabel
          control={
            <TurmericSwitch
              checked={markerDispState.curry}
              onChange={handleChange}
              name="curry"
            />
          }
          label="カレー"
          labelPlacement="start"
        />
        <FormControlLabel
          control={
            <GreenSwitch
              checked={markerDispState.yakiniku}
              onChange={handleChange}
              name="yakiniku"
            />
          }
          label="焼肉"
          labelPlacement="start"
        />
      </FormGroup>
      <FormControlLabel
        control={
          <GreySwitch
            checked={markerDispState.japanese}
            onChange={handleChange}
            name="japanese"
          />
        }
        label="日本料理"
        labelPlacement="start"
      />
    </FormControl>
  );
};

export default MarkerDispToggleButtons;
