import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import theme from '../../../../styles/theme'
import jt_logoblack from '../../../../images/logo/1x/jt_logoblack.png'
import SearchForm from '../../../../containers/SearchForm'

class PageHeaderAds extends Component {
  render() {
    return (
      <Header>
        <StyledLink to="/">
          <Logo alt="JobTech" src={jt_logoblack} />
          <H1>JobScanner</H1>
        </StyledLink>
        <div style={{ flex: '1' }}>
          <SearchForm desktop={true} upward={false} />
        </div>
      </Header>
    )
  }
}

export default PageHeaderAds

const Header = styled.header`
  height: 100%;
  width: 100%;
  display: flex;
  z-index: 1;
  border-top: 5px solid ${theme.green4};
`

const StyledLink = styled(Link)`
  display: flex;
  align-items: baseline;
  height: 50px;
  margin: 1rem;
  z-index: 1000;
`

const Logo = styled.img`
  height: 50px;
  z-index: 1000;
`

const H1 = styled.h1`
  display: inline-block;
  font-size: 32px;
  color: ${theme.black};
  z-index: 1000;
`
