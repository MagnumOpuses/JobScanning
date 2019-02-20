import React from 'react'
import { compose, withProps } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  OverlayView,
  Polygon
} from 'react-google-maps'
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer'
import JobMapWindow from './components/JobMapWindow'
import markerSelected from '../../images/markerIcons/markerSelected.png'
import markerUnselected from '../../images/markerIcons/markerUnselected.png'
import data from './laen-kustlinjer.geo.json'

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
)(props => (
  <GoogleMap
    defaultZoom={4.8}
    defaultCenter={{ lat: 62.173276, lng: 14.942265 }}
    defaultOptions={{
      disableDefaultUI: true
    }}
  >
    {data.features.map(feature => {
      const laen = feature.properties.name
      const laenPaths = feature.geometry.coordinates.map(array => {
        return array[0].map(coords => {
          return { lng: coords[0], lat: coords[1] }
        })
      })
      return (
        <Polygon
          key={laen}
          paths={laenPaths}
          // onClick={() => console.log(laen)}
          visible={true}
          options={{
            strokeWeight: 2,
            fillColor: getFillColor(props.numberOfJobsInCounties[laen]),
            fillOpacity: 0.8
          }}
          // onMouseOver={() => console.log('enter', laen)}
          // onMouseOut={() => console.log('leave', laen)}
        />
      )
    })}

    {console.log(props.numberOfJobsInCounties)}
  </GoogleMap>
))

class JobMap extends React.Component {
  render() {
    const {
      markers,
      selectedJob,
      processedList,
      toggleInfoWindow,
      desktop,
      numberOfJobsInCounties
    } = this.props

    // console.log(numberOfJobsInCounties)

    return (
      <MyMapComponent
        markers={markers}
        selectedJob={selectedJob}
        processedList={processedList}
        toggleInfoWindow={toggleInfoWindow}
        desktop={desktop}
        numberOfJobsInCounties={numberOfJobsInCounties}
      />
    )
  }
}

export default JobMap
