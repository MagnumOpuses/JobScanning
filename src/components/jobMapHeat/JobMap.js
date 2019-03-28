/* eslint-disable no-undef */
import React from 'react'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'
import _ from 'lodash'
import counties from './laen-kustlinjer.geo.json'
import municipalities from './kommuner-kustlinjer.geo.json'
import mapStyles from './mapStyles.json'
import Polygon from './Polygon'

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_DEV_GOOGLE_MAPS_API_KEY
    }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  return (
    <GoogleMap
      defaultZoom={5}
      defaultCenter={{ lat: 63, lng: 21 }}
      center={props.center}
      zoom={props.zoom}
      defaultOptions={{
        disableDefaultUI: true,
        // scrollwheel: false,
        styles: mapStyles
      }}
    >
      {props.showCounties &&
        counties.features.map(feature => {
          const countyCode = feature.properties['ref:se:länskod']
          const countyName = feature.properties.name
          const countyPaths = feature.geometry.coordinates.map(array => {
            return array[0].map(coords => {
              return { lng: coords[0], lat: coords[1] }
            })
          })
          const googleMapsConfig = feature.googleMapsConfig
          return (
            <Polygon
              key={countyName}
              placeCode={countyCode}
              placeName={countyName}
              placePaths={countyPaths}
              googleMapsConfig={googleMapsConfig}
              numberOfJobsInPlace={props.numberOfJobsInPlace}
              handleClickedCounty={props.handleClickedCounty}
            />
          )
        })}

      {props.showMunicipalities &&
        props.filteredMunicipalities.map(municipality => {
          const municipalityName = municipality.properties.short_name
          const municipalitiesPaths = municipality.geometry.coordinates.map(
            array => {
              return array[0].map(coords => {
                return { lng: coords[0], lat: coords[1] }
              })
            }
          )

          const flattenedCountyPaths = municipalitiesPaths.flat()

          const averageCoords = {
            center: {
              lng:
                _.sumBy(flattenedCountyPaths, 'lng') /
                flattenedCountyPaths.length,
              lat:
                _.sumBy(flattenedCountyPaths, 'lat') /
                flattenedCountyPaths.length
            }
          }

          return (
            <Polygon
              key={municipalityName}
              placeName={municipalityName}
              placePaths={municipalitiesPaths}
              googleMapsConfig={averageCoords}
              numberOfJobsInPlace={props.numberOfJobsInPlace}
              handleClickedMunicipality={props.handleClickedMunicipality}
            />
          )
        })}
    </GoogleMap>
  )
})

class JobMap extends React.Component {
  state = {
    center: { lat: 63, lng: 21 },
    zoom: 5,
    showCounties: true,
    showMunicipalities: false,
    municipalitiesPaths: [],
    activeComponent: 'now'
  }

  changeComponent = componentName => {
    this.setState({ activeComponent: componentName })
  }

  getNumberOfJobsInPlace = () => {
    const { location, numberOfJobsInPlace } = this.props

    if (!location) {
      return numberOfJobsInPlace.sweden
    }

    if (location in numberOfJobsInPlace) {
      return numberOfJobsInPlace[location]
    } else {
      return 0
    }
  }

  handleClickedCounty = (countyCode, countyName, countyConfig) => {
    this.props.handleLocationChange(countyName)

    const filteredMunicipalities = municipalities.features.filter(
      municipality =>
        municipality.properties['ref:se:kommun:kod'].substring(0, 2) ===
        countyCode
    )

    this.setState({
      center: countyConfig.center,
      zoom: countyConfig.zoom,
      showCounties: false,
      showMunicipalities: true,
      filteredMunicipalities: filteredMunicipalities
    })
  }

  render() {
    const { searchTerm, location, numberOfJobsInPlace } = this.props
    const { activeComponent } = this.state

    return (
      <MapContainer>
        <MyMapComponent
          numberOfJobsInPlace={numberOfJobsInPlace}
          center={this.state.center}
          zoom={this.state.zoom}
          handleClickedCounty={this.handleClickedCounty}
          showCounties={this.state.showCounties}
          showMunicipalities={this.state.showMunicipalities}
          municipalitiesPolygons={this.state.municipalitiesPolygons}
          filteredMunicipalities={this.state.filteredMunicipalities}
          handleClickedMunicipality={this.props.handleLocationChange}
        />
        <MapSideMenu>
          <Menu>
            <MenuItem
              selected={activeComponent === 'now'}
              onClick={() => this.setState({ activeComponent: 'now' })}
            >
              <p>NULÄGE</p>
            </MenuItem>
            <MenuItem
              selected={activeComponent === 'forecast'}
              onClick={() => this.setState({ activeComponent: 'forecast' })}
            >
              <p>PROGNOS</p>
            </MenuItem>
          </Menu>
          <p>
            Just nu finns det {this.getNumberOfJobsInPlace()}
            st annonser i {location ? location : 'hela Sverige'} för{' '}
            {searchTerm}
          </p>
          <ZoomMenu>
            <Button
              circular
              size={'massive'}
              icon="zoom-in"
              onClick={() =>
                this.setState(prevState => ({
                  zoom: prevState.zoom + 1
                }))
              }
            />
            <Button
              circular
              size={'massive'}
              icon="zoom-out"
              onClick={() =>
                this.setState(prevState => ({
                  zoom: prevState.zoom - 1,
                  showCounties: prevState.zoom <= 6 ? true : false,
                  showMunicipalities: prevState.zoom <= 6 ? false : true,
                  center: prevState.zoom <= 6 && { lat: 63, lng: 21 }
                }))
              }
            />
            <Button
              circular
              size={'massive'}
              icon="world"
              onClick={() =>
                this.setState({
                  showCounties: true,
                  showMunicipalities: false,
                  center: { lat: 63, lng: 21 },
                  zoom: 5
                })
              }
            />
          </ZoomMenu>
        </MapSideMenu>
      </MapContainer>
    )
  }
}

export default JobMap

const MapContainer = styled.div`
  position: relative;
  height: 100%;
`

const MapSideMenu = styled.aside`
  position: absolute;
  top: 0;
  right: 0;
  width: 40%;
  padding: 1rem;
`

const Menu = styled.ul`
  grid-row: 1/2;
  grid-column: 1/2;
  min-height: 50px;
  display: flex;
  align-items: center;
  list-style: none;
  margin-bottom: 4rem;
`

const MenuItem = styled.li`
  flex: 1;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  padding: 1rem;
  color: #000;
  transition: all 0.2s;
  cursor: pointer;

  & p {
    display: inline-block;
    position: relative;
  }

  &:hover {
    & p:before {
      visibility: visible;
      transform: scaleX(1);
    }
  }

  & p:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: #000;
    visibility: ${props => (props.selected ? 'visible' : 'hidden')};
    transform: ${props => (props.selected ? 'scaleX(1)' : 'scaleX(0)')};
    transition: all 0.2s ease-in-out 0s;
  }
`

const ZoomMenu = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`
