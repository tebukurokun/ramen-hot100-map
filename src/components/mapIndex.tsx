import dynamic from 'next/dynamic'
import React, {
  ComponentType, useMemo,
} from 'react'

import {
  makeStyles, createStyles,
} from '@material-ui/core/styles'

import 'react-leaflet-markercluster/dist/styles.min.css'
import 'leaflet/dist/leaflet.css'

import {
  RecoilRoot,
} from 'recoil'

import {
  MapIndexProps, MapProps,
} from '../interfaces'
import SidePanel from './mapComponents/SidePanel'
import MapLoadingPage from './MapLoadingPage'

const useStyles = makeStyles( ( ) => createStyles( {
  descriptionArea: {
    margin: '0 16px',
  },
  mapArea: {
    height: '100%',
    width: '100vw',
  },
} ) )

const MapIndex = ( {
  items,
} : MapIndexProps ): JSX.Element => {
  const classes = useStyles()

  const Map: ComponentType<MapProps> = useMemo(
    () => dynamic( () => import( './map' ), {
      // eslint-disable-next-line react/display-name
      loading: () => (
        <MapLoadingPage />
      ),
      ssr: false,
    } ),
    [],
  )

  return (
    <RecoilRoot>
      <div className={classes.mapArea} onContextMenu={() => false}>
        <Map items={items} />
        <SidePanel />
      </div>
    </RecoilRoot>
  )
}

export default MapIndex
