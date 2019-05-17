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
    const { searchTerm, scoreboard } = this.props;

    return (
      <>
        {scoreboard && (
          <SourceRanking
            numberOfSources={this.getNumberOfSources()}
            scoreboard={scoreboard}
            searchTerm={searchTerm}
          />
        )}
      </>
    );
  }
}

function mapStateToProps({ ads }) {
  const { hits, searchTerm, scoreboard } = ads;

  return {
    hits,
    searchTerm,
    scoreboard
  };
}

export default connect(
  mapStateToProps,
  null
)(SourceRankingContainer);
