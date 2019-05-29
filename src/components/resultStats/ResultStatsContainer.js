import React from 'react';
import { connect } from 'react-redux';
import ResultStats from './ResultStats';

class ResultStatsContainer extends React.Component {
  getNumberOfSources = () => {
    const { hits } = this.props;

    const allSources = [];

    hits.forEach(job => {
      if (job.sources) {
        job.sources.forEach(source => {
          allSources.push(source.name);
        });
      }
    });

    return [...new Set(allSources)].length;
  };

  render() {
    const { hits, searchTerm } = this.props;

    return (
      <ResultStats
        hits={hits}
        searchTerm={searchTerm}
        sources={this.getNumberOfSources()}
      />
    );
  }
}

function mapStateToProps({ ads }) {
  const { hits, searchTerm } = ads;

  return {
    hits,
    searchTerm
  };
}

export default connect(mapStateToProps)(ResultStatsContainer);
