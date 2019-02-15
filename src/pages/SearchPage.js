import React, { Component } from 'react'
import styled from 'styled-components'
import { BoldText, Ellipse, PageHeader, SearchForm } from '../components'
import theme from '../styles/theme'
import breakpoints from '../styles/breakpoints'

class SearchPage extends Component {
  render() {
    return (
      <FlexContainer>
        <PageHeader>
          <h1>Alla jobb på ett ställe</h1>
        </PageHeader>

        <P>
          <BoldText>294 293</BoldText> jobb från <BoldText>1009</BoldText>{' '}
          jobbsajter
        </P>

        <SearchForm upward={true} />
        {/* </FlexContainer> */}
        <EllipseContainer>
          <Ellipse
            height="220px"
            width="170px"
            bottom="-60px"
            right="-20px"
            bgcolor={`linear-gradient(#fff, ${theme.green4})`}
            zIndex={-2}
          />
          <Ellipse
            height="180px"
            width="140px"
            bottom="-60px"
            right="82px"
            bgcolor={`linear-gradient(#fff, ${theme.green1})`}
            zIndex={-1}
          />
        </EllipseContainer>
      </FlexContainer>
    )
  }
}

export default SearchPage

const P = styled.p`
  font-size: 24px;
  text-align: center;
  margin: 1.5rem 0 10rem 0;

  @media screen and (max-width: ${breakpoints.tablet}) {
    margin: 1.5rem 0 4rem 0;
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

const EllipseContainer = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  height: 220px;
  width: 250px;
  overflow: hidden;
  z-index: -1;
`
