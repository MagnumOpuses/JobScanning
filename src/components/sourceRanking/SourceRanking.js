import React from 'react';
import styled from 'styled-components';
import breakpoints from '../../styles/breakpoints';
import getLogo from '../../utils/getLogo';

const SourceRanking = ({ numberOfSources, scoreboard, usedSearchTerm }) => {
  return (
    <SourceRankingContainer>
      <h2>
        Topp{' '}
        <span className="bold">{numberOfSources ? numberOfSources : 0}</span>{' '}
        webbplatser för dig som letar efter annonser för{' '}
        <span className="occupation-name">{usedSearchTerm}</span>.
      </h2>

      <ol>
        {scoreboard.map(item => (
          <li key={item.source}>
            {getLogo(item.source)}
            <span>
              <span>{item.score}</span> st
            </span>
          </li>
        ))}
      </ol>
    </SourceRankingContainer>
  );
};

export default SourceRanking;

const SourceRankingContainer = styled.div`
  h2 {
    font-size: 20px;
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
      align-items: center;
      font-size: 2rem;

      &:not(:last-child) {
        margin: 0 0 20px 0;
      }
    }
  }
`;
