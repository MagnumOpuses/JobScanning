import React from 'react'
import { connect } from 'react-redux'
import { setLocation, selectJob, unselectJob } from '../../redux/actions'
import JobMap from './JobMap'

class JobMapContainer extends React.Component {
  handleLocationChange = location => {
    this.props.setLocation(location)
  }

  render() {
    const {
      processedList,
      selectedJob,
      desktop,
      numberOfJobsInPlace
    } = this.props

    return (
      <JobMap
        selectedJob={selectedJob}
        processedList={processedList}
        desktop={desktop}
        numberOfJobsInPlace={numberOfJobsInPlace}
        handleLocationChange={this.handleLocationChange}
      />
    )
  }
}

function mapStateToProps({ ads }) {
  const { hits, processedList, selectedJob, numberOfJobsInPlace } = ads

  return {
    hits,
    processedList,
    selectedJob,
    numberOfJobsInPlace
  }
}

export default connect(
  mapStateToProps,
  { setLocation, selectJob, unselectJob }
)(JobMapContainer)
