import React from 'react'
import { compose, withProps } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  OverlayView
} from 'react-google-maps'
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer'
import JobMapWindow from './components/JobMapWindow'
import markerSelected from '../../images/markerIcons/markerSelected.png'
import markerUnselected from '../../images/markerIcons/markerUnselected.png'

const getPixelPositionOffset = (width, height) => ({
  x: -(width / 2),
  y: -(height - 2)
})

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
    {props.markers.length > 0 && (
      <MarkerClusterer
        onClick={props.onMarkerClustererClick}
        averageCenter
        enableRetinaIcons
        gridSize={100}
        maxZoom={14}
      >
        {props.markers.map(marker => {
          const position = {
            lat: marker.geocode.geometry.location.lat,
            lng: marker.geocode.geometry.location.lng
          }
          return (
            <Marker
              key={marker.id}
              position={position}
              defaultAnimation={4}
              onClick={() => props.toggleInfoWindow(marker)}
              icon={
                marker.id === props.selectedJob.id
                  ? markerSelected
                  : markerUnselected
              }
            >
              {!props.desktop && marker.id === props.selectedJob.id && (
                <OverlayView
                  position={{ lat: position.lat, lng: position.lng }}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                  getPixelPositionOffset={getPixelPositionOffset}
                >
                  <JobMapWindow
                    marker={marker}
                    markers={props.markers}
                    closeMapWindow={() => props.toggleInfoWindow(marker)}
                  />
                </OverlayView>
              )}
            </Marker>
          )
        })}
      </MarkerClusterer>
    )}
  </GoogleMap>
))

class JobMap extends React.Component {
  render() {
    const {
      markers,
      selectedJob,
      processedList,
      toggleInfoWindow,
      desktop
    } = this.props

    return (
      <MyMapComponent
        markers={markers}
        selectedJob={selectedJob}
        processedList={processedList}
        toggleInfoWindow={toggleInfoWindow}
        desktop={desktop}
      />
    )
  }
}

export default JobMap
