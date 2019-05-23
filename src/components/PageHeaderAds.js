import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import theme from '../styles/theme';
import jt_logoblack from '../images/logo/1x/jt_logoblack.png';
import { SearchForm } from './index';
import breakpoints from '../styles/breakpoints';

const PageHeaderAds = () => {
  const [showForm, setShowForm] = useState(null);
  const refContainer = useRef(null);

  useEffect(() => {
    // add when mounted
    document.addEventListener('click', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleClick = e => {
    if (refContainer.current.contains(e.target)) {
      return;
    }

    setShowForm(false);
  };
  return (
    <Header ref={refContainer}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <StyledLink to="/">
          <Logo alt="JobTech" src={jt_logoblack} />
          <H1>JobScanner</H1>
        </StyledLink>

        <SearchIcon
          icon="search"
          basic
          onClick={() => {
            setShowForm(!showForm);
          }}
        />
      </div>

      <FormContainer ref={refContainer}>
        <SearchForm isDesktop upward={false} togglable showForm={showForm} />
      </FormContainer>
    </Header>
  );
};

export default PageHeaderAds;

const Header = styled.header`
  background: #fff;
  border-bottom: 5px solid ${theme.green4};
  @media (min-width: ${breakpoints.tablet}) {
    display: flex;
    flex-direction: row;
  }
`;

const SearchIcon = styled(Button)`
  &&& {
    font-size: 24px !important;

    @media (min-width: ${breakpoints.tablet}) {
      display: none;
    }
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

const FormContainer = styled.div`
  flex: 1;
`;
