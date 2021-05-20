import dynamic from 'next/dynamic'
import { ComponentType, useMemo } from 'react'
import { GetStaticProps } from 'next'
import {
  makeStyles, createStyles,
} from '@material-ui/core/styles'
import { colors } from '@material-ui/core'
import Layout from '../../components/Layout'
import { RamenShop } from '../../interfaces'
import { ramenShopsData } from '../../utils/ramen-shop-data'

type Props = {
  items: RamenShop[]
}

const useStyles = makeStyles( ( ) => createStyles( {
  linkForDarkMode: {
    color: colors.orange[800],
  },
  mapArea: {
    height: '70vh',
  },
} ) )

const WithStaticProps = ( { items }: Props ): JSX.Element => {
  const classes = useStyles()

  const Map: ComponentType<Props> = useMemo(
    () => dynamic( () => import( '../../components/map' ), {
      loading: () => <p>A map is loading...</p>,
      ssr: false,
    } ),
    [],
  )
  return (

    <Layout title="Ramen Map">
      <h1>Ramen Map</h1>
      <p>
        ラーメン百名店のマップです。
      </p>
      <p>
        出典:
        {' '}
        <a href="https://award.tabelog.com/hyakumeiten/ramen_tokyo/2020/" className={classes.linkForDarkMode}>食べログ様サイト</a>
      </p>
      <div className={classes.mapArea}>
        <Map items={items} />
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const items: RamenShop[] = ramenShopsData
  return { props: { items } }
}

export default WithStaticProps
