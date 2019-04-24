import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMoreJobs } from '../../redux/actions'
import { withRouter } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { CustomLoader, NoResultsBox } from '..'
import TestListItem from './ListItem'
import './JobAdsList.scss'

class JobAdsList extends Component {
  calculateInfiniteScrollHeight = () => {
    const { processedList } = this.props
    const height = processedList.length * 20 - 5
    return height > 100 ? '100%' : `${height}%`
  }

  fetchMoreData = () => {
    this.props.fetchMoreJobs(
      this.props.searchTerm,
      this.props.location,
      this.props.offset + 20
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
            {processedList.map((item, i) => {
              if (item.newLocation) {
                return <p key={i}>Annonser i {this.props.location.text}</p>
              }
              return (
                <TestListItem
                  key={item.id}
                  item={item}
                  selectAd={this.props.selectAd}
                  selectedJob={selectedJob}
                />
              )
            })}
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
    location,
    offset
  } = ads

  return {
    isFetching,
    error,
    hits,
    hasMore,
    processedList,
    selectedJob,
    searchTerm,
    location,
    offset
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    { fetchMoreJobs }
  )(JobAdsList)
)
