import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchJobs } from '../redux/actions/index'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Dropdown, Form, Input } from 'semantic-ui-react'
import { Checkbox } from '../components'
import { countiesAndMunicipalities } from '../utils/searchOptions'
import axios from 'axios'
import breakpoint from '../styles/breakpoints'
import { buttonStyle } from '../styles/components/'

class SearchForm extends Component {
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

  handleChange = (event, data) => {
    this.setState({ [data.name]: data.value })
  }

  handleSubmit = async event => {
    event.preventDefault()
    this.props.searchJobs(this.state.searchTerm, this.state.location)
    this.props.history.push('/ads')
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
      <CustomForm
        onSubmit={this.handleSubmit}
        desktop={this.props.desktop ? 1 : 0}
      >
        <Form.Field required={true}>
          <Input
            name="searchTerm"
            value={this.state.searchTerm}
            onChange={this.handleChange}
            size="big"
            icon="search"
            iconPosition="left"
            placeholder="Skriv sökord"
            required
          />
        </Form.Field>

        <div style={{ overflow: 'visible' }}>
          <Form.Field>
            <StyledDropdown
              name="location"
              value={this.state.location}
              onChange={this.handleChange}
              placeholder="Ange plats"
              search
              selection
              options={countiesAndMunicipalities}
              upward={this.props.upward}
            />
          </Form.Field>

          <Checkbox
            label="Använd min nuvarande position"
            onChange={this.getCurrentPosition}
          />
        </div>

        <div style={{ textAlign: 'center' }}>
          <CustomButton
            type="submit"
            disabled={this.state.searchTerm.length > 0 ? false : true}
          >
            Sök
          </CustomButton>
        </div>
      </CustomForm>
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
    { searchJobs }
  )(SearchForm)
)

const StyledDropdown = styled(Dropdown)`
  & .visible {
    min-height: 30vh;
  }
`

const CustomForm = styled(Form)`
  &&& {
    display: flex;
    flex-direction: column;
    height: 350px;
    width: 88%;
    padding: ${props => (props.desktop ? 0 : '3rem 2rem')};
    background: ${props => (props.desktop ? 'none' : props.theme.primary)};
    box-shadow: ${props =>
      props.desktop ? 'none' : '0 0.3rem 0.5rem rgba(0, 0, 0, 0.5)'};
    border-radius: 5px;
    z-index: 1000;
    overflow: visible;

    &&& * {
      font-size: 16px;
    }

    &&& > div {
      margin-top: 1rem;
    }

    @media (min-width: ${breakpoint.tablet}) {
      flex-direction: row;
      justify-content: center;
      height: min-content;
      width: auto;

      & > div {
        margin-right: 1rem;
      }
    }
  }
`

const CustomButton = styled(Button)`
  &&& {
    ${buttonStyle}
    align-self: center;
    margin-top: 4rem;
    padding: 1.4rem 9rem;

    @media (min-width: ${breakpoint.tablet}) {
      margin-top: 0;
    }
  }
`
