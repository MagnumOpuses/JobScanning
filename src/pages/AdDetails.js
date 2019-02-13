import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import _ from 'lodash'
import {
  NoResultsBox,
  PageHeader,
  GridContainer,
  SubHeader,
  Title,
  InfoContainer,
  DescriptionContainer
} from '../components'

class AdDetails extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  getAdDetails = groupId => {
    let { hits, processedList } = this.props

    let duplicatedGroupId = _.filter(hits, item => {
      return item.id === groupId
    })

    if (!processedList.length > 0) {
      return <NoResultsBox adDetails />
    } else {
      let {
        application,
        employer,
        location,
        content,
        source,
        header
      } = duplicatedGroupId[0]
      return (
        <GridContainer>
          {/* <SubHeader
            siteName={
              duplicatedGroupId.length > 1 ? 'Se nedan' : source.site.name
            }
          /> */}

          <Title employer={employer} adHeader={header} />

          <InfoContainer
            location={location ? location : false}
            // firstSeenAt={source.firstSeenAt}
            deadline={application.deadline}
          />
          <StyledDiv>
            <DescriptionContainer text={content} source={duplicatedGroupId} />
          </StyledDiv>
        </GridContainer>
      )
    }
  }

  render() {
    return (
      <GridContainer rows={'85px 1fr'}>
        <PageHeader ads />
        {this.getAdDetails(this.props.match.params.id)}
      </GridContainer>
    )
  }
}

function mapStateToProps({ ads }) {
  const { hits, processedList } = ads
  return {
    hits,
    processedList
  }
}

export default connect(
  mapStateToProps,
  null
)(AdDetails)

const StyledDiv = styled.div`
  padding: 3rem 1rem;
  box-shadow: 0 -0.3rem 0.5rem rgba(0, 0, 0, 0.5);
`
