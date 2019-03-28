import React from 'react'
import { connect } from 'react-redux'
import {
  setSearchTerm,
  setLocation,
  searchJobs
} from '../../redux/actions/index'
import { withRouter } from 'react-router-dom'
import { countiesAndMunicipalities } from '../../utils/searchOptions'
import SearchForm from './SearchForm'

class SearchFormContainer extends React.Component {
  handleChange = (event, data) => {
    const { setSearchTerm, setLocation } = this.props

    if (data.name === 'searchTerm') {
      setSearchTerm(data.value)
    } else if (data.name === 'location') {
      setLocation(data.value)
    }
  }

  handleSubmit = event => {
    const { searchTerm, location, searchJobs, history } = this.props

    event.preventDefault()
    searchJobs(searchTerm, location)
    history.push('/jobs')
  }

  render() {
    const { searchTerm, location, upward, isDesktop } = this.props

    return (
      <SearchForm
        searchTerm={searchTerm}
        location={location}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        countiesAndMunicipalities={countiesAndMunicipalities}
        upward={upward}
        isDesktop={isDesktop}
      />
    )
  }
}

function mapStateToProps({ ads }) {
  const { searchTerm, location } = ads

  return {
    searchTerm,
    location
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    { setSearchTerm, setLocation, searchJobs }
  )(SearchFormContainer)
)
