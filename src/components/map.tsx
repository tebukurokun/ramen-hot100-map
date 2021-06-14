// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from 'react'
import {
  Map as MapContainer, TileLayer,
} from 'react-leaflet'
import L from 'leaflet'
import Button from '@material-ui/core/Button'
import MyLocationIcon from '@material-ui/icons/MyLocation'
import Control from 'react-leaflet-control'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import {
  makeStyles, createStyles,
} from '@material-ui/core/styles'

import { MapProps } from '../interfaces'
import MarkerComponent from './mapComponents/marker'

const useStyles = makeStyles( ( ) => createStyles( {
  loadingLocationButton: {
    animation: '$blinkAnime 0.4s infinite alternate',
  },
  '@keyframes blinkAnime': {
    '0%': { color: '#E0E0E0' },
    '100%': { color: '#1a1aff' },
  },
} ) )

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
  const classes = useStyles()

  const [mapState, setMapState] = useState( { lat: 36.8, lng: 138.1, zoom: 6 } )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dispStatus, setDispStatus] = useState( { ramen: true, udon: true } )

  // getCurrentLocation loading flag
  const [isLocationLoading, setIsLocationLoading] = useState( false )

  useEffect( () => {
    console.debug( JSON.stringify( mapState ) )
  } )

  /**
   * 現在地を取得しmapの中心を移動
   */
  const getCurrentLocation = () => {
    setIsLocationLoading( true )
    /**
     * option
     */
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
    /**
     * 現在地取得成功時
     */
    const success = ( position ) => {
      const { latitude, longitude } = position.coords
      // move map centre
      setMapState( { lat: latitude, lng: longitude, zoom: 14 } )

      setIsLocationLoading( false )
    }
    /**
     * 現在地取得失敗時
     */
    const error = ( err ) => {
      console.warn( `ERROR(${err.code}): ${err.message}` )
      setIsLocationLoading( false )
    }

    navigator.geolocation.getCurrentPosition(
      success, error, options,
    )
  }

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

            <MarkerComponent item={item} category="ラーメン百名店" icon={ramenMarkerIcon} key={`ramen-${item.id}`} />

          ) ) }

          {/* udon */}
          { dispStatus.udon && items.udon.map( ( item ) => (

            <MarkerComponent item={item} category="うどん百名店" icon={udonMarkerIcon} key={`udon-${item.id}`} />

          ) ) }
        </MarkerClusterGroup>
        <Control position="bottomright">
          <Button variant="contained" color="default" onClick={getCurrentLocation} disabled={isLocationLoading}>
            <MyLocationIcon fontSize="large" color="primary" className={isLocationLoading ? classes.loadingLocationButton : ' '} />
          </Button>
        </Control>
      </MapContainer>
    </div>
  )
}

export default Map
