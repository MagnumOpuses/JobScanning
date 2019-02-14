import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectJob, unselectJob } from '../../../../redux/actions'
import styled from 'styled-components'
import format from 'date-fns/format'
import _ from 'lodash'
import {
  BoldText,
  Ellipse,
  SourceRanking,
  GridContainer,
  DescriptionContainer,
  JobMap,
  ResultStats,
  TextEnrichment
} from '../../../../components'
import PageHeaderAds from './PageHeaderAds'
import JobsList from '../../../../components/jobList/JobsList'
import theme from '../../../../styles/theme'
import images from '../../../../images/index'
import { fetchTextEnrichment } from '../../../../redux/thunks/index'

class DesktopJobsPage extends Component {
  state = { activeComponent: 'list' }

  changeComponent = componentName => {
    this.setState({ activeComponent: componentName })
  }

  selectAd = selectedJob => {
    this.props.selectJob({})

    // this.props.fetchTextEnrichment(selectedJob)
    this.props.selectJob(selectedJob)
  }

  render() {
    const { activeComponent } = this.state
    const { selectedJob } = this.props

    return (
      <GridContainer rows={'100px calc(100vh - 100px)'} center>
        <PageHeaderAds />

        <GridContainer
          width={'85%'}
          rows={'50px auto'}
          columns={'2fr 3fr'}
          margin={'5rem 0 0 0'}
        >
          <Menu>
            <MenuItem
              selected={activeComponent === 'list'}
              onClick={() => this.setState({ activeComponent: 'list' })}
            >
              LISTA
            </MenuItem>
            <MenuItem
              selected={activeComponent === 'map'}
              onClick={() => this.setState({ activeComponent: 'map' })}
            >
              KARTA
            </MenuItem>
            <MenuItem
              selected={activeComponent === 'overview'}
              onClick={() => this.setState({ activeComponent: 'overview' })}
            >
              ÖVERSIKT
            </MenuItem>
          </Menu>
          <SideMenu>
            <ResultStats />
            <div
              style={{
                display: activeComponent === 'list' ? 'block' : 'none',
                height: '90%'
              }}
            >
              <JobsList selectAd={this.selectAd} />
            </div>
            {activeComponent === 'map' && <JobMap desktop />}
            {activeComponent === 'overview' && <SourceRanking />}
          </SideMenu>

          {Object.keys(selectedJob).length > 0 && (
            <JobDetails>
              <h1 style={{ fontSize: '32px' }}>{selectedJob.header}</h1>
              <h2 style={{ fontSize: '30px' }}>{selectedJob.employer.name}</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p>
                    <BoldText>Kommun:</BoldText> {selectedJob.location}
                  </p>
                  {/* <p>
                    <BoldText>Publicerad:</BoldText>{' '}
                    {format(selectedJob.source.firstSeenAt, 'YYYY-MM-DD HH:mm')}
                  </p> */}
                </div>
                {/* <div>
                  <p>Publicerad hos</p>
                  {selectedJob.duplicatedGroupId.length > 1 ? (
                    'Se nedan'
                  ) : [selectedJob.source.site.name] in images ? (
                    <SourceLogo
                      src={images[selectedJob.source.site.name]}
                      alt={selectedJob.source.site.name}
                    />
                  ) : (
                    <p>{selectedJob.source.site.name}</p>
                  )}
                </div> */}
              </div>
              {selectedJob.enrichment &&
                selectedJob.enrichment.status === 200 && <TextEnrichment />}
              <TextEnrichment />
              <DescriptionContainer
                text={selectedJob.content}
                characters={1200}
                sources={selectedJob.sources}
              />
            </JobDetails>
          )}
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
      </GridContainer>
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
  { selectJob, unselectJob, fetchTextEnrichment }
)(DesktopJobsPage)

const JobDetails = styled.div`
  grid-row: 2/3;
  padding-left: 5rem;
  max-width: 740px;

  h1 {
    margin: 0 0 15px 0;
  }

  h2 {
    font-weight: normal !important;
  }

  p {
    font-size: 20px !important;
  }
`

const Menu = styled.div`
  grid-row: 1/2;
  grid-column: 1/2;
  height: 50px;
  display: flex;
  align-items: center;
`

const MenuItem = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: ${props => (props.selected ? theme.green4 : '#000')};
  transition: all 0.2s;

  &:hover {
    color: ${theme.green4};
    transform: scale(1.05);
  }
`

const SideMenu = styled.div`
  grid-row: 2/3;
  grid-column: 1/2;
  height: 75vh;
  display: flex;
  flex-direction: column;
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

const SourceLogo = styled.img`
  max-height: 50px;
  width: auto;
`
