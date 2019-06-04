import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchMoreJobs } from '../../redux/actions';
import { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CustomLoader, NoResultsBox } from '..';
import ListItem from './ListItem';

class JobList extends Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  fetchMoreData = () => {
    this.props.fetchMoreJobs(
      this.props.searchTerm,
      this.props.location,
      this.props.offset + 20
    );
  };

  handleScroll = () => {
    this.props.handleScroll(this.listRef);
  };

  render() {
    const { isFetching, error, hits, hasMore, selectedJob } = this.props;

    if (isFetching) {
      return <CustomLoader size="massive" content="Laddar" />;
    } else if (error || Object.keys(hits).length === 0) {
      return <NoResultsBox />;
    } else {
      return (
        <List
          id="scrollableDiv"
          ref={this.listRef}
          // onScroll={this.handleScroll}
          style={{ height: 'calc(100% - 68px)' }}
        >
          <InfiniteScroll
            dataLength={hits.length}
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
            {hits.map((item, i) => {
              if (item.changedLocation) {
                return (
                  <li
                    key={i}
                    style={{
                      padding: '20px 10px',
                      textAlign: 'center',
                      background: '#fff'
                    }}
                  >
                    <p>Slut på annonser i {item.oldLocation}.</p>
                    <p>Visar annonser i {item.newLocation}</p>
                  </li>
                );
              }
              return (
                <ListItem
                  key={item.id}
                  job={item}
                  selectOrUnselectJob={this.props.selectOrUnselectJob}
                  selectedJob={selectedJob}
                />
              );
            })}
          </InfiniteScroll>
        </List>
      );
    }
  }
}

function mapStateToProps({ ads }) {
  const {
    isFetching,
    error,
    hits,
    hasMore,
    selectedJob,
    searchTerm,
    location,
    offset
  } = ads;

  return {
    isFetching,
    error,
    hits,
    hasMore,
    selectedJob,
    searchTerm,
    location,
    offset
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { fetchMoreJobs }
  )(JobList)
);

const List = styled.ul`
  width: 100%;
  overflow: auto;
  list-style: none;
  background: #fff;

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    box-shadow: none !important;
    border-radius: 10px !important;
  }

  &::-webkit-scrollbar-thumb {
    background: #02decc !important;
    border-radius: 10px !important;
  }
`;
