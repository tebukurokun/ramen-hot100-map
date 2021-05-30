import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import { StylesProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../components/theme'

const CustomApp = ( { Component, pageProps }: AppProps ): JSX.Element => {
  useEffect( () => {
    const jssStyles: Element | null = document.querySelector( '#jss-server-side' )
    if ( jssStyles ) {
      jssStyles.parentElement?.removeChild( jssStyles )
    }
  }, [] )

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </StylesProvider>
  )
}

export default CustomApp
