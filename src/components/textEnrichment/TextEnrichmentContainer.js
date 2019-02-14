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
    const list1 = ['ReactJS', 'SQL', 'NodeJS', 'Redux']
    const list2 = ['Trevlig', 'Effektiv', 'Självgående', 'Social']
    return (
      <div style={{ display: 'flex' }}>
        <TextEnrichment list={list1} icon="briefcase" />
        <TextEnrichment list={list2} icon="user" />
        {/* <TextEnrichment
          list={selectedJob.enrichment.data.enriched_candidates.competencies}
          icon="briefcase"
        />
        <TextEnrichment
          list={selectedJob.enrichment.data.enriched_candidates.traits}
          icon="user"
        /> */}
      </div>
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
