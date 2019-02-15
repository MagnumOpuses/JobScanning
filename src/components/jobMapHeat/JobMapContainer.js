import React from 'react'
import { connect } from 'react-redux'
import { selectJob, unselectJob } from '../../redux/actions'
import _ from 'lodash'
import JobMap from './JobMap'

class JobMapContainer extends React.Component {
  toggleInfoWindow = clickedMarker => {
    const { selectedJob } = this.props

    if (clickedMarker.id === selectedJob.id) {
      this.props.unselectJob()
    } else {
      const duplicatedGroupId = _.filter(this.props.hits, item => {
        return item.group.id === clickedMarker.group.id
      })

      this.props.selectJob({ ...clickedMarker, duplicatedGroupId })
    }
  }

  render() {
    const {
      markers,
      processedList,
      selectedJob,
      desktop,
      numberOfJobsInCounties
    } = this.props

    return (
      <JobMap
        markers={markers}
        selectedJob={selectedJob}
        processedList={processedList}
        toggleInfoWindow={this.toggleInfoWindow}
        desktop={desktop}
        numberOfJobsInCounties={numberOfJobsInCounties}
      />
    )
  }
}

function mapStateToProps({ ads }) {
  const {
    hits,
    markers,
    processedList,
    selectedJob,
    numberOfJobsInCounties
  } = ads

  return {
    hits,
    markers,
    processedList,
    selectedJob,
    numberOfJobsInCounties
  }
}

export default connect(
  mapStateToProps,
  { selectJob, unselectJob }
)(JobMapContainer)
