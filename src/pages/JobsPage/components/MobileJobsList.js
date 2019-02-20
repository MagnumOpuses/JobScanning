import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMoreJobs, selectJob } from '../../../redux/actions'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import distanceInWordsStrict from 'date-fns/distance_in_words_strict'
import format from 'date-fns/format'
import sv from 'date-fns/locale/sv'
import InfiniteScroll from 'react-infinite-scroll-component'
import { CustomLoader, LogoPlaceholder } from '../../../components'

class MobileJobsList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      offset: 0
    }
    this.listRef = React.createRef()
  }

  handleScroll = () => {
    this.props.handleScroll(this.listRef)
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  componentDidUpdate() {
    if (this.props.isFetching && this.state.offset !== 0) {
      this.setState({ offset: 0 })
    }
  }

  calculateInfiniteScrollHeight = () => {
    const { processedList } = this.props
    const height = (processedList.length - 1) * 17
    return height > 90 ? '100vh' : `${height}vh`
  }

  redirectToAdPage = job => {
    this.props.selectJob(job)
    this.props.history.push(`/jobs/${job.id}`)
  }

  fetchMoreData = () => {
    this.setState(prevState => ({
      offset: prevState.offset + 10
    }))

    this.props.fetchMoreJobs(
      this.props.searchTerm,
      this.props.location,
      this.state.offset
    )
  }

  render() {
    const { processedList } = this.props

    return (
      <List
        id="scrollableDiv"
        style={{
          height: this.calculateInfiniteScrollHeight(),
          paddingTop: '269px'
        }}
        ref={this.listRef}
        onScroll={this.handleScroll}
      >
        <InfiniteScroll
          dataLength={processedList.length}
          next={this.fetchMoreData}
          hasMore={true}
          style={{ overflow: 'visible', wordBreak: 'break-word' }}
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
            <ListItem key={i} onClick={() => this.redirectToAdPage(item)}>
              <ItemInfo>
                <LogoPlaceholder employer={item.employer} />
                <div style={{ flex: '1  ', fontSize: '18px' }}>
                  <ItemTitle>{item.header}</ItemTitle>
                  <P>
                    {item.employer.name ? item.employer.name : ''} &bull;{' '}
                    {item.location ? item.location : ''}
                  </P>
                </div>

                {/* <ItemDeadline>
                      {item.application.deadline
                        ? distanceInWordsStrict(
                            Date.now(),
                            item.application.deadline,
                            {
                              addSuffix: true,
                              locale: sv
                            }
                          )
                        : 'Se annonsen för datum'}
                    </ItemDeadline> */}

                {/* <p>
                    Inlagd:{' '}
                    {format(item.source.firstSeenAt, 'YYYY-MM-DD HH:mm')}
                  </p> */}
              </ItemInfo>
            </ListItem>
          ))}
        </InfiniteScroll>
      </List>
    )
  }
}

function mapStateToProps({ ads }) {
  const { isFetching, hits, processedList, searchTerm, location } = ads

  return {
    isFetching,
    hits,
    processedList,
    searchTerm,
    location
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    { fetchMoreJobs, selectJob }
  )(MobileJobsList)
)

const List = styled.ul`
  height: 100%;
  width: 100%;
  overflow: auto;
  display: grid;
`

const ListItem = styled.li`
  list-style: none;
  border-bottom: 2px solid ${props => props.theme.green4};
  padding: 1.5rem 1rem;
`

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
`

const ItemTitle = styled.h2`
  font-size: 18px;
`

const ItemDeadline = styled.p`
  justify-self: end;
  align-self: end;
  padding: 1rem;
`

const P = styled.p`
  font-size: 18px;
`
