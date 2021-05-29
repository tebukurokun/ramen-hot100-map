import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage = ():JSX.Element => (
  <Layout title="Home">
    <h1>Hello 👋</h1>
    <p>
      <Link href="/about">
        About
      </Link>
    </p>
  </Layout>
)

export default IndexPage
