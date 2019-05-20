import React, { Component } from 'react';
import { connect } from 'react-redux';
import EnrichmentRanking from './EnrichmentRanking';

class TraitsRankingContainer extends Component {
  render() {
    const { hits, searchTerm, topTraits } = this.props;

    if (!hits.length > 0) {
      return null;
    }

    return (
      <EnrichmentRanking
        hits={hits}
        searchTerm={searchTerm}
        target={topTraits}
        targetName={'FÖRMÅGOR'}
      />
    );
  }
}

function mapStateToProps({ ads }) {
  const { hits, searchTerm, topTraits } = ads;

  return { hits, searchTerm, topTraits };
}

export default connect(
  mapStateToProps,
  null
)(TraitsRankingContainer);
