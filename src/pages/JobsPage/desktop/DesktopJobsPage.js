import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectJob, unselectJob } from '../../../redux/actions'
import styled from 'styled-components'
import {
  Ellipse,
  SourceRanking,
  JobMap,
  ResultStats,
  EnrichmentRanking
} from '../../../components'
import PageHeaderAds from '../components/PageHeaderAds'
import JobsList from '../../../components/jobList/JobsList'
import theme from '../../../styles/theme'
import DesktopJobDetails from './components/DesktopJobDetails'

class DesktopJobsPage extends Component {
  state = { activeComponent: 'list' }

  changeComponent = componentName => {
    this.setState({ activeComponent: componentName })
  }

  selectAd = selectedJob => {
    this.props.selectJob(selectedJob)
  }

  render() {
    const { activeComponent } = this.state
    const { selectedJob } = this.props

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <PageHeaderAds />

        <GridContainer>
          <Menu>
            <MenuItem
              selected={activeComponent === 'list'}
              onClick={() => this.setState({ activeComponent: 'list' })}
            >
              <p>ANNONSER</p>
            </MenuItem>
            <MenuItem
              selected={activeComponent === 'map'}
              onClick={() => this.setState({ activeComponent: 'map' })}
            >
              <p>KARTA</p>
            </MenuItem>
            <MenuItem
              selected={activeComponent === 'overview'}
              onClick={() => this.setState({ activeComponent: 'overview' })}
            >
              <p>ÖVERSIKT</p>
            </MenuItem>
          </Menu>

          <SideMenu>
            <ResultStats />
            <JobsList selectAd={this.selectAd} />
            {/* <P style={{ padding: '.5rem 0 1rem' }}>Scrolla ner för att se fler.</P> */}
          </SideMenu>

          <Content>
            {Object.keys(this.props.hits).length === 0
              ? ''
              : (activeComponent === 'map' && <JobMap desktop />) ||
                (activeComponent === 'overview' && <SourceRanking />)}
            {Object.keys(selectedJob).length > 0 &&
            activeComponent === 'list' ? (
              <DesktopJobDetails selectedJob={selectedJob} />
            ) : (
              <div>
                {activeComponent === 'overview' &&
                  this.props.hits.length > 0 && <EnrichmentRanking />}
              </div>
            )}
          </Content>
        </GridContainer>
        <EllipseContainer>
          <Ellipse
            height="220px"
            width="170px"
            bottom="-60px"
            right="-20px"
            bgcolor={`linear-gradient(#fff, ${theme.green4})`}
            zIndex={-2}
          />
          <Ellipse
            height="180px"
            width="140px"
            bottom="-60px"
            right="82px"
            bgcolor={`linear-gradient(#fff, ${theme.green1})`}
            zIndex={-1}
          />
        </EllipseContainer>
      </div>
    )
  }
}

function mapStateToProps({ ads }) {
  const { hits, selectedJob } = ads

  return {
    hits,
    selectedJob
  }
}

export default connect(
  mapStateToProps,
  { selectJob, unselectJob }
)(DesktopJobsPage)

const GridContainer = styled.div`
  width: 90%;
  display: grid;
  grid-template-rows: 50px 1fr;
  grid-template-columns: 480px 1fr;
  grid-row-gap: 2rem;
  grid-column-gap: 5rem;
  margin-top: 5rem;
`

const Menu = styled.ul`
  grid-row: 1/2;
  grid-column: 1/2;
  min-height: 50px;
  display: flex;
  align-items: center;
  list-style: none;
`

const MenuItem = styled.li`
  flex: 1;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  padding: 1rem;
  color: ${props => (props.selected ? theme.green4 : '#000')};
  transition: all 0.2s;
  cursor: pointer;

  & p {
    display: inline-block;
    position: relative;
  }

  &:hover {
    color: ${theme.green4};
    & p:before {
      visibility: visible;
      transform: scaleX(1);
    }
  }

  & p:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: ${theme.green4};
    visibility: ${props => (props.selected ? 'visible' : 'hidden')};
    transform: ${props => (props.selected ? 'scaleX(1)' : 'scaleX(0)')};
    transition: all 0.2s ease-in-out 0s;
  }
`

const SideMenu = styled.div`
  grid-row: 2/3;
  grid-column: 1/2;
  height: 75vh;
  width: 480px;
  max-width: 480px;
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  grid-row: 2/3;
  grid-column: 2/3;
  /* width: 740px; */
  /* max-width: 740px; */

  h2 {
    font-weight: normal !important;
  }

  p {
    font-size: 20px !important;
  }
`

const EllipseContainer = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  height: 220px;
  width: 250px;
  overflow: hidden;
  z-index: -1;
`