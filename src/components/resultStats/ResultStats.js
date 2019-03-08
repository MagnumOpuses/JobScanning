import React from 'react'
import styled from 'styled-components'
import breakpoints from '../../styles/breakpoints'

const ResultStats = ({ total, processedList, sources }) => {
  return (
    <>
      <P>
        Visar <BoldText>{processedList ? processedList.length : 0}</BoldText> av{' '}
        {total ? total.toLocaleString('se-SV') : 0} jobbannonser från
        {'\n'}
        <BoldText>{sources}</BoldText> webbplatser.{'\n'}
      </P>
    </>
  )
}

export default ResultStats

const BoldText = styled.span`
  font-size: ${props => props.theme.fontSizeLarge};
  font-weight: bold;
`

const P = styled.p`
  margin: 0;
  padding: 0 0 2rem;
  align-self: center;
  text-align: center;
  font-size: 20px;
  white-space: pre-line;

  @media screen and (max-width: ${breakpoints.tablet}) {
    padding: 1rem;
  }
`
