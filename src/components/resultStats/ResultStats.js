import React from 'react'
import styled from 'styled-components'

const ResultStats = ({ total, processedList, sources }) => {
  return (
    <p
      style={{
        margin: '0',
        alignSelf: 'center',
        textAlign: 'center',
        padding: '2rem 0',
        fontSize: '20px',
        whiteSpace: 'pre-line'
      }}
    >
      Visar <BoldText>{processedList ? processedList.length : 0}</BoldText> av{' '}
      {total ? total : 0} möjliga jobbannonser från{'\n'}
      <BoldText>{sources}</BoldText> rekryteringssajter. Scrolla ner för att se
      fler.
    </p>
  )
}

export default ResultStats

const BoldText = styled.span`
  font-size: ${props => props.theme.fontSizeLarge};
  font-weight: bold;
`
