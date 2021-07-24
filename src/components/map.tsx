// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import React, { useState } from 'react'

import {
  Map as MapContainer, TileLayer,
} from 'react-leaflet'
import L from 'leaflet'

import { useRecoilState, useSetRecoilState } from 'recoil'

import Button from '@material-ui/core/Button'
import SettingsIcon from '@material-ui/icons/Settings'

import Control from 'react-leaflet-control'
import MarkerClusterGroup from 'react-leaflet-markercluster'

import {
  stateSidePanel, stateMap,
} from '../states'

import { MapProps } from '../interfaces'
import MarkerComponent from './mapComponents/marker'

import { GeolocationButton } from './mapComponents/GeolocationButton'

import 'react-sliding-side-panel/lib/index.css'

const ramenMarkerIcon = L.icon( {
  iconUrl: '/static/marker-icons/marker_red.png',
  iconSize: [22, 40],
  className: 'ramen-marker-icon',
} )

const udonMarkerIcon = L.icon( {
  iconUrl: '/static/marker-icons/marker_blue.png',
  iconSize: [22, 40],
  className: 'udon-marker-icon',
} )

const Map = (
  { items }: MapProps,
): JSX.Element => {
  const [mapState, setMapState] = useRecoilState( stateMap )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dispStatus] = useState( { ramen: true, udon: true } )

  // is sidepanel open
  const setIsSidePanelOpen = useSetRecoilState( stateSidePanel )

  const openSidePanel = ( ) => {
    setIsSidePanelOpen( true )
  }

  const windowHeight = `${window.innerHeight}px`

  return (
    <div style={{ height: '100%', width: '100%' }}>

      <MapContainer
        center={[mapState.lat, mapState.lng]}
        zoom={mapState.zoom}
        scrollWheelZoom
        style={{ minHeight: '80vh', height: windowHeight, width: '100%' }}
        ondragend={( event ) => {
          const z = event.target.getZoom()
          const c = event.target.getCenter()
          setMapState( { lat: c.lat, lng: c.lng, zoom: z } )
        }}
        onzoomend={( event ) => {
          const z = event.target.getZoom()
          const c = event.target.getCenter()
          setMapState( { lat: c.lat, lng: c.lng, zoom: z } )
        }}
      >

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>

          {/* ramen */}
          { dispStatus.ramen && items.ramen.map( ( item ) => (

            <MarkerComponent item={item} category="ラーメン百名店" icon={ramenMarkerIcon} key={`ramen-${item.id}`} />

          ) ) }

          {/* udon */}
          { dispStatus.udon && items.udon.map( ( item ) => (

            <MarkerComponent item={item} category="うどん百名店" icon={udonMarkerIcon} key={`udon-${item.id}`} />

          ) ) }
        </MarkerClusterGroup>

        <Control position="bottomright">
          <GeolocationButton />
        </Control>

        <Control position="topright">
          <Button variant="contained" color="default">
            <SettingsIcon fontSize="large" onClick={openSidePanel} />
          </Button>
        </Control>

      </MapContainer>

    </div>
  )
}

export default Map
