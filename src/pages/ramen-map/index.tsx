import { GetStaticProps } from 'next'

import Layout from '../../components/Layout'
import {
  MapIndexProps, Shop,
} from '../../interfaces'
import { ramenShopsDataToyko, ramenShopsDataEast, ramenShopsDataWest } from '../../utils/ramen-shop-data'
import MapIndex from '../../components/mapIndex'

const WithStaticProps = ( { title, referenceUrl, items }: MapIndexProps ): JSX.Element => {
  return (

    <Layout title="Ramen Map">
      <MapIndex title={title} referenceUrl={referenceUrl} items={items} />
    </Layout>
  )
}

export default WithStaticProps

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const tokyoItems: Shop[] = ramenShopsDataToyko
  const eastItems: Shop[] = ramenShopsDataEast
  const westItems: Shop[] = ramenShopsDataWest

  return {
    props: {
      title: 'ラーメン百名店マップ',
      referenceUrl: 'https://award.tabelog.com/hyakumeiten/ramen_tokyo/2020/',
      items: {
        tokyo: tokyoItems,
        east: eastItems,
        west: westItems,
      },
    },
  }
}
