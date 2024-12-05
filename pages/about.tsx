import {
  makeStyles, createStyles,
} from '@material-ui/core/styles'
import { colors } from '@material-ui/core'
import Link from 'next/link'
import Layout from '../components/Layout'

const useStyles = makeStyles( ( ) => createStyles( {
  linkForDarkMode: {
    color: colors.orange[800],
  },
} ) )

const AboutPage = (): JSX.Element => {
  const classes = useStyles()

  return (
    <Layout title="About">
      <h1>About</h1>
      <p>
        <a href="https://award.tabelog.com/hyakumeiten/ramen_tokyo/2020/" className={classes.linkForDarkMode}>ラーメン百名店</a>
        、
        <a href="https://award.tabelog.com/hyakumeiten/udon_tokyo/2020/" className={classes.linkForDarkMode}>うどん百名店</a>
        の店舗情報を検索するサイトです
      </p>
      <p>
        <Link href="/">
          Go home
        </Link>
      </p>
    </Layout>
  )
}

export default AboutPage
