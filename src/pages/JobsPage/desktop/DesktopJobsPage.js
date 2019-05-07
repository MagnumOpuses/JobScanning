import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectJob, unselectJob } from '../../../redux/actions'
import styled from 'styled-components'
import { JobMap, ResultStats } from '../../../components'
import PageHeaderAds from '../components/PageHeaderAds'
import JobAdsList from '../../../components/jobAdsList/JobAdsList'
import theme from '../../../styles/theme'
import DesktopJobDetails from './components/DesktopJobDetails'
import DesktopOverview from './components/DesktopOverview'

class DesktopJobsPage extends Component {
  selectOrUnselectJob = job => {
    if (job.id === this.props.selectedJob.id) {
      this.props.unselectJob(job)
    } else {
      this.props.selectJob(job)
    }
  }

  // getContent = () => {
  //   const { selectedJob } = this.props

  //   if (activeComponent === 'list' && Object.keys(selectedJob).length > 0) {
  //     return <DesktopJobDetails selectedJob={selectedJob} />
  //   } else if (activeComponent === 'map') {
  //     return <JobMap />
  //   } else if (activeComponent === 'overview' && this.props.hits.length > 0) {
  //     return <DesktopOverview />
  //   }
  // }

  render() {
    const { hits, selectedJob } = this.props

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <PageHeaderAds />

        <FlexContainer>
          <LeftContainer>
            <div className="search-metadata">
              {hits.length > 0 && <ResultStats desktop />}
            </div>
            <JobAdsList selectOrUnselectJob={this.selectOrUnselectJob} />
            {/* <P style={{ padding: '.5rem 0 1rem' }}>Scrolla ner för att se fler.</P> */}
          </LeftContainer>

          <RightContainer>
            {Object.keys(selectedJob).length > 0 && (
              <DesktopJobDetails
                selectedJob={selectedJob}
                unselectJob={this.props.unselectJob}
              />
            )}
            <JobMap />
          </RightContainer>
        </FlexContainer>
      </div>
    )
  }
}

function mapStateToProps({ ads }) {
  const { hits, selectedJob, searchTerm, location } = ads

  return {
    hits,
    selectedJob,
    searchTerm,
    location
  }
}

export default connect(
  mapStateToProps,
  { selectJob, unselectJob }
)(DesktopJobsPage)

const FlexContainer = styled.div`
  height: 100%;
  display: flex;
  padding: 0 50px;
`

const LeftContainer = styled.div`
  position: relative;
  width: 480px;
  max-width: 480px;
  display: flex;
  flex-direction: column;

  .search-metadata {
    height: 80px;
    margin: 20px 0;
  }

  .to-overview {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100px;
    width: 90%;
    margin: 10px auto;
    padding: 5px;
    text-align: center;
    color: #000;
    background: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    cursor: pointer;

    &:hover {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      border: 1px solid #a6f3ed;
    }

    h2 {
      font-size: 20px;
      font-weight: normal;
    }

    p {
      font-size: 18px;
    }
  }
`

const RightContainer = styled.div`
  position: relative;
  flex: 1;
  margin-left: 15px;

  h2 {
    font-weight: normal !important;
  }

  p {
    font-size: 20px !important;
  }
`
