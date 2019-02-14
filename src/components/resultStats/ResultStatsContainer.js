import React from 'react'
import { connect } from 'react-redux'
import ResultStats from './ResultStats'

class ResultStatsContainer extends React.Component {
  getNumberOfSources = () => {
    const { hits } = this.props

    const allSources = []

    hits.forEach(obj => {
      obj.sources.forEach(source => {
        allSources.push(source.name)
      })
    })

    return [...new Set(allSources)].length
  }

  render() {
    const { total, processedList } = this.props

    return (
      <ResultStats
        total={total}
        processedList={processedList}
        sources={this.getNumberOfSources()}
      />
    )
  }
}

function mapStateToProps({ ads }) {
  const { hits, total, processedList } = ads

  return {
    hits,
    total,
    processedList
  }
}

export default connect(mapStateToProps)(ResultStatsContainer)
