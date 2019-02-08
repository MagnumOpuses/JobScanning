import React, { Component } from 'react'
import { connect } from 'react-redux'

import TextEnrichment from './TextEnrichment'

class TextEnrichmentContainer extends Component {
  sortEnrichment = list => {
    return list
      .sort((a, b) => {
        return a.prediction - b.prediction
      })
      .slice(-4)
  }

  render() {
    const { selectedJob } = this.props

    return (
      <TextEnrichment
        competencies={this.sortEnrichment(
          selectedJob.enrichment.data.enriched_candidates.competencies
        )}
        traits={this.sortEnrichment(
          selectedJob.enrichment.data.enriched_candidates.traits
        )}
      />
    )
  }
}

function mapStateToProps({ ads }) {
  const { selectedJob } = ads

  return {
    selectedJob
  }
}

export default connect(
  mapStateToProps,
  null
)(TextEnrichmentContainer)
