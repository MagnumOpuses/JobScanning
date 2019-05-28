import React, { Component } from 'react';
import { connect } from 'react-redux';
import EnrichmentRanking from './EnrichmentRanking';

class SkillsRankingContainer extends Component {
  render() {
    const { hits, usedSearchTerm, topCompetences } = this.props;

    if (!hits.length > 0) {
      return null;
    }

    return (
      <EnrichmentRanking
        hits={hits}
        usedSearchTerm={usedSearchTerm}
        target={topCompetences}
        targetName={'kompetenser'}
      />
    );
  }
}

function mapStateToProps({ ads }) {
  const { hits, usedSearchTerm, topCompetences } = ads;

  return { hits, usedSearchTerm, topCompetences };
}

export default connect(
  mapStateToProps,
  null
)(SkillsRankingContainer);
