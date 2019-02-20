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
    const { selectedJob, mobile } = this.props

    return (
      <>
        {selectedJob.enrichment.data.enriched_candidates.competencies.length >
          0 && (
          <TextEnrichment
            header="Eftertraktade kompetenser"
            list={this.sortEnrichment(
              selectedJob.enrichment.data.enriched_candidates.competencies
            )}
            icon="briefcase"
            mobile={mobile}
          />
        )}
        {selectedJob.enrichment.data.enriched_candidates.traits.length > 0 && (
          <TextEnrichment
            header="Eftertraktade förmågor"
            list={this.sortEnrichment(
              selectedJob.enrichment.data.enriched_candidates.traits
            )}
            icon="user"
            mobile={mobile}
          />
        )}
      </>
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
