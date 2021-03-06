import React from "react";

import {
  red,
  blue,
  amber,
  green,
  grey,
  orange,
  pink,
} from "@material-ui/core/colors";

import { withStyles } from "@material-ui/core/styles";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { markerDispActions, markerDispSelectors } from "../../states";

const RamenSwitch = withStyles({
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

const UdonSwitch = withStyles({
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

const CurrySwitch = withStyles({
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

const YakinikuSwitch = withStyles({
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

const JapaneseSwitch = withStyles({
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

const ChineseSwitch = withStyles({
  switchBase: {
    color: orange[300],
    "&$checked": {
      color: orange[700],
    },
    "&$checked + $track": {
      backgroundColor: orange[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

const ItalianSwitch = withStyles({
  switchBase: {
    color: pink[300],
    "&$checked": {
      color: pink[700],
    },
    "&$checked + $track": {
      backgroundColor: pink[500],
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
      <FormLabel component="legend">??????????????????</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <RamenSwitch
              checked={markerDispState.ramen}
              onChange={handleChange}
              name="ramen"
            />
          }
          label="????????????"
          labelPlacement="start"
        />
        <FormControlLabel
          control={
            <UdonSwitch
              checked={markerDispState.udon}
              onChange={handleChange}
              name="udon"
            />
          }
          label="?????????"
          labelPlacement="start"
        />
        <FormControlLabel
          control={
            <CurrySwitch
              checked={markerDispState.curry}
              onChange={handleChange}
              name="curry"
            />
          }
          label="?????????"
          labelPlacement="start"
        />
        <FormControlLabel
          control={
            <YakinikuSwitch
              checked={markerDispState.yakiniku}
              onChange={handleChange}
              name="yakiniku"
            />
          }
          label="??????"
          labelPlacement="start"
        />
        <FormControlLabel
          control={
            <JapaneseSwitch
              checked={markerDispState.japanese}
              onChange={handleChange}
              name="japanese"
            />
          }
          label="????????????"
          labelPlacement="start"
        />
        <FormControlLabel
          control={
            <ChineseSwitch
              checked={markerDispState.chinese}
              onChange={handleChange}
              name="chinese"
            />
          }
          label="????????????"
          labelPlacement="start"
        />
        <FormControlLabel
          control={
            <ItalianSwitch
              checked={markerDispState.italian}
              onChange={handleChange}
              name="italian"
            />
          }
          label="???????????????"
          labelPlacement="start"
        />
      </FormGroup>
    </FormControl>
  );
};

export default MarkerDispToggleButtons;
