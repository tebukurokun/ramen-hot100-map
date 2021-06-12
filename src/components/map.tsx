// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from 'react'
import {
  Map as MapContainer, TileLayer,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import MarkerClusterGroup from 'react-leaflet-markercluster'
import { MapProps } from '../interfaces'
import MarkerComponent from './mapComponents/marker'

const ramenMarkerIcon = L.icon( {
  iconUrl: '/static/marker-icons/marker_red.png',
  iconSize: [22, 40],
} )

const udonMarkerIcon = L.icon( {
  iconUrl: '/static/marker-icons/marker_blue.png',
  iconSize: [22, 40],
} )

const Map = (
  { items }: MapProps,
): JSX.Element => {
  const [mapState, setMapState] = useState( { lat: 36.8, lng: 138.1, zoom: 6 } )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dispStatus, setDispStatus] = useState( { ramen: true, udon: true } )

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

          {/* ramen */}
          { dispStatus.ramen && items.ramen.map( ( item ) => (

            <MarkerComponent item={item} icon={ramenMarkerIcon} key={item.id} />

          ) ) }

          {/* udon */}
          { dispStatus.udon && items.udon.map( ( item ) => (

            <MarkerComponent item={item} icon={udonMarkerIcon} key={item.id} />

          ) ) }
        </MarkerClusterGroup>

      </MapContainer>
    </div>
  )
}

export default Map
