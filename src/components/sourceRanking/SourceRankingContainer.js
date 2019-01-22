import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CustomLoader, NoResultsBox } from '../../components'
import numberOfUniqueSources from '../../utils/numberOfUniqueSources'
import SourceRanking from './SourceRanking'

class SourceRankingContainer extends Component {
  getNumberOfSources = () => {
    let { hits } = this.props
    return numberOfUniqueSources(hits)
  }

  render() {
    let { hits, isFetching, error, searchTerm, scoreboard } = this.props

    if (isFetching) {
      return <CustomLoader size="massive" content="Laddar" />
    } else if (error) {
      return <NoResultsBox />
    } else if (Object.keys(hits).length === 0) {
      return <NoResultsBox />
    } else {
      return (
        <SourceRanking
          numberOfSources={this.getNumberOfSources()}
          scoreboard={scoreboard}
          searchTerm={searchTerm}
        />
      )
    }
  }
}

function mapStateToProps({ ads }) {
  const { hits, error, isFetching, searchTerm, scoreboard } = ads

  return {
    hits,
    error,
    isFetching,
    searchTerm,
    scoreboard
  }
}

export default connect(
  mapStateToProps,
  null
)(SourceRankingContainer)
