import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectJob, unselectJob } from '../../../../redux/actions'
import styled from 'styled-components'
import _ from 'lodash'
import {
  AdsList,
  AdsOverview,
  GridContainer,
  DescriptionContainer,
  JobMap
} from '../../../../components'
import JobDetailsDesktop from './JobDetailsDesktop'
import PageHeaderAds from './PageHeaderAds'

class AdsPage extends Component {
  selectAd = selectedAd => {
    const duplicatedGroupId = _.filter(this.props.hits, item => {
      return item.group.id === selectedAd.group.id
    })

    const selectedJob = { ...selectedAd, duplicatedGroupId }
    this.props.selectJob(selectedJob)

    this.setState({
      selected: true
    })
  }

  render() {
    const { selectedJob } = this.props

    return (
      <GridContainer rows={'100px calc(100vh - 100px)'} center>
        <PageHeaderAds />
        <Content>
          <List>
            <AdsList selectAd={this.selectAd} />
          </List>
          <Ad>
            <Details>
              {Object.keys(selectedJob).length > 0 ? (
                <JobDetailsDesktop selectedAd={selectedJob} />
              ) : (
                <div style={{ height: '40vh' }} />
              )}
            </Details>
            <Text>
              {Object.keys(selectedJob).length > 0 ? (
                <DescriptionContainer
                  text={selectedJob.content.text}
                  source={selectedJob.duplicatedGroupId}
                />
              ) : (
                <div style={{ height: '40vh' }} />
              )}
            </Text>
          </Ad>
          <Ranks>
            <AdsOverview />
          </Ranks>
          <Map>
            <JobMap />
          </Map>
        </Content>
      </GridContainer>
    )
  }
}

function mapStateToProps({ ads }) {
  const { hits, selectedJob } = ads

  return {
    hits,
    selectedJob
  }
}

export default connect(
  mapStateToProps,
  { selectJob, unselectJob }
)(AdsPage)

const Content = styled.div`
  width: 75%;
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 2fr 3fr;
  grid-gap: 7px;
`

const Box = styled.div`
  background: #fff;
  box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.5);
`

const List = styled(Box)`
  grid-row: 1/2;
  grid-column: 1/2;
  overflow: auto;
  height: 75vh;
`

const Ad = styled.div`
  grid-row: 1/2;
  grid-column: 2/3;
  display: grid;
  grid-template-rows: auto auto;
  grid-gap: 7px;
`

const Details = styled(Box)`
  padding: 2rem 4rem 4rem 4rem;
`

const Text = styled(Box)`
  padding: 2rem 4rem 1rem 4rem;
`

const Ranks = styled(Box)``

const Map = styled(Box)``
