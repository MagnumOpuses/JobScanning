import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMoreJobs } from '../../redux/actions'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroll-component'
import { CustomLoader, LogoPlaceholder, NoResultsBox } from '../../components'

class JobsList extends Component {
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
    const { isFetching, error, hits, processedList, selectedJob } = this.props

    if (isFetching) {
      return <CustomLoader size="massive" content="Laddar" />
    } else if (error || Object.keys(hits).length === 0) {
      return <NoResultsBox />
    } else {
      return (
        <List
          id="scrollableDiv"
          style={{ height: this.calculateInfiniteScrollHeight() }}
        >
          <InfiniteScroll
            dataLength={processedList.length}
            next={this.fetchMoreData}
            hasMore={true}
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
          >
            {processedList.map((item, i) => (
              <ListItem
                key={i}
                onClick={() => {
                  this.props.selectAd(item)
                }}
                selected={item.id === selectedJob.id}
              >
                <ItemInfo>
                  <LogoPlaceholder employer={item.employer} />
                  <div style={{ flex: '1', fontSize: '18px' }}>
                    <ItemTitle>{item.header}</ItemTitle>
                    <P>
                      {item.employer.name ? item.employer.name : ''}
                      {item.employer.name && item.location ? (
                        <span> &bull; </span>
                      ) : (
                        ' '
                      )}
                      {item.location ? item.location : ''}
                    </P>
                  </div>
                </ItemInfo>
              </ListItem>
            ))}
          </InfiniteScroll>
        </List>
      )
    }
  }
}

function mapStateToProps({ ads }) {
  const {
    isFetching,
    error,
    hits,
    processedList,
    selectedJob,
    searchTerm,
    location
  } = ads

  return {
    isFetching,
    error,
    hits,
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
  )(JobsList)
)

const List = styled.ul`
  width: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    /* width: 20px !important; */
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    box-shadow: none !important;
    border-radius: 10px !important;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.green4} !important;
    border-radius: 10px !important;
  }
`

const ListItem = styled.li`
  position: relative;
  padding: 2rem 0 2rem 1rem;
  transition: all 0.2s;
  background: ${props =>
    props.selected
      ? `linear-gradient(165deg, rgba(0,0,0,0) 70%, ${props.theme.green3} 100%)`
      : 'none'};

  &:hover {
    transform: translateY(-2px);
    background: ${props =>
      props.selected
        ? `#eee linear-gradient(165deg, rgba(0,0,0,0) 70%, ${
            props.theme.green3
          } 100%)`
        : '#eee'};
    box-shadow: ${props => `0 3px 3px ${props.theme.green3}`};
  }
`

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
`

const ItemTitle = styled.h3`
  font-size: 18px;
`

const P = styled.p`
  font-size: 18px;
`
