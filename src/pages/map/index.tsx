import { GetStaticProps } from 'next'

import Layout from '../../components/Layout'
import {
  MapIndexProps, Shop,
} from '../../interfaces'
import {
  ramenShopsData,
} from '../../utils/ramen-shop-data'
import { udonShopsData } from '../../utils/udon-shop-data'
import MapIndex from '../../components/mapIndex'

const WithStaticProps = ( { items }: MapIndexProps ): JSX.Element => {
  return (

    <Layout title="Hyakumeiten Map">
      <MapIndex items={items} />
    </Layout>
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
