import React from 'react'
import { connect } from 'react-redux'
import { setLocation } from '../../redux/actions'
import JobMap from './JobMap'

class JobMapContainer extends React.Component {
  handleLocationChange = location => {
    this.props.setLocation(location)
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
  { setLocation }
)(JobMapContainer)
