import React from 'react'
import { compose, withProps } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  OverlayView,
  Polygon
} from 'react-google-maps'
import JobMapWindow from './components/JobMapWindow'
import _ from 'lodash'
import counties from './laen-kustlinjer.geo.json'
import municipalities from './kommuner-kustlinjer.geo.json'
import { countiesAndMunicipalities } from '../../utils/searchOptions'
import mapStyles from './mapStyles.json'

const getPixelPositionOffset = (width, height) => ({
  x: -(width / 2),
  y: -(height - 2)
})

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
    console.log(googleMap.current.getZoom())

    let test = googleMap.current.getCenter().lat()
    console.log(test)
  }

  return (
    <GoogleMap
      defaultZoom={5}
      defaultCenter={{ lat: 63, lng: 15 }}
      center={props.center}
      zoom={props.zoom}
      defaultOptions={{
        disableDefaultUI: true,
        // scrollwheel: false,
        styles: mapStyles
      }}
      ref={googleMap}
      onDragEnd={() => getZoomAndCenter()}
    >
      {props.showCounties &&
        counties.features.map(feature => {
          const county = feature.properties.name
          const countyPaths = feature.geometry.coordinates.map(array => {
            return array[0].map(coords => {
              return { lng: coords[0], lat: coords[1] }
            })
          })
          return (
            <Polygon
              key={county}
              paths={countyPaths}
              onClick={() =>
                props.handleClickedCounty(
                  feature.properties['ref:se:länskod'],
                  feature.properties.name,
                  countyPaths
                )
              }
              visible={true}
              options={{
                strokeColor: '#fff',
                strokeWeight: 1.5,
                fillColor: getFillColor(props.numberOfJobsInCounties[county]),
                fillOpacity: 1
              }}
              // onMouseOver={() => console.log('enter', county)}
              // onMouseOut={() => console.log('leave', county)}
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

  handleClickedCounty = (countyCode, countyName, countyPaths) => {
    this.props.handleLocationChange(countyName)

    const flattenedCountyPaths = countyPaths.flat()

    const averageCoords = {
      lng: _.sumBy(flattenedCountyPaths, 'lng') / flattenedCountyPaths.length,
      lat: _.sumBy(flattenedCountyPaths, 'lat') / flattenedCountyPaths.length
    }

    const filteredMunicipalities = municipalities.features.filter(
      municipality =>
        municipality.properties['ref:se:kommun:kod'].substring(0, 2) ===
        countyCode
    )

    console.log(filteredMunicipalities)

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
            fillColor: '#ddd',
            fillOpacity: 1
          }}
        />
      )
    })

    this.setState({
      center: averageCoords,
      zoom: 7,
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
      numberOfJobsInCounties
    } = this.props

    return (
      <>
        <MyMapComponent
          selectedJob={selectedJob}
          processedList={processedList}
          toggleInfoWindow={toggleInfoWindow}
          desktop={desktop}
          numberOfJobsInCounties={numberOfJobsInCounties}
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
