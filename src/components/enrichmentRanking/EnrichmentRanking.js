import React from 'react'
import styled from 'styled-components'

const EnrichmentRanking = ({ hits, searchTerm, topCompetences, topTraits }) => {
  return (
    <div>
      <div>
        <H2>
          Topp <span className="bold">{topCompetences.length}</span> mest
          eftersökta kompetenser i annonser för{' '}
          <span className="bold">{searchTerm}</span>.
        </H2>
        <p>I {hits.length} annonser efterfrågas</p>

        <OrderedList>
          {topCompetences.map(competence => (
            <li key={competence.keyword}>
              <span className="keyword">{competence.keyword}</span>{' '}
              {competence.score} gånger
            </li>
          ))}
        </OrderedList>
      </div>
      <div style={{ margin: '5rem 0' }}>
        <H2>
          Topp <span className="bold">{topTraits.length}</span> mest eftersökta
          förmågor i annonser för <span className="bold">{searchTerm}</span>.
        </H2>
        <p>I {hits.length} annonser efterfrågas</p>

        <OrderedList>
          {topTraits.map(trait => (
            <li key={trait.keyword}>
              <span className="keyword">{trait.keyword}</span> {trait.score}{' '}
              gånger
            </li>
          ))}
        </OrderedList>
      </div>
    </div>
  )
}
// ({Math.ceil((competence.score / hits.length) * 100)}%)
// ({Math.ceil((trait.score / hits.length) * 100)}%)

export default EnrichmentRanking

const OrderedList = styled.ol`
  list-style: none;

  li {
    display: flex;
    justify-content: space-between;
    font-size: 2rem;

    &:not(:last-child) {
      margin-bottom: 2rem;
    }

    .keyword:before {
      content: '•';
      display: inline-block;
      width: 1em; /* Also needed for space (tweak if needed) */
      font-weight: bold;
      color: ${props => props.theme.green4};
    }

    .keyword {
      text-transform: capitalize;
      margin-right: 10rem;

      @media screen and (max-width: ${({ theme }) =>
          theme.breakpoints.tablet}) {
        margin-right: 0;
      }
    }
  }
`

const H2 = styled.h2`
  font-size: 2rem;
`
