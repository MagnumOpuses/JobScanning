import React, { Component } from 'react'
import styled from 'styled-components'
import { BoldText, GridContainer, PageHeader, SearchForm } from '../components'
import breakpoints from '../styles/breakpoints'
// import SearchForm from '../containers/SearchForm'

class SearchPage extends Component {
  render() {
    return (
      <GridContainer rows={'85px 6% 1fr'} gap={true} center={true}>
        {/* <FlexContainer> */}
        <PageHeader>
          <h1>Alla jobb på ett ställe</h1>
        </PageHeader>

        <P>
          <BoldText>294 293</BoldText> jobb från <BoldText>1009</BoldText>{' '}
          jobbsajter
        </P>

        <SearchForm upward={true} />
        {/* </FlexContainer> */}
      </GridContainer>
    )
  }
}

export default SearchPage

const P = styled.p`
  font-size: 24px;

  @media screen and (max-width: ${breakpoints.tablet}) {
    font-size: 24px;
  }

  @media screen and (max-width: ${breakpoints.mobileLandscape}) {
    font-size: 20px;
  }
`

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`
