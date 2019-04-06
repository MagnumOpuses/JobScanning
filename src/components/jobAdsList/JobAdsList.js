import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMoreJobs } from '../../redux/actions'
import { withRouter } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { CustomLoader, NoResultsBox } from '..'
import TestListItem from './ListItem'
import './JobAdsList.scss'

class JobAdsList extends Component {
  state = {
    items: [],
    offset: 0
  }

  componentDidUpdate() {
    if (this.props.isFetching && this.state.offset !== 0) {
      this.setState({ offset: 0 })
    }
  }

  calculateInfiniteScrollHeight = () => {
    const { processedList } = this.props
    const height = processedList.length * 20 - 5
    return height > 100 ? '100%' : `${height}%`
  }

  fetchMoreData = () => {
    this.setState(prevState => ({
      offset: prevState.offset + 20
    }))

    this.props.fetchMoreJobs(
      this.props.searchTerm,
      this.props.location,
      this.state.offset
    )
  }

  render() {
    const {
      isFetching,
      error,
      hits,
      hasMore,
      processedList,
      selectedJob
    } = this.props

    if (isFetching) {
      return <CustomLoader size="massive" content="Laddar" />
    } else if (error || Object.keys(hits).length === 0) {
      return <NoResultsBox />
    } else {
      return (
        <ul
          id="scrollableDiv"
          style={{ height: this.calculateInfiniteScrollHeight() }}
        >
          <InfiniteScroll
            dataLength={processedList.length}
            next={this.fetchMoreData}
            hasMore={hasMore}
            style={{ overflow: 'visible' }}
            scrollableTarget="scrollableDiv"
            scrollThreshold={0.9}
            loader={
              <div
                style={{
                  position: 'relative',
                  marginTop: '5rem'
                }}
              >
                <CustomLoader size="big" content="Hämtar fler" />
              </div>
            }
            endMessage={
              <div
                style={{
                  position: 'relative',
                  marginTop: '5rem'
                }}
              >
                <p>Inga fler annonser att visa.</p>
              </div>
            }
          >
            {processedList.map((item, i) => (
              <TestListItem
                key={item.id}
                item={item}
                selectAd={this.props.selectAd}
                selectedJob={selectedJob}
              />
            ))}
          </InfiniteScroll>
        </ul>
      )
    }
  }
}

function mapStateToProps({ ads }) {
  const {
    isFetching,
    error,
    hits,
    hasMore,
    processedList,
    selectedJob,
    searchTerm,
    location
  } = ads

  return {
    isFetching,
    error,
    hits,
    hasMore,
    processedList,
    selectedJob,
    searchTerm,
    location
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    { fetchMoreJobs }
  )(JobAdsList)
)
