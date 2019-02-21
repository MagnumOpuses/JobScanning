import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectJob, unselectJob } from '../../../redux/actions'
import styled from 'styled-components'
import format from 'date-fns/format'
import sv from 'date-fns/locale/sv'
import {
  BoldText,
  Ellipse,
  SourceRanking,
  DescriptionContainer,
  JobMap,
  ResultStats,
  TextEnrichment
} from '../../../components'
import PageHeaderAds from './PageHeaderAds'
import JobsList from '../../../components/jobList/JobsList'
import theme from '../../../styles/theme'
import { fetchTextEnrichment } from '../../../redux/thunks/index'

class DesktopJobsPage extends Component {
  state = { activeComponent: 'list' }

  changeComponent = componentName => {
    this.setState({ activeComponent: componentName })
  }

  selectAd = selectedJob => {
    this.props.fetchTextEnrichment(selectedJob)
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

        <FlexContainer>
          <SideMenu>
            <Menu>
              <MenuItem
                selected={activeComponent === 'list'}
                onClick={() => this.setState({ activeComponent: 'list' })}
              >
                <p>LISTA</p>
              </MenuItem>
              {/* <MenuItem
                selected={activeComponent === 'map'}
                onClick={() => this.setState({ activeComponent: 'map' })}
              ><p>
                KARTA
                </p>
              </MenuItem> */}
              <MenuItem
                selected={activeComponent === 'overview'}
                onClick={() => this.setState({ activeComponent: 'overview' })}
              >
                <p>ÖVERSIKT</p>
              </MenuItem>
            </Menu>
            <ResultStats />
            <div
              style={{
                display: activeComponent === 'list' ? 'block' : 'none',
                height: '90%'
              }}
            >
              <JobsList selectAd={this.selectAd} />
            </div>
            {Object.keys(this.props.hits).length === 0
              ? ''
              : (activeComponent === 'map' && <JobMap desktop />) ||
                (activeComponent === 'overview' && <SourceRanking />)}
          </SideMenu>

          {Object.keys(selectedJob).length > 0 ? (
            <JobDetails>
              <h1 style={{ fontSize: '32px' }}>{selectedJob.header}</h1>
              <h2 style={{ fontSize: '30px' }}>{selectedJob.employer.name}</h2>

              {selectedJob.enrichment && selectedJob.enrichment.status === 200 && (
                <div
                  style={{
                    display: 'flex',
                    margin: '3rem 0 6rem',
                    padding: '2.5rem 0 0',
                    borderTop: `2px solid ${theme.green4}`
                  }}
                >
                  <TextEnrichment />
                </div>
              )}

              {selectedJob.location && (
                <p
                  style={{
                    padding: '2rem 0 0',
                    marginBottom: '15px',
                    borderTop: `2px solid ${theme.green4}`
                  }}
                >
                  <BoldText>Ort:</BoldText> {selectedJob.location}
                </p>
              )}

              <p>
                <BoldText>Sök jobbet senast:</BoldText>{' '}
                {selectedJob.application.deadline
                  ? format(
                      new Date(selectedJob.application.deadline),
                      'D MMMM',
                      {
                        locale: sv
                      }
                    )
                  : 'Se annonsen för datum'}
              </p>

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
              <DescriptionContainer
                text={selectedJob.content}
                characters={1200}
                sources={selectedJob.sources}
              />
            </JobDetails>
          ) : (
            <JobDetails />
          )}
        </FlexContainer>
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
  { selectJob, unselectJob, fetchTextEnrichment }
)(DesktopJobsPage)

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 85%;
  margin-top: 5rem;
`

const JobDetails = styled.div`
  margin-left: 8rem;
  width: 740px;
  max-width: 740px;

  h1 {
    margin: 9rem 0 15px 0;
  }

  h2 {
    font-weight: normal !important;
  }

  p {
    font-size: 20px !important;
  }
`

const Menu = styled.ul`
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
  height: 75vh;
  width: 480px;
  max-width: 480px;
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
