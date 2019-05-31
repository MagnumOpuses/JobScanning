import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { SearchForm } from './index';
import theme from '../styles/theme';
import breakpoints from '../styles/breakpoints';
import jt_logo_black from '../images/logo/jt_logoblack.png';
import TermAndLocation from './TermAndLocation';

const PageHeader = () => {
  const [showForm, setShowForm] = useState(null);
  const refContainer = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleClick);
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
      <div className="wrapper">
        <StyledLink to="/">
          <Logo alt="JobTech" src={jt_logo_black} />
          <H1>JobScanner</H1>
        </StyledLink>

        <TermAndLocation hide={showForm ? true : false} />

        <ToggleSearch
          icon="search"
          basic
          onClick={() => {
            setShowForm(!showForm);
          }}
        />
      </div>

      <FormContainer ref={refContainer} className={showForm ? 'show' : 'hide'}>
        <SearchForm isDesktop upward={false} setShowForm={setShowForm} />
      </FormContainer>
    </Header>
  );
};

export default PageHeader;

const Header = styled.header`
  background: #fff;
  border-bottom: 5px solid ${theme.green4};

  @media (min-width: ${breakpoints.tablet}) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (min-width: ${breakpoints.tabletLandscape}) {
      position: absolute;
    }
  }
`;

const ToggleSearch = styled(Button)`
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
  padding: 10px;
  z-index: 2000;

  @media screen and (max-width: ${breakpoints.tablet}) {
    padding: 5px;
  }
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
  overflow: visible;
  height: auto;
  transition: max-height 0.5s, opacity 0.2s;

  &.show {
    @media (max-width: ${breakpoints.tablet}) {
      max-height: 500px;
      opacity: 1;
    }
  }

  &.hide {
    @media (max-width: ${breakpoints.tablet}) {
      overflow: hidden;
      max-height: 0;
      opacity: 0;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    /* padding: 20px 0; */
  }
`;
