import React, { Component } from 'react';
import { connect } from 'react-redux';
import EnrichmentRanking from './EnrichmentRanking';

class TraitsRankingContainer extends Component {
  render() {
    const { hits, usedSearchTerm, topTraits } = this.props;

    if (!hits.length > 0) {
      return null;
    }

    return (
      <EnrichmentRanking
        hits={hits}
        usedSearchTerm={usedSearchTerm}
        target={topTraits}
        targetName={'förmågor'}
      />
    );
  }
}

function mapStateToProps({ ads }) {
  const { hits, usedSearchTerm, topTraits } = ads;

  return { hits, usedSearchTerm, topTraits };
}

export default connect(
  mapStateToProps,
  null
)(TraitsRankingContainer);
