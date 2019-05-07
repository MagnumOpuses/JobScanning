import React from 'react'
import { connect } from 'react-redux'
import { setLocation, fetchJobs } from '../../redux/actions/index'
import { withRouter } from 'react-router-dom'
import { countiesAndMunicipalities } from '../../utils/searchOptions'
import SearchForm from './SearchForm'

class SearchFormContainer extends React.Component {
  state = {
    term: ''
  }

  handleChange = (event, data) => {
    const { setLocation } = this.props

    console.log(data)

    if (data.name === 'searchTerm') {
      this.setState({ term: data.value })
    } else if (data.name === 'location') {
      setLocation(data.value)
    }
  }

  handleSubmit = event => {
    const { location, fetchJobs, history } = this.props

    event.preventDefault()
    fetchJobs(this.state.term, location)
    history.push('/jobs')
  }

  render() {
    const { location, upward, isDesktop } = this.props

    return (
      <SearchForm
        searchTerm={this.state.term}
        location={location.value}
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
  const { location } = ads

  return {
    location
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    { setLocation, fetchJobs }
  )(SearchFormContainer)
)
