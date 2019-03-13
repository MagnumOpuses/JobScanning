import React from 'react'
import { connect } from 'react-redux'
import { setLocation, searchJobs } from '../../redux/actions/index'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { countiesAndMunicipalities } from '../../utils/searchOptions'
import SearchForm from './SearchForm'

class SearchFormContainer extends React.Component {
  state = {
    searchTerm: this.props.searchTerm,
    location: ''
  }

  componentDidMount() {
    this.setState({
      searchTerm: this.props.searchTerm,
      location: this.props.location
    })
  }

  componentDidUpdate() {
    if (this.state.location !== this.props.location) {
      this.setState({ location: this.props.location })
    }
  }

  handleChange = (event, data) => {
    this.setState({ [data.name]: data.value })
  }

  handleLocationChange = (event, data) => {
    this.props.setLocation(data.value)
  }

  handleSubmit = async event => {
    console.log(this.state.searchTerm, this.state.location)

    event.preventDefault()
    this.props.searchJobs(this.state.searchTerm, this.state.location)
    this.props.history.push('/jobs')
  }

  getCurrentPosition = () => {
    const success = async position => {
      const {
        coords: { latitude, longitude }
      } = position

      let { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${
          process.env.REACT_APP_DEV_GOOGLE_MAPS_API_KEY
        }&result_type=locality`
      )

      if (data.status === 'OK') {
        for (let i = 0; i < data.results[0].address_components.length; i++) {
          let component = data.results[0].address_components[i]

          if (
            component.types.includes('sublocality') ||
            component.types.includes('locality')
          ) {
            for (let i = 0; i < countiesAndMunicipalities.length; i++) {
              if (countiesAndMunicipalities[i].text === component.long_name) {
                this.setState({
                  location: countiesAndMunicipalities[i].value
                })
              }
            }
          }
        }
        console.log(this.state)
      }
    }

    const error = error => {
      console.log(error)
      alert('ERROR(' + error.code + '): ' + error.message)
    }

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    })
  }

  render() {
    return (
      <SearchForm
        searchTerm={this.state.searchTerm}
        location={this.state.location}
        handleChange={this.handleChange}
        handleLocationChange={this.handleLocationChange}
        handleSubmit={this.handleSubmit}
        countiesAndMunicipalities={countiesAndMunicipalities}
        upward={this.props.upward}
        isDesktop={this.props.isDesktop}
        getCurrentPosition={this.getCurrentPosition}
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
    { setLocation, searchJobs }
  )(SearchFormContainer)
)
