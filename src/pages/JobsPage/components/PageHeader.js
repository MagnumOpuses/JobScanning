import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import theme from '../../../styles/theme'
import { Icon } from 'semantic-ui-react'
import { Ellipse } from '../../../components'
import jt_logowhite from '../../../images/logo/1x/jt_logowhite.png'

class PageHeader extends Component {
  render() {
    return (
      <Header
        ads={this.props.ads}
        style={
          !this.props.ads
            ? {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end'
              }
            : {}
        }
      >
        <Ellipse
          height="195px"
          width="165px"
          bottom="5px"
          left="-50px"
          bgcolor={theme.green4}
          boxshadow
          zIndex="1"
        />

        <Ellipse
          height="110px"
          width="85px"
          bottom="35px"
          left="71px"
          bgcolor={theme.green0}
        />
        <Link to="/">
          <Logo alt="JobTech" src={jt_logowhite} />
        </Link>

        <Children
          style={
            this.props.ads && {
              height: '3rem',
              display: 'flex',
              position: 'absolute',
              right: '1.5rem',
              bottom: '1.5rem'
            }
          }
        >
          {this.props.ads ? (
            <>
              <SearchTerm>
                {this.props.searchTerm
                  ? `#${this.props.searchTerm}`
                  : 'Inga sökord'}
              </SearchTerm>
              <CustomLink to="/search">
                <CustomIcon name="search" size="large" />
              </CustomLink>
            </>
          ) : (
            this.props.children
          )}
        </Children>
      </Header>
    )
  }
}

function mapStateToProps({ ads }) {
  const { searchTerm } = ads
  return {
    searchTerm
  }
}

export default connect(
  mapStateToProps,
  null
)(PageHeader)

const Header = styled.header`
  height: 100%;
  width: 100%;
  box-shadow: ${({ ads }) =>
    ads ? '0 0.3rem 0.5rem rgba(0, 0, 0, 0.3)' : 'none'};
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

const CustomLink = styled(Link)`
  height: 100%;

  &:link,
  &:visited,
  &:hover,
  &:active {
    color: ${theme.black};
  }
`

const SearchTerm = styled.div`
  padding: 0.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: ${theme.green1};
  border-radius: 1.5rem;
  box-shadow: 0 2px 3px 0px rgba(0, 0, 0, 0.4);
`

const CustomIcon = styled(Icon)`
  &&& {
    color: #fff;
    padding: 1.5rem 2.3rem;
    margin-left: 2rem;
    background: ${theme.green4};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1.5rem;
    box-shadow: 0 2px 3px 0px rgba(0, 0, 0, 0.4);
  }
`
