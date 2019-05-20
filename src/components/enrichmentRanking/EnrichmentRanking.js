import React from 'react';
import styled from 'styled-components';
import breakpoints from '../../styles/breakpoints';

const EnrichmentRanking = ({ hits, searchTerm, target }) => {
  return (
    <EnrichmentRankingContainer>
      <h2>
        Topp <span className="bold">{target.length}</span> mest eftersökta
        kompetenser i annonser för <span className="bold">{searchTerm}</span>.
      </h2>
      <p>I {hits.length} annonser efterfrågas</p>

      <ol>
        {target.map(competence => (
          <li key={competence.keyword}>
            <span className="keyword">{competence.keyword}</span>{' '}
            {competence.score} gånger
          </li>
        ))}
      </ol>
    </EnrichmentRankingContainer>
  );
};

export default EnrichmentRanking;

const EnrichmentRankingContainer = styled.div`
  h2 {
    font-size: 18px;
    font-weight: 500;
  }

  .competences {
    margin: 0 10px 0 0;

    @media (max-width: ${breakpoints.tablet}) {
      margin: 0 0 20px 0;
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
`;
