import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import theme from './styles/theme'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import AdDetails from './pages/AdDetails'
import AdsPage from './pages/JobsPage/AdsPage'
import breakpoints from './styles/breakpoints'

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%; /* 1 rem = 10px; 10px/16px = 62.5% */
  }

  body {
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700,800');
    font-size: 1.6rem !important;
    height: 100vh;
  }

  h1 {
    font-size: 2em;
    font-weight: ${theme.fonts.h1.fontWeightDesktop};

    @media screen and (min-width: ${breakpoints.tablet}) {
      font-size: ${theme.fonts.h1.fontSizeDesktop};
    }
  }

  h2 {
    font-size: ${theme.fonts.h2.fontSizeDesktop} !important;
    font-weight: ${theme.fonts.h2.fontWeightDesktop};
    margin: ${theme.fonts.h2.margin} !important;
  }

  h3 {
    font-size: ${theme.fonts.h3.fontSizeDesktop};
    font-weight: ${theme.fonts.h3.fontWeightDesktop};
  }
`

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppContainer>
          <GlobalStyle />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/jobs/:id" component={AdDetails} />
            <Route path="/jobs" component={AdsPage} />
            <Route path="/search" component={SearchPage} />
          </Switch>
        </AppContainer>
      </ThemeProvider>
    )
  }
}

export default App

const AppContainer = styled.div`
  height: 100vh;
  position: relative;
`
