import { GetStaticProps } from 'next'

import Layout from '../../components/Layout'
import {
  MapIndexProps, Shop,
} from '../../interfaces'
import { udonShopsDataToyko, udonShopsDataEast, udonShopsDataWest } from '../../utils/udon-shop-data'
import MapIndex from '../../components/mapIndex'

const WithStaticProps = ( { title, referenceUrl, items }: MapIndexProps ): JSX.Element => {
  return (

    <Layout title="Udon Map">
      <MapIndex title={title} referenceUrl={referenceUrl} items={items} />
    </Layout>
  )
}

export default WithStaticProps

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const tokyoItems: Shop[] = udonShopsDataToyko
  const eastItems: Shop[] = udonShopsDataEast
  const westItems: Shop[] = udonShopsDataWest

  return {
    props: {
      title: 'うどん百名店マップ',
      referenceUrl: 'https://award.tabelog.com/hyakumeiten/udon_tokyo/2020/',
      items: {
        tokyo: tokyoItems,
        east: eastItems,
        west: westItems,
      },
    },
  }
}
