import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import theme from '../../../../styles/theme'
import { Ellipse } from '../../../../components'
import jt_logowhite from '../../../../images/logo/1x/jt_logowhite.png'
import SearchForm from '../../../../containers/SearchForm'

class PageHeaderAds extends Component {
  render() {
    return (
      <Header>
        <Ellipse
          height="195px"
          width="165px"
          bottom="5px"
          left="-50px"
          bgcolor={theme.secondary}
          boxshadow
          zIndex="1"
        />

        <Ellipse
          height="110px"
          width="85px"
          bottom="35px"
          left="71px"
          bgcolor={theme.brightSecondary}
        />

        <Link to="/">
          <Logo alt="JobTech" src={jt_logowhite} />
        </Link>

        <Children>
          <SearchForm desktop={true} upward={false} />
        </Children>
      </Header>
    )
  }
}

export default PageHeaderAds

const Header = styled.header`
  height: 100%;
  width: 100%;
  background: ${theme.primary};
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
`

const Logo = styled.img`
  width: 50px;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000;
`

const Children = styled.div`
  display: flex;
  justify-content: center;
  z-index: 1000;
`
