import dynamic from 'next/dynamic'
import React, {
  ComponentType, useMemo,
} from 'react'
import {
  makeStyles, createStyles,
} from '@material-ui/core/styles'
import { colors } from '@material-ui/core'
import ReactLoading from 'react-loading'

import {
  MapIndexProps, MapProps,
} from '../interfaces'

import 'react-leaflet-markercluster/dist/styles.min.css'
import 'leaflet/dist/leaflet.css'

const useStyles = makeStyles( ( ) => createStyles( {
  linkForDarkMode: {
    color: colors.orange[800],
  },
  descriptionArea: {
    margin: '0 16px',
  },
  mapArea: {
    height: '100%',
    width: '100vw',
    maxWidth: '1500px',
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
        <div>
          <ReactLoading type="spokes" color="#fff" />
          <p>A map is loading...</p>
        </div>
      ),
      ssr: false,
    } ),
    [],
  )

  return (
    <div className={classes.mapArea} onContextMenu={() => false}>
      <Map items={items} />
    </div>

  )
}

export default MapIndex
