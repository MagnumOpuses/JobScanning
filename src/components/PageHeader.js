import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import theme from '../styles/theme'
import { Ellipse } from './index'
import jt_logowhite from '../images/logo/1x/jt_logowhite.png'

const PageHeader = ({ children }) => (
  <Header>
    <Ellipse
      height="195px"
      width="165px"
      bottom="5px"
      left="-50px"
      bgcolor={theme.green4}
      boxshadow
      zIndex="-1"
    />

    <Ellipse
      height="110px"
      width="85px"
      bottom="35px"
      left="71px"
      bgcolor={theme.green0}
      zIndex="-2"
    />
    <Link to="/">
      <Logo alt="JobTech" src={jt_logowhite} />
    </Link>

    <Children>{children}</Children>
  </Header>
)

export default PageHeader

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100%;
  width: 100%;
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
  z-index: 1000;
`
