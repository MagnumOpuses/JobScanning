import React from 'react'
import styled from 'styled-components'
import breakpoints from '../../styles/breakpoints'

const EnrichmentRanking = ({ hits, searchTerm, topCompetences, topTraits }) => {
  return (
    <EnrichmentRankingContainer>
      <div className="card-box-shadow competences">
        <h2>
          Topp <span className="bold">{topCompetences.length}</span> mest
          eftersökta kompetenser i annonser för{' '}
          <span className="bold">{searchTerm}</span>.
        </h2>
        <p>I {hits.length} annonser efterfrågas</p>

        <ol>
          {topCompetences.map(competence => (
            <li key={competence.keyword}>
              <span className="keyword">{competence.keyword}</span>{' '}
              {competence.score} gånger
            </li>
          ))}
        </ol>
      </div>
      <div className="card-box-shadow traits">
        <h2>
          Topp <span className="bold">{topTraits.length}</span> mest eftersökta
          förmågor i annonser för <span className="bold">{searchTerm}</span>.
        </h2>
        <p>I {hits.length} annonser efterfrågas</p>

        <ol>
          {topTraits.map(trait => (
            <li key={trait.keyword}>
              <span className="keyword">{trait.keyword}</span> {trait.score}{' '}
              gånger
            </li>
          ))}
        </ol>
      </div>
    </EnrichmentRankingContainer>
  )
}

export default EnrichmentRanking

const EnrichmentRankingContainer = styled.div`
  display: flex;
  margin: 50px 0;

  @media (max-width: ${breakpoints.tablet}) {
    display: block;
  }

  h2 {
    font-size: 20px;
  }

  .competences {
    margin: 0 10px 0 0;

    @media (max-width: ${breakpoints.tablet}) {
      margin: 0 0 20px 0;
    }
  }

  .traits {
    margin: 0 0 0 10px;

    @media (max-width: ${breakpoints.tablet}) {
      margin: 0 0 0 0;
    }
  }

  ol {
    list-style: none;

    li {
      display: flex;
      justify-content: space-between;
      font-size: 2rem;

      &:not(:last-child) {
        margin: 0 0 20px 0;
      }

      .keyword {
        text-transform: capitalize;

        &:before {
          content: '•';
          display: inline-block;
          width: 1em; /* Also needed for space (tweak if needed) */
          font-weight: bold;
          color: #02decc;
        }
      }
    }
  }
`
