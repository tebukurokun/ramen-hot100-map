import React from "react";

import { Map as MapContainer, TileLayer } from "react-leaflet";

import Button from "@material-ui/core/Button";
import SettingsIcon from "@material-ui/icons/Settings";

import Control from "react-leaflet-control";
import MarkerClusterGroup from "react-leaflet-markercluster";

import { LeafletEvent } from "leaflet";
import {
  mapSettingActions,
  mapSettingSelectors,
  isSidePanelOpenSelectors,
  isSidePanelOpenActions,
  markerDispSelectors,
} from "../../states";

import { MapProps } from "../../interfaces";
import MarkerComponent from "./MarkerComponent";

import { GeolocationButton } from "./GeolocationButton";

import {
  ramenMarkerIcon,
  udonMarkerIcon,
  curryMarkerIcon,
  yakinikuMarkerIcon,
} from "./MarkerIcon";

const Map = ({ items }: MapProps): JSX.Element => {
  const mapSetting = mapSettingSelectors.useMapSetting();
  const setMapSetting = mapSettingActions.useUpdateMapSetting();
  /**
   * marker category to display
   */
  const markerDispState = markerDispSelectors.useMarkerDisp();

  // is sidepanel open
  const isSidePanelOpen = isSidePanelOpenSelectors.useIsSidePanelOpen();
  const setIsSidePanelOpen = isSidePanelOpenActions.useUpdateIsSidePanelOpen();

  interface StringKeyMarkerIconObject {
    [key: string]: { markerIcon: L.Icon<L.IconOptions>; dispState: boolean };
  }

  const markerCategoryMap: StringKeyMarkerIconObject = {
    ramen: { markerIcon: ramenMarkerIcon, dispState: markerDispState.ramen },
    udon: { markerIcon: udonMarkerIcon, dispState: markerDispState.udon },
    curry: { markerIcon: curryMarkerIcon, dispState: markerDispState.curry },
    yakiniku: {
      markerIcon: yakinikuMarkerIcon,
      dispState: markerDispState.yakiniku,
    },
  };

  const openSidePanel = () => {
    console.debug("open SidePanel");

    setIsSidePanelOpen(true);
  };

  /**
   *
   * @param event {LeafletEvent}
   */
  const onChange = (event: LeafletEvent) => {
    const z = event.target.getZoom();
    const c = event.target.getCenter();
    setMapSetting({ lat: c.lat, lng: c.lng, zoom: z });
    console.debug({
      northEast: event.target.getBounds().getNorthEast(),
      southWest: event.target.getBounds().getSouthWest(),
    });
  };

  const windowHeight = `${window.innerHeight}px`;

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={[mapSetting.lat, mapSetting.lng]}
        zoom={mapSetting.zoom}
        scrollWheelZoom
        style={{ minHeight: "80vh", height: windowHeight, width: "100%" }}
        onload={() => {
          console.debug("load");
        }}
        ondragend={(event) => onChange(event)}
        onzoomend={(event) => onChange(event)}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {items.map(
            (shopdata) =>
              markerCategoryMap[shopdata.category].dispState &&
              shopdata.shops.map((shop) => (
                <MarkerComponent
                  item={shop}
                  category={shopdata.categoryJp}
                  icon={markerCategoryMap[shopdata.category].markerIcon}
                  key={`${shopdata.category}-${shop.id}`}
                />
              ))
          )}
        </MarkerClusterGroup>

        <Control position="bottomright">
          <GeolocationButton />
        </Control>

        <Control position="topright">
          <Button
            variant="contained"
            color="default"
            onClick={openSidePanel}
            disabled={isSidePanelOpen}
          >
            <SettingsIcon fontSize="large" />
          </Button>
        </Control>
      </MapContainer>
    </div>
  );
};

export default Map;
