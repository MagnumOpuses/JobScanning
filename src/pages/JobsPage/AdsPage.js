import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import styled from 'styled-components'
import Responsive from 'react-responsive'
import breakpoint from '../../styles/breakpoints'
import theme from '../../styles/theme'
import numberOfUniqueSources from '../../utils/numberOfUniqueSources'
import {
  AdsList,
  SourceRanking,
  GridContainer,
  PageHeader,
  JobMap,
  ResultStats
} from '../../components'
import JobsPageDesktop from './components/desktop/JobsPageDesktop'

class AdsPage extends Component {
  state = { activeComponent: 'list' }

  changeComponent = componentName => {
    this.setState({ activeComponent: componentName })
  }

  getNumberOfSources = () => {
    let { ads } = this.props

    const number = numberOfUniqueSources(ads.hits)

    return number
  }

  render() {
    const { activeComponent } = this.state

    return (
      <React.Fragment>
        <Responsive maxWidth={breakpoint.tablet}>
          <GridContainer rows={'185px calc(100vh - 185px)'}>
            <Header>
              <PageHeader ads />

              <ResultStats />

              <CustomMenu borderless fluid widths={3}>
                <CustomMenuItem
                  name="list"
                  active={activeComponent === 'list'}
                  content="Lista"
                  onClick={() => this.setState({ activeComponent: 'list' })}
                />

                <CustomMenuItem
                  name="map"
                  active={activeComponent === 'map'}
                  content="Karta"
                  onClick={() => this.setState({ activeComponent: 'map' })}
                />

                <CustomMenuItem
                  name="overview"
                  active={activeComponent === 'overview'}
                  content="Översikt"
                  onClick={() => this.setState({ activeComponent: 'overview' })}
                />
              </CustomMenu>
            </Header>
            <Content>
              <div
                style={{
                  display: activeComponent === 'list' ? 'block' : 'none',
                  height: '100%'
                }}
              >
                <AdsList />
              </div>
              {activeComponent === 'map' && <JobMap />}
              {activeComponent === 'overview' && <SourceRanking />}
            </Content>
          </GridContainer>
        </Responsive>
        <Responsive minWidth={769}>
          <JobsPageDesktop />
        </Responsive>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    ads: state.ads
  }
}

export default connect(
  mapStateToProps,
  null
)(AdsPage)

const CustomMenu = styled(Menu)`
  &&& {
    border: none;
    box-shadow: none;
    margin: 0;

    & > * {
      background: ${theme.green0};
      border-top: 2px solid ${theme.green4};
      border-bottom: 2px solid ${theme.green4};
      border-left: 1px solid ${theme.green4};
      border-right: 1px solid ${theme.green4};
      border-radius: 0;
      box-shadow: none;
    }

    & > :first-child {
      border-left: none;
      border-radius: 0;
    }

    & > :last-child {
      border-right: none;
      border-radius: 0;
    }
  }
`

const CustomMenuItem = styled(Menu.Item)`
  &&& {
    font-size: ${props => props.theme.fontSizeMedium};
    color: ${props => props.theme.grey};
    border-radius: 0;

    &::before {
      background: none;
    }

    &.active {
      background: none;
      border-bottom: none;
    }

    &&&:active,
    &&&:hover {
      background: none;
    }
  }
`

const Header = styled.div`
  grid-row: 1/2;
  display: grid;
  grid-template-rows: 8.5rem 5.5rem 4.5rem;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #fff;
`

const Content = styled.div`
  grid-row: 2/3;
`
