import React from 'react'
import { connect } from 'react-redux'
import { setLocation, selectJob, unselectJob } from '../../redux/actions'
import _ from 'lodash'
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
      numberOfJobsInCounties
    } = this.props

    return (
      <JobMap
        selectedJob={selectedJob}
        processedList={processedList}
        desktop={desktop}
        numberOfJobsInCounties={numberOfJobsInCounties}
        handleLocationChange={this.handleLocationChange}
      />
    )
  }
}

function mapStateToProps({ ads }) {
  const { hits, processedList, selectedJob, numberOfJobsInCounties } = ads

  return {
    hits,
    processedList,
    selectedJob,
    numberOfJobsInCounties
  }
}

export default connect(
  mapStateToProps,
  { setLocation, selectJob, unselectJob }
)(JobMapContainer)
