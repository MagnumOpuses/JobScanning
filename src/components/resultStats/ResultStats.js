import React from 'react'
import styled from 'styled-components'
import { DisplayNumber } from '../../components'

const ResultStats = ({ total, processedList, sources }) => {
  return (
    <p
      style={{
        margin: '0',
        alignSelf: 'center',
        textAlign: 'center',
        padding: '1rem 0'
      }}
    >
      <BoldText>{processedList ? processedList.length : 0}</BoldText> (
      {total ? total : 0}) jobbannonser från <BoldText>{sources}</BoldText>{' '}
      rekryteringssajter
    </p>
  )
}

export default ResultStats

const BoldText = styled.span`
  font-size: ${props => props.theme.fontSizeLarge};
  font-weight: bold;
`
