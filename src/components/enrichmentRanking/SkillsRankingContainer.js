import React, { Component } from 'react';
import { connect } from 'react-redux';
import EnrichmentRanking from './EnrichmentRanking';

class SkillsRankingContainer extends Component {
  render() {
    const { hits, searchTerm, topCompetences } = this.props;

    if (!hits.length > 0) {
      return null;
    }

    return (
      <EnrichmentRanking
        hits={hits}
        searchTerm={searchTerm}
        target={topCompetences}
        targetName={'kompetenser'}
      />
    );
  }
}

function mapStateToProps({ ads }) {
  const { hits, searchTerm, topCompetences } = ads;

  return { hits, searchTerm, topCompetences };
}

export default connect(
  mapStateToProps,
  null
)(SkillsRankingContainer);
