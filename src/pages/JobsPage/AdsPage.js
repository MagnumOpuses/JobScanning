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
import { CustomLoader, NoResultsBox } from '../../components/index'
import posed from 'react-pose'

const SlideUpAndDown = posed.div({
  hidden: {
    transform: 'translateY(-213px)',
    transition: {
      default: { ease: 'linear', duration: 300 }
    }
  },
  visible: {
    transform: 'translateY(0px)',
    transition: {
      default: { ease: 'linear', duration: 300 }
    }
  }
})

class AdsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeComponent: 'list',
      headerVisible: true,
      lastScrollTop: 0
    }
    this.headerRef = React.createRef()
  }

  changeComponent = componentName => {
    this.setState({ activeComponent: componentName })
  }

  getNumberOfSources = () => {
    let { hits } = this.props

    const number = numberOfUniqueSources(hits)

    return number
  }

  handleScroll = ref => {
    const refScrollTop = ref.current.scrollTop
    const headerHeight = this.headerRef.current.offsetHeight

    const { lastScrollTop } = this.state

    if (Math.abs(this.state.lastScrollTop - refScrollTop) <= 5) {
      return
    }

    if (refScrollTop > lastScrollTop && refScrollTop > headerHeight) {
      this.setState({
        headerVisible: false,
        lastScrollTop: refScrollTop
      })
    } else {
      this.setState({
        headerVisible: true,
        lastScrollTop: refScrollTop
      })
    }
  }

  getContent = () => {
    const { activeComponent } = this.state
    const { hits, isFetching, error } = this.props

    if (isFetching) {
      return <CustomLoader size="massive" content="Laddar" />
    } else if (error) {
      return <NoResultsBox />
    } else if (Object.keys(hits).length === 0) {
      return <NoResultsBox />
    } else {
      return (
        <div style={{ marginTop: '185px' }}>
          <div
            style={{
              display: activeComponent === 'list' ? 'block' : 'none',
              height: '100%',
              marginTop: '-185px'
            }}
          >
            <AdsList handleScroll={this.handleScroll} />
          </div>
          {activeComponent === 'map' && <JobMap />}
          {activeComponent === 'overview' && <SourceRanking />}
        </div>
      )
    }
  }

  render() {
    const { activeComponent, headerVisible } = this.state

    return (
      <React.Fragment>
        <Responsive maxWidth={breakpoint.tablet}>
          <GridContainer rows={'185px calc(100vh - 185px)'}>
            <Header
              ref={this.headerRef}
              pose={headerVisible ? 'visible' : 'hidden'}
            >
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
            {this.getContent()}
          </GridContainer>
        </Responsive>
        <Responsive minWidth={769}>
          <JobsPageDesktop />
        </Responsive>
      </React.Fragment>
    )
  }
}

function mapStateToProps({ ads }) {
  const { hits, error, isFetching } = ads

  return {
    hits,
    error,
    isFetching
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

const Header = styled(SlideUpAndDown)`
  grid-row: 1/2;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #fff;
  transition: all 0.2s;
`
