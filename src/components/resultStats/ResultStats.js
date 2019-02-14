import React from 'react'
import styled from 'styled-components'
import breakpoints from '../../styles/breakpoints'

const ResultStats = ({ total, processedList, sources }) => {
  return (
    <P>
      Visar <BoldText>{processedList ? processedList.length : 0}</BoldText> av{' '}
      {total ? total : 0} möjliga jobbannonser från{'\n'}
      <BoldText>{sources}</BoldText> rekryteringssajter.{'\n'}
      Scrolla ner för att se fler.
    </P>
  )
}

export default ResultStats

const BoldText = styled.span`
  font-size: ${props => props.theme.fontSizeLarge};
  font-weight: bold;
`

const P = styled.p`
  margin: 0;
  padding: 2rem 0;
  align-self: center;
  text-align: center;
  font-size: 20px;
  white-space: pre-line;

  @media screen and (max-width: ${breakpoints.tablet}) {
    padding: 1rem 0rem;
    white-space: normal;
  }
`
