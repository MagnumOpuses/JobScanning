/* eslint-disable no-undef */
import React, { Component } from 'react'
import { Polygon } from 'react-google-maps'
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel'

export default class CustomPolygon extends Component {
  state = { hover: false }

  getFillColor = number => {
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

  render() {
    const {
      placeCode,
      placeName,
      placePaths,
      googleMapsConfig,
      numberOfJobsInPlace,
      handleClickedCounty,
      handleClickedMunicipality
    } = this.props
    const { hover } = this.state

    console.log(this.props)

    return (
      <div>
        <Polygon
          paths={placePaths}
          onClick={() =>
            handleClickedCounty
              ? handleClickedCounty(placeCode, placeName, googleMapsConfig)
              : handleClickedMunicipality(placeName)
          }
          visible={true}
          options={{
            strokeColor: '#fff',
            strokeWeight: hover ? 4 : 1.5,
            fillColor: this.getFillColor(numberOfJobsInPlace[placeName]),
            fillOpacity: 1
          }}
          onMouseOver={() =>
            this.setState(prevState => ({ hover: !prevState.hover }))
          }
          onMouseOut={() =>
            this.setState(prevState => ({ hover: !prevState.hover }))
          }
        />
        <MarkerWithLabel
          position={
            new google.maps.LatLng(
              googleMapsConfig.center.lat,
              googleMapsConfig.center.lng
            )
          }
          labelAnchor={new google.maps.Point(7, 10)}
          labelStyle={{
            color: '#eee',
            fontSize: '22px',
            fontWeight: 'bolder',
            textShadow:
              '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
          }}
          clickable={false}
          opacity={0}
        >
          <div>{numberOfJobsInPlace[placeName]}</div>
        </MarkerWithLabel>
      </div>
    )
  }
}
