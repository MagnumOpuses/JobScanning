import React from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'

const NoResultsBox = ({ adDetails }) => (
  <NoResultsDiv>
    <FlexDiv>
      <p>{adDetails ? 'Hittade inte annonsen' : 'Hittade inga annonser'}</p>
      <Icon name="dont" size="massive" style={{ margin: '2rem' }} />
      <p>{adDetails ? 'Välj en annan' : 'Kontrollera din sökning'}</p>
    </FlexDiv>
  </NoResultsDiv>
)

export default NoResultsBox

const NoResultsDiv = styled.div`
  position: relative;
`

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10vh;

  & p {
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
  }
`
