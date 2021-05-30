import dynamic from 'next/dynamic'
import React, {
  useState, ComponentType, useMemo, useEffect,
} from 'react'
import {
  makeStyles, createStyles,
} from '@material-ui/core/styles'
import { colors } from '@material-ui/core'
import ReactLoading from 'react-loading'

import {
  AreaDisplayFlg, MapIndexProps, MapProps,
} from '../interfaces'
import ToggleButtonsMultiple from './mapComponents/ToggleButtonsMultiple'

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
    height: '80vh',
    maxWidth: '1500px',
  },
  toggleButtonArea: {
    marginBottom: '5px',
  },
} ) )

const MapIndex = ( {
  title, referenceUrl, items,
} : MapIndexProps ): JSX.Element => {
  const [areaDisplayFlg, setAreaDisplayFlg] = useState<AreaDisplayFlg>(
    { dispTokyo: true, dispEast: true, dispWest: true },
  )

  useEffect(
    () => {
      console.debug( JSON.stringify( areaDisplayFlg ) )
    },
  )

  const handleDisplayArea = ( areaList: Array<string> ) => {
    setAreaDisplayFlg( { dispTokyo: areaList.includes( 'tokyo' ), dispEast: areaList.includes( 'east' ), dispWest: areaList.includes( 'west' ) } )
  }

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
    <div>
      <div className={classes.descriptionArea}>
        <h1>{title}</h1>
        <p>
          出典:
          {' '}
          <a href={`${referenceUrl}`} className={classes.linkForDarkMode}>食べログ様サイト</a>
        </p>
      </div>

      <div className={classes.toggleButtonArea}>
        <ToggleButtonsMultiple handleDisplayArea={handleDisplayArea} />
      </div>

      <div className={classes.mapArea} onContextMenu={() => false}>
        <Map items={items} areaDisplayFlg={areaDisplayFlg} />
      </div>
    </div>

  )
}

export default MapIndex
