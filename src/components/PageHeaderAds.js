import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../styles/theme';
import jt_logoblack from '../images/logo/1x/jt_logoblack.png';
import { SearchForm } from './index';
import breakpoints from '../styles/breakpoints';

class PageHeaderAds extends Component {
  render() {
    return (
      <Header>
        <StyledLink to="/">
          <Logo alt="JobTech" src={jt_logoblack} />
          <H1>JobScanner</H1>
        </StyledLink>

        <SearchForm isDesktop upward={false} togglable />
      </Header>
    );
  }
}

export default PageHeaderAds;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  background: #fff;
  border-bottom: 5px solid ${theme.green4};

  @media (max-width: ${breakpoints.tablet}) {
    flex-wrap: wrap;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: baseline;
  height: 50px;
  margin: 0.5rem;
  z-index: 2000;
`;

const Logo = styled.img`
  height: 50px;
  z-index: 1000;
`;

const H1 = styled.h1`
  display: inline-block;
  font-size: 32px;
  color: ${theme.black};
  z-index: 1000;

  @media (max-width: 1366px) {
    display: none;
  }
`;
