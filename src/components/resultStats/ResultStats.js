import React from 'react'
import styled from 'styled-components'
import breakpoints from '../../styles/breakpoints'

const ResultStats = ({ total, processedList, sources }) => {
  return (
    <>
      <P>
        Visar{' '}
        <span className="bold">{processedList ? processedList.length : 0}</span>{' '}
        av {total ? total.toLocaleString('se-SV') : 0} jobbannonser från
        {'\n'}
        <span className="bold">{sources}</span> webbplatser.{'\n'}
      </P>
    </>
  )
}

export default ResultStats

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
