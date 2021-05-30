import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ExploreIcon from '@material-ui/icons/Explore'
import LinkIcon from '@material-ui/icons/Link'

import Layout from '../../components/Layout'

function ListItemLink( props: ListItemProps<'a', { button?: true }> ) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ListItem button component="a" {...props} />
}

const mapIndexPage : React.VFC<void> = () => {
  return (
    <Layout title="Ramen Map">

      <h1>
        <ListItemIcon>
          <ExploreIcon />
        </ListItemIcon>
        百名店マップ
      </h1>

      <List>
        <ListItemLink href="/ramen-map">
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <ListItemText primary="ラーメン百名店マップ" />
        </ListItemLink>
      </List>

      <List>
        <ListItemLink href="/udon-map">
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <ListItemText primary="うどん百名店マップ" />
        </ListItemLink>
      </List>

    </Layout>
  )
}

export default mapIndexPage
