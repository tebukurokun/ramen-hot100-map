import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ExploreIcon from '@material-ui/icons/Explore'
import LinkIcon from '@material-ui/icons/Link'
import Layout from '../components/Layout'

function ListItemLink( props: ListItemProps<'a', { button?: true }> ) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ListItem button component="a" {...props} />
}

const IndexPage = ():JSX.Element => (
  <Layout title="Home">
    <h1>
      <ListItemIcon>
        <ExploreIcon />
      </ListItemIcon>
      百名店マップ
    </h1>
    <p>
      百名店に選ばれている店舗をマップで探せるサイトです。
    </p>
    <List>
      <ListItemLink href="/map">
        <ListItemIcon>
          <LinkIcon />
        </ListItemIcon>
        <ListItemText primary="百名店マップを見る" />
      </ListItemLink>
    </List>

  </Layout>
)

export default IndexPage
