import React from 'react'
import { connect } from 'react-redux'
import ResultStats from './ResultStats'

class ResultStatsContainer extends React.Component {
  getNumberOfSources = () => {
    const { hits } = this.props

    const allSources = []

    console.log(hits)

    hits.forEach(job => {
      if (job.sources) {
        job.sources.forEach(source => {
          allSources.push(source.name)
        })
      }
    })

    return [...new Set(allSources)].length
  }

  render() {
    const { total, processedList, searchTerm, location, desktop } = this.props

    return (
      <ResultStats
        total={total}
        processedList={processedList}
        sources={this.getNumberOfSources()}
        searchTerm={searchTerm}
        location={location}
        desktop={desktop}
      />
    )
  }
}

function mapStateToProps({ ads }) {
  const { hits, total, processedList, searchTerm, location } = ads

  return {
    hits,
    total,
    processedList,
    searchTerm,
    location
  }
}

export default connect(mapStateToProps)(ResultStatsContainer)
