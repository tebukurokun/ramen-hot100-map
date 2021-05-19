import Link from 'next/link'
import Layout from '../components/Layout'

const AboutPage = () => (
  <Layout title="About">
    <h1>About</h1>
    <p>
      <a href="https://award.tabelog.com/hyakumeiten/ramen_tokyo/2020/">ラーメン百名店</a>
      の情報を検索するサイトです
    </p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)

export default AboutPage
