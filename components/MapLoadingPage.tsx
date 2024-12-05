import ReactLoading from 'react-loading'
import {
  makeStyles, createStyles,
} from '@material-ui/core/styles'

const useStyles = makeStyles( ( ) => createStyles( {
  mapLoadingPage: {
    height: '100vh',
    width: '100vw',
  },
} ) )

const MapLoadingPage = () => {
  const classes = useStyles()

  return (
    <div className={classes.mapLoadingPage}>
      <ReactLoading type="spokes" height="20vh" width="20vw" color="#000000" delay={1000} />
      <p>A map is loading...</p>
    </div>
  )
}

export default MapLoadingPage
