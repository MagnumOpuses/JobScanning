import React from 'react'
import { connect } from 'react-redux'
import { fetchMoreJobs, setLocation } from '../../redux/actions'
import JobMap from './JobMap'

class JobMapContainer extends React.Component {
  handleLocationChange = location => {
    this.props.setLocation(location)
    this.props.fetchMoreJobs(this.props.searchTerm, this.props.location)
  }

  render() {
    const { searchTerm, location, numberOfJobsInPlace } = this.props

    return (
      <JobMap
        searchTerm={searchTerm}
        location={location}
        numberOfJobsInPlace={numberOfJobsInPlace}
        handleLocationChange={this.handleLocationChange}
      />
    )
  }
}

function mapStateToProps({ ads }) {
  const { searchTerm, location, numberOfJobsInPlace } = ads

  return {
    searchTerm,
    location,
    numberOfJobsInPlace
  }
}

export default connect(
  mapStateToProps,
  { fetchMoreJobs, setLocation }
)(JobMapContainer)
