import React, { Component } from 'react';
import { connect } from 'react-redux';
import numberOfUniqueSources from '../../utils/numberOfUniqueSources';
import SourceRanking from './SourceRanking';

class SourceRankingContainer extends Component {
  getNumberOfSources = () => {
    let { hits } = this.props;
    return numberOfUniqueSources(hits);
  };

  render() {
    const { usedSearchTerm, scoreboard } = this.props;

    return (
      <>
        {scoreboard && (
          <SourceRanking
            numberOfSources={this.getNumberOfSources()}
            scoreboard={scoreboard}
            usedSearchTerm={usedSearchTerm}
          />
        )}
      </>
    );
  }
}

function mapStateToProps({ ads }) {
  const { hits, usedSearchTerm, scoreboard } = ads;

  return {
    hits,
    usedSearchTerm,
    scoreboard
  };
}

export default connect(
  mapStateToProps,
  null
)(SourceRankingContainer);
