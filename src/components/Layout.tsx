import React from 'react'
import Head from 'next/head'
import clsx from 'clsx'
import {
  ThemeProvider, createTheme, makeStyles, useTheme, Theme, createStyles,
} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import ExploreIcon from '@material-ui/icons/Explore'
import InfoIcon from '@material-ui/icons/Info'
import { colors } from '@material-ui/core'

const drawerWidth = 160

const muiTheme = createTheme( {
  palette: {
    primary: {
      main: colors.blue[800],
    },
    type: 'dark',
  },
} )

const useStyles = makeStyles( ( theme: Theme ) => createStyles( {
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create( ['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    } ),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create( ['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    } ),
  },
  menuButton: {
    marginRight: theme.spacing( 2 ),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing( 0, 1 ),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing( 1, 1 ),
    transition: theme.transitions.create( 'margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    } ),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create( 'margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    } ),
    marginLeft: 0,
  },
} ) )

function ListItemLink( props: ListItemProps<'a', { button?: true }> ) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ListItem button component="a" {...props} />
}

export interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ( {
  children,
  title,
} ) => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState( false )

  const handleDrawerOpen = () => {
    setOpen( true )
  }

  const handleDrawerClose = () => {
    setOpen( false )
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <div className={classes.root}>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content="ラーメン百名店の情報をマップで見ることができるサイトです。" />
          <meta property="og:description" content="ラーメン百名店の情報をマップで見ることができるサイトです。" />
        </Head>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx( classes.appBar, {
            [classes.appBarShift]: open,
          } )}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx( classes.menuButton, open && classes.hide )}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Hyakumeiten Map
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItemLink href="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemLink>
            <ListItemLink href="/about">
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItemLink>
          </List>
          <Divider />
          <List>
            <ListItemLink href="/map">
              <ListItemIcon>
                <ExploreIcon />
              </ListItemIcon>
              <ListItemText primary="Map" />
            </ListItemLink>
          </List>
          <Divider />
        </Drawer>
        <main
          className={clsx( classes.content, {
            [classes.contentShift]: open,
          } )}
        >
          <div className={classes.drawerHeader} />
          {children}
        </main>
      </div>
    </ThemeProvider>
  )
}
export default Layout
