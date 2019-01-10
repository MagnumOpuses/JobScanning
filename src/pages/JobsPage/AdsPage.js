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
  DisplayNumber,
  GridContainer,
  PageHeaderAds,
  JobMap
} from '../../components'
import JobsPageDesktop from './components/desktop/NewJobsPageDesktop'

const DISPLAY_STATES = {
  list: <AdsList />,
  map: <JobMap />,
  overview: <SourceRanking />
}

class AdsPage extends Component {
  state = { activeItem: 'list' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  getNumberOfSources = () => {
    let { ads } = this.props

    const number = numberOfUniqueSources(ads.hits)

    return number
  }

  render() {
    const { activeItem } = this.state

    const activeComponent = DISPLAY_STATES[activeItem]

    return (
      <React.Fragment>
        <Responsive maxWidth={breakpoint.tablet}>
          <GridContainer rows={'185px calc(100vh - 185px)'}>
            <Header>
              <PageHeaderAds />

              <p
                style={{
                  fontSize: theme.fontSizeMedium,
                  margin: '0',
                  alignSelf: 'center',
                  textAlign: 'center',
                  padding: '1rem 0'
                }}
              >
                <DisplayNumber>
                  {this.props.ads.total ? this.props.ads.total : 0}
                </DisplayNumber>{' '}
                jobbannonser från{' '}
                <DisplayNumber>{this.getNumberOfSources()}</DisplayNumber>{' '}
                rekryteringssajter
              </p>

              <CustomMenu borderless fluid widths={3}>
                <CustomMenuItem
                  name="list"
                  active={activeItem === 'list'}
                  content="Lista"
                  onClick={this.handleItemClick}
                />

                <CustomMenuItem
                  name="map"
                  active={activeItem === 'map'}
                  content="Karta"
                  onClick={this.handleItemClick}
                />

                <CustomMenuItem
                  name="overview"
                  active={activeItem === 'overview'}
                  content="Översikt"
                  onClick={this.handleItemClick}
                />
              </CustomMenu>
            </Header>
            <Content>{activeComponent}</Content>
          </GridContainer>
        </Responsive>
        <Responsive minWidth={breakpoint.tablet}>
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
      background: ${theme.brightestSecondary};
      border-top: 2px solid ${theme.secondary};
      border-bottom: 2px solid ${theme.secondary};
      border-left: 1px solid ${theme.secondary};
      border-right: 1px solid ${theme.secondary};
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
