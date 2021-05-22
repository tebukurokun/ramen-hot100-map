// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from 'react'
import {
  Map as MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
// import { useRouter } from 'next/router'
import L from 'leaflet'

import { RamenShop } from '../interfaces'

type Props = {
  items: {
    tokyo: RamenShop[],
    east: RamenShop[],
    west: RamenShop[],
  }
}

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

const Map = ( { items }: Props ): JSX.Element => {
  // const router = useRouter()
  // const { lng, lat, zoom } = router.query

  const [mapState, setMapState] = useState( { lat: 35.677204, lng: 139.747853, zoom: 12 } )

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
          // router.push( `?lng=${c.lng}&lat=${c.lat}&zoom=${z}` )
          setMapState( { lat: c.lat, lng: c.lng, zoom: z } )
        }}
        onzoomend={( event ) => {
          const z = event.target.getZoom()
          const c = event.target.getCenter()
          // router.push( `?lng=${c.lng}&lat=${c.lat}&zoom=${z}` )
          setMapState( { lat: c.lat, lng: c.lng, zoom: z } )
        }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* tokyo */}
        { items.tokyo.map( ( item ) => (

          <Marker
            position={[item.lat, item.lng]}
            key={item.id}
            icon={tokyoMarkerIcon}
          >
            <Popup>
              <p>
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.name}
                </a>
              </p>
              <p>
                {item.address}
              </p>

            </Popup>
          </Marker>
        ) ) }

        {/* east */}
        { items.east.map( ( item ) => (

          <Marker
            position={[item.lat, item.lng]}
            key={item.id}
            icon={eastMarkerIcon}
          >
            <Popup>
              <p>
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.name}
                </a>
              </p>
              <p>
                {item.address}
              </p>

            </Popup>
          </Marker>
        ) ) }

        {/* west */}
        { items.west.map( ( item ) => (

          <Marker
            position={[item.lat, item.lng]}
            key={item.id}
            icon={westMarkerIcon}
          >
            <Popup>
              <p>
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.name}
                </a>
              </p>
              <p>
                {item.address}
              </p>

            </Popup>
          </Marker>
        ) ) }

      </MapContainer>
      {/* <button
        type="button"
        onClick={() => {
          router.push( '' )
        }}
      >
        Reset
      </button> */}
    </div>
  )
}

export default Map
