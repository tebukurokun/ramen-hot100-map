import dynamic from 'next/dynamic'
import React, {
  useState, ComponentType, useMemo,
} from 'react'
import {
  makeStyles, createStyles,
} from '@material-ui/core/styles'
import { colors } from '@material-ui/core'
import ReactLoading from 'react-loading'

import {
  AreaDisplayFlg, MapIndexProps, MapProps,
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
    height: 'calc(100vh - 80px)',
    width: '100%',
    maxWidth: '1500px',
  },
  toggleButtonArea: {
    marginBottom: '5px',
  },
} ) )

const MapIndex = ( {
  items,
} : MapIndexProps ): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [areaDisplayFlg] = useState<AreaDisplayFlg>(
    { dispTokyo: true, dispEast: true, dispWest: true },
  )

  // const handleDisplayArea = ( areaList: Array<string> ) => {
  //   setAreaDisplayFlg( {
  //     dispTokyo: areaList.includes( 'tokyo' ),
  //     dispEast: areaList.includes( 'east' ),
  //     dispWest: areaList.includes( 'west' ),
  //   } )
  // }

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

      <div className={classes.mapArea} onContextMenu={() => false}>
        <Map items={items} areaDisplayFlg={areaDisplayFlg} />
      </div>
    </div>

  )
}

export default MapIndex
