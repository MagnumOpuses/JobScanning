import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import theme from './styles/theme'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import AdDetails from './pages/AdDetails'
import AdsPage from './pages/JobsPage/AdsPage'
import breakpoints from './styles/breakpoints'
import background from './images/bg.png'

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
    font-family: 'Open Sans', sans-serif;
    font-size: 1.6rem !important;
    height: 100vh;

    @media only screen and (min-width: ${breakpoints.tablet}) {
    background: url(${background});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    }
  }

  h1,
  h2,
  h3 {
    font-family: 'Open Sans', sans-serif;
  }

  h1 {
    font-weight: bold;
    font-size: 2em;

    @media screen and (min-width: ${breakpoints.tablet}) {
    font-size: 2.5em;
    }
  }

  h2 {
    font-weight: bold;
    font-size: 1.4rem;
  }

  h3 {
    font-size: 1.4rem;
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
