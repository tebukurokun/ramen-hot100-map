import { GetStaticProps } from 'next'
import Head from 'next/head'

import {
  MapIndexProps, Shop,
} from '../../interfaces'
import {
  ramenShopsData,
} from '../../utils/ramen-shop-data'
import { udonShopsData } from '../../utils/udon-shop-data'
import MapIndex from '../../components/MapIndex'

const WithStaticProps = ( { items }: MapIndexProps ): JSX.Element => {
  return (
    <div>
      <Head>
        <title>Hyakumeiten Map</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="ラーメン百名店の情報をマップで見ることができるサイトです。" />
        <meta property="og:description" content="ラーメン百名店の情報をマップで見ることができるサイトです。" />
      </Head>
      <MapIndex items={items} />
    </div>

  )
}

export default WithStaticProps

export const getStaticProps: GetStaticProps = async () => {
  const ramenItems: Shop[] = ramenShopsData
  const udonItems: Shop[] = udonShopsData

  return {
    props: {
      items: {
        ramen: ramenItems,
        udon: udonItems,
      },
    },
  }
}
