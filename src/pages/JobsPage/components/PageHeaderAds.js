import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import theme from '../../../styles/theme'
import jt_logoblack from '../../../images/logo/1x/jt_logoblack.png'
import { SearchForm } from '../../../components'

class PageHeaderAds extends Component {
  render() {
    return (
      <Header>
        <StyledLink to="/">
          <Logo alt="JobTech" src={jt_logoblack} />
          <H1>JobScanner</H1>
        </StyledLink>
        <div style={{ flex: '1' }}>
          <SearchForm isDesktop upward={false} />
        </div>
      </Header>
    )
  }
}

export default PageHeaderAds

const Header = styled.header`
  width: 100%;
  display: flex;
  background: #fff;
  border-bottom: 5px solid ${theme.green4};
`

const StyledLink = styled(Link)`
  position: absolute;
  display: flex;
  align-items: baseline;
  height: 50px;
  margin: 0.5rem;
  z-index: 2000;
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
