import React from 'react'
import { compose, withProps } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polygon
} from 'react-google-maps'
import _ from 'lodash'
import counties from './laen-kustlinjer.geo.json'
import municipalities from './kommuner-kustlinjer.geo.json'
import mapStyles from './mapStyles.json'

function getFillColor(number) {
  if (number > 15) {
    return '#0f0'
  } else if (number > 10) {
    return '#0c0'
  } else if (number > 5) {
    return '#090'
  } else if (number > 0) {
    return '#050'
  } else {
    return '#ddd'
  }
}

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_DEV_GOOGLE_MAPS_API_KEY
    }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `74vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  let googleMap = React.createRef()

  function getZoomAndCenter() {
    console.log('zoom', googleMap.current.getZoom())
    console.log('lat', googleMap.current.getCenter().lat())
    console.log('lng', googleMap.current.getCenter().lng())
  }

  return (
    <GoogleMap
      defaultZoom={5}
      defaultCenter={{ lat: 63, lng: 15 }}
      center={props.center}
      zoom={props.zoom}
      defaultOptions={{
        disableDefaultUI: true,
        scrollwheel: false,
        styles: mapStyles
      }}
      ref={googleMap}
      onDragEnd={() => getZoomAndCenter()}
      onZoomChanged={() => getZoomAndCenter()}
    >
      {props.showCounties &&
        counties.features.map(feature => {
          const countyPaths = feature.geometry.coordinates.map(array => {
            return array[0].map(coords => {
              return { lng: coords[0], lat: coords[1] }
            })
          })
          return (
            <Polygon
              key={feature.properties.name}
              paths={countyPaths}
              onClick={() =>
                props.handleClickedCounty(
                  feature.properties['ref:se:länskod'],
                  feature.properties.name,
                  feature.googleMapsConfig
                )
              }
              visible={true}
              options={{
                strokeColor: '#fff',
                strokeWeight: 1.5,
                fillColor: getFillColor(
                  props.numberOfJobsInPlace[feature.properties.name]
                ),
                fillOpacity: 1
              }}
            />
          )
        })}
      {props.showMunicipalities && props.municipalitiesPolygons}
    </GoogleMap>
  )
})

class JobMap extends React.Component {
  state = {
    center: { lat: 63, lng: 15 },
    zoom: 5,
    showCounties: true,
    showMunicipalities: false,
    municipalitiesPaths: []
  }

  handleClickedCounty = (countyCode, countyName, countyConfig) => {
    this.props.handleLocationChange(countyName)

    const filteredMunicipalities = municipalities.features.filter(
      municipality =>
        municipality.properties['ref:se:kommun:kod'].substring(0, 2) ===
        countyCode
    )

    const municipalitiesPolygons = filteredMunicipalities.map(municipality => {
      const municipalityName = municipality.properties.short_name

      const municipalitiesPaths = municipality.geometry.coordinates.map(
        array => {
          return array[0].map(coords => {
            return { lng: coords[0], lat: coords[1] }
          })
        }
      )

      return (
        <Polygon
          key={municipalityName}
          paths={municipalitiesPaths}
          onClick={() => this.props.handleLocationChange(municipalityName)}
          visible={true}
          options={{
            strokeColor: '#fff',
            strokeWeight: 1.5,
            fillColor: getFillColor(
              this.props.numberOfJobsInPlace[municipalityName]
            ),
            fillOpacity: 1
          }}
        />
      )
    })

    this.setState({
      center: countyConfig.center,
      zoom: countyConfig.zoom,
      showCounties: false,
      showMunicipalities: true,
      municipalitiesPolygons: municipalitiesPolygons
    })
  }

  render() {
    const {
      selectedJob,
      processedList,
      toggleInfoWindow,
      desktop,
      numberOfJobsInPlace
    } = this.props

    return (
      <>
        <MyMapComponent
          selectedJob={selectedJob}
          processedList={processedList}
          toggleInfoWindow={toggleInfoWindow}
          desktop={desktop}
          numberOfJobsInPlace={numberOfJobsInPlace}
          center={this.state.center}
          zoom={this.state.zoom}
          handleClickedCounty={this.handleClickedCounty}
          handleClickedMunicipality={this.handleClickedMunicipality}
          showCounties={this.state.showCounties}
          showMunicipalities={this.state.showMunicipalities}
          municipalitiesPolygons={this.state.municipalitiesPolygons}
        />
        <button
          onClick={() =>
            this.setState({
              showCounties: true,
              showMunicipalities: false,
              center: { lat: 63, lng: 15 },
              zoom: 5
            })
          }
        >
          ZOOMA UT
        </button>
      </>
    )
  }
}

export default JobMap
