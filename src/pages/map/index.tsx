import dynamic from 'next/dynamic'
import React, {
  useState, ComponentType, useMemo, useEffect,
} from 'react'
import { GetStaticProps } from 'next'
import {
  makeStyles, createStyles,
} from '@material-ui/core/styles'
import { colors } from '@material-ui/core'
import ReactLoading from 'react-loading'
import Layout from '../../components/Layout'
import { AreaDisplayFlg, RamenMapProps, RamenShop } from '../../interfaces'
import { ramenShopsDataToyko, ramenShopsDataEast, ramenShopsDataWest } from '../../utils/ramen-shop-data'
import ToggleButtonsMultiple from '../../components/mapComponents/ToggleButtonsMultiple'

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

const WithStaticProps = ( { items }: RamenMapProps ): JSX.Element => {
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

  const Map: ComponentType<RamenMapProps> = useMemo(
    () => dynamic( () => import( '../../components/map' ), {
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

    <Layout title="Ramen Map">

      <div className={classes.descriptionArea}>
        <h1>ラーメン百名店マップ</h1>
        <p>
          出典:
          {' '}
          <a href="https://award.tabelog.com/hyakumeiten/ramen_tokyo/2020/" className={classes.linkForDarkMode}>食べログ様サイト</a>
        </p>
      </div>

      <div className={classes.toggleButtonArea}>
        <ToggleButtonsMultiple handleDisplayArea={handleDisplayArea} />
      </div>

      <div className={classes.mapArea} onContextMenu={() => false}>
        <Map items={items} areaDisplayFlg={areaDisplayFlg} />
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const tokyoItems: RamenShop[] = ramenShopsDataToyko
  const eastItems: RamenShop[] = ramenShopsDataEast
  const westItems: RamenShop[] = ramenShopsDataWest

  return {
    props: {
      items: {
        tokyo: tokyoItems,
        east: eastItems,
        west: westItems,
      },
    },
  }
}

export default WithStaticProps
