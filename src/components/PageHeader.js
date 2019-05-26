import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { SearchForm } from './index';
import theme from '../styles/theme';
import breakpoints from '../styles/breakpoints';
import jt_logoblack from '../images/logo/1x/jt_logoblack.png';

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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <StyledLink to="/">
          <Logo alt="JobTech" src={jt_logoblack} />
          <H1>JobScanner</H1>
        </StyledLink>

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
