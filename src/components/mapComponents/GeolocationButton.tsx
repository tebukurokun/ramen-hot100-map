import React from "react";

import Button from "@material-ui/core/Button";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  mapSettingActions,
  geolocationLoadingActions,
  geolocationLoadingSelectors,
} from "../../states";

const useStyles = makeStyles(() =>
  createStyles({
    loadingLocationButton: {
      animation: "$blinkAnime 0.4s infinite alternate",
    },
    "@keyframes blinkAnime": {
      "0%": { color: "#E0E0E0" },
      "100%": { color: "#1a1aff" },
    },
  })
);

export const GeolocationButton = (): JSX.Element => {
  const classes = useStyles();

  const geolocationLoading =
    geolocationLoadingSelectors.useGeolocationLoading();
  const setGeolocationLoading =
    geolocationLoadingActions.useUpdateGeolocationLoading();
  const setMapSetting = mapSettingActions.useUpdateMapSetting();

  /**
   * 現在地を取得.
   */
  const getCurrentLocation = () => {
    setGeolocationLoading(true);

    /**
     * option
     */
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    /**
     * 現在地取得成功時
     */
    const success = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;

      setMapSetting({ lat: latitude, lng: longitude, zoom: 14 });

      setGeolocationLoading(false);

      console.debug(position);
    };

    /**
     * 現在地取得失敗時
     */
    const error = (err: GeolocationPositionError) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      setGeolocationLoading(false);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return (
    <Button
      variant="contained"
      color="default"
      onClick={getCurrentLocation}
      disabled={geolocationLoading}
    >
      <MyLocationIcon
        fontSize="large"
        color="primary"
        className={geolocationLoading ? classes.loadingLocationButton : " "}
      />
    </Button>
  );
};
