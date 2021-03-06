import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import Home from './pages/Home';
import Search from './pages/Search';
import Jobs from './pages/Jobs';
import Overview from './pages/Overview';
import breakpoint from './styles/breakpoints';
import backgroundImg from './images/Pixel.jpg';

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

  html, body, h1, h2, h3, h4, h5, h6, p {
    font-family: 'Open Sans', sans-serif !important;
  }

  body {
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700,800');
    font-family: 'Open Sans', sans-serif !important;
    font-size: 1.6rem !important;
    height: 100vh;
    background: #fff url(${backgroundImg}) center/cover no-repeat fixed;
    
    @media screen and (max-width: ${breakpoint.tablet}) {
      background: #fff;
    }
  }

  h1 {
    font-size: ${theme.fonts.h1.fontSizeDesktop};
    font-weight: ${theme.fonts.h1.fontWeightDesktop};

    @media screen and (max-width: ${breakpoint.tablet}) {
      font-size: ${theme.fonts.h1.fontSizeTabletLarge};
    }

    @media screen and (max-width: ${breakpoint.mobileLandscape}) {
      font-size: ${theme.fonts.h1.fontSizeMobile};
    }
  }

  h2 {
    font-size: ${theme.fonts.h2.fontSizeDesktop};
    font-weight: ${theme.fonts.h2.fontWeightDesktop};
    margin: ${theme.fonts.h2.margin} !important;

    @media screen and (max-width: ${breakpoint.tablet}) {
      font-size: ${theme.fonts.h2.fontSizeTabletLarge};
    }

    @media screen and (max-width: ${breakpoint.mobileLandscape}) {
      font-size: ${theme.fonts.h2.fontSizeMobile};
    }
  }

  h3 {
    font-size: ${theme.fonts.h3.fontSizeDesktop};
    font-weight: ${theme.fonts.h3.fontWeightDesktop};

    @media screen and (max-width: ${breakpoint.tablet}) {
      font-size: ${theme.fonts.h3.fontSizeTabletLarge};
    }

    @media screen and (max-width: ${breakpoint.mobileLandscape}) {
      font-size: ${theme.fonts.h3.fontSizeMobile};
    }
  }

  p {
    font-size: ${props => props.theme.fonts.bodyCopy.fontSizeDesktop}
  }

  .isDesktop {
      padding: 0 !important;
      background: none !important;
      box-shadow: none !important;
    }

  .bold {
    font-weight: bold;
  }

  .card-box-shadow {
    padding: 15px;
    background: #fff;
    box-shadow: 0 10px 20px rgba(0,0,0,.15), 0 3px 6px rgba(0,0,0,0.10);
    border-radius: 10px;
  }

  .box-shadow {
    box-shadow: 0 10px 20px rgba(0,0,0,.15), 0 3px 6px rgba(0,0,0,0.10);
  }
`;

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={{ ...theme, breakpoint }}>
        <AppContainer>
          <GlobalStyle />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/jobs/:occupation/:location/:id" component={Jobs} />
            <Route path="/jobs/:occupation/:location/" component={Jobs} />
            <Route path="/jobs/:occupation" component={Jobs} />
            <Route path="/search" component={Search} />
            <Route path="/overview/:occupation" component={Overview} />
            <Route component={Home} />
          </Switch>
        </AppContainer>
      </ThemeProvider>
    );
  }
}

export default App;

const AppContainer = styled.div`
  height: 100vh;
  position: relative;
`;
