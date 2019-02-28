import React, { Component } from 'react'
import { connect } from 'react-redux'
import EnrichmentRanking from './EnrichmentRanking'

class EnrichmentRankingContainer extends Component {
  render() {
    const { hits, searchTerm, topCompetences, topTraits } = this.props

    return (
      <EnrichmentRanking
        hits={hits}
        searchTerm={searchTerm}
        topCompetences={topCompetences}
        topTraits={topTraits}
      />
    )
  }
}

function mapStateToProps({ ads }) {
  const { hits, searchTerm, topCompetences, topTraits } = ads

  return { hits, searchTerm, topCompetences, topTraits }
}

export default connect(
  mapStateToProps,
  null
)(EnrichmentRankingContainer)
