import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SourceRanking, EnrichmentRanking } from '../../../../components/index'

class DesktopOverview extends Component {
  render() {
    const { searchTerm, location } = this.props
    return (
      <>
        <header style={{ height: '100px' }}>
          <h1 style={{ fontSize: '32px' }}>ÖVERSIKT</h1>
        </header>
        <h3
          style={{
            margin: '2rem 0 4rem 0',
            fontWeight: '500',
            whiteSpace: 'pre-line'
          }}
        >
          Du har sökt på{'\n'}
          <span style={{ fontWeight: '700' }}>{searchTerm}</span> i{' '}
          <span style={{ fontWeight: '700' }}>
            {location.text ? location.text : 'hela Sverige'}
          </span>
        </h3>
        <div>
          <SourceRanking />
          <EnrichmentRanking />
        </div>
      </>
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

export default connect(
  mapStateToProps,
  null
)(DesktopOverview)
