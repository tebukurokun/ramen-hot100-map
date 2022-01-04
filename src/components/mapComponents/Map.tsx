// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import React from 'react'

import {
  Map as MapContainer, TileLayer,
} from 'react-leaflet'

import { useRecoilValue } from 'recoil'

import Button from '@material-ui/core/Button'
import SettingsIcon from '@material-ui/icons/Settings'

import Control from 'react-leaflet-control'
import MarkerClusterGroup from 'react-leaflet-markercluster'

import { LeafletEvent } from 'leaflet'
import {
  stateMarkerDisp,mapSettingActions, mapSettingSelectors, isSidePanelOpenSelectors, isSidePanelOpenActions
} from '../../states'

import { MapProps } from '../../interfaces'
import MarkerComponent from './Marker'

import { GeolocationButton } from './GeolocationButton'

import { ramenMarkerIcon, udonMarkerIcon, curryMarkerIcon } from './MarkerIcon'

const Map = (
  { items }: MapProps,
): JSX.Element => {
  const mapSetting = mapSettingSelectors.useMapSetting()
  const setMapSetting = mapSettingActions.useUpdateMapSetting()
  /**
   * marker category to display
   */
  const markerDispState = useRecoilValue( stateMarkerDisp )

  // is sidepanel open
  const isSidePanelOpen = isSidePanelOpenSelectors.useIsSidePanelOpen()
  const setIsSidePanelOpen = isSidePanelOpenActions.useUpdateIsSidePanelOpen()

  const openSidePanel = ( ) => {
    console.debug( 'open SidePanel' )

    setIsSidePanelOpen( true )
  }

  /**
   *
   * @param event {LeafletEvent}
   */
  const onChange = ( event: LeafletEvent ) => {
    const z = event.target.getZoom()
    const c = event.target.getCenter()
    setMapSetting( { lat: c.lat, lng: c.lng, zoom: z } )
    console.debug( {
      northEast: event.target.getBounds().getNorthEast(),
      southWest: event.target.getBounds().getSouthWest(),
    } )
  }

  const windowHeight = `${window.innerHeight}px`

  return (
    <div style={{ height: '100%', width: '100%' }}>

      <MapContainer
        center={[mapSetting.lat, mapSetting.lng]}
        zoom={mapSetting.zoom}
        scrollWheelZoom
        style={{ minHeight: '80vh', height: windowHeight, width: '100%' }}
        onload={() => { console.debug( 'load' ) }}
        ondragend={( event ) => onChange( event )}
        onzoomend={( event ) => onChange( event )}
      >

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>

          {/* ramen */}
          { markerDispState.ramen && items.ramen.map( ( item ) => (

            <MarkerComponent item={item} category="ラーメン百名店" icon={ramenMarkerIcon} key={`ramen-${item.id}`} />

          ) ) }

          {/* udon */}
          { markerDispState.udon && items.udon.map( ( item ) => (

            <MarkerComponent item={item} category="うどん百名店" icon={udonMarkerIcon} key={`udon-${item.id}`} />

          ) ) }
          {/* curry */}
          { markerDispState.curry && items.curry.map( ( item ) => (

            <MarkerComponent item={item} category="カレー百名店" icon={curryMarkerIcon} key={`curry-${item.id}`} />

          ) ) }
        </MarkerClusterGroup>

        <Control position="bottomright">
          <GeolocationButton />
        </Control>

        <Control position="topright">
          <Button variant="contained" color="default" onClick={openSidePanel} disabled={isSidePanelOpen}>
            <SettingsIcon fontSize="large" />
          </Button>
        </Control>

      </MapContainer>

    </div>
  )
}

export default Map
