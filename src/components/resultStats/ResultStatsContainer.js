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
    const { processedList, usedSearchTerm, usedLocation } = this.props;

    return (
      <ResultStats
        processedList={processedList}
        sources={this.getNumberOfSources()}
        usedSearchTerm={usedSearchTerm}
        usedLocation={usedLocation}
      />
    );
  }
}

function mapStateToProps({ ads }) {
  const { hits, processedList, usedSearchTerm, usedLocation } = ads;

  return {
    hits,
    processedList,
    usedSearchTerm,
    usedLocation
  };
}

export default connect(mapStateToProps)(ResultStatsContainer);
