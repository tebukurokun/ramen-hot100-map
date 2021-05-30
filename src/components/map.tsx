// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from 'react'
import {
  Map as MapContainer, TileLayer,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import MarkerClusterGroup from 'react-leaflet-markercluster'
import { RamenMapProps } from '../interfaces'
import MarkerComponent from './mapComponents/marker'

const tokyoMarkerIcon = L.icon( {
  iconUrl: '/static/marker-icons/marker_red.png',
  iconSize: [22, 40],
} )

const eastMarkerIcon = L.icon( {
  iconUrl: '/static/marker-icons/marker_blue.png',
  iconSize: [22, 40],
} )

const westMarkerIcon = L.icon( {
  iconUrl: '/static/marker-icons/marker_green.png',
  iconSize: [22, 40],
} )

const Map = (
  { items, areaDisplayFlg: { dispTokyo, dispEast, dispWest } }: RamenMapProps,
): JSX.Element => {
  const [mapState, setMapState] = useState( { lat: 35.677204, lng: 139.747853, zoom: 11 } )

  useEffect( () => {
    console.debug( JSON.stringify( mapState ) )
  } )

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={[mapState.lat, mapState.lng]}
        zoom={mapState.zoom}
        scrollWheelZoom
        style={{ height: '100%', width: '100%' }}
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

          {/* tokyo */}
          { dispTokyo && items.tokyo.map( ( item ) => (

            <MarkerComponent item={item} icon={tokyoMarkerIcon} key={item.id} />

          ) ) }

          {/* east */}
          { dispEast && items.east.map( ( item ) => (

            <MarkerComponent item={item} icon={eastMarkerIcon} key={item.id} />

          ) ) }

          {/* west */}
          { dispWest && items.west.map( ( item ) => (

            <MarkerComponent item={item} icon={westMarkerIcon} key={item.id} />

          ) ) }
        </MarkerClusterGroup>

      </MapContainer>
    </div>
  )
}

export default Map
