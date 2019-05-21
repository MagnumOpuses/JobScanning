import React from 'react';
import styled from 'styled-components';
import breakpoints from '../../styles/breakpoints';
import getLogo from '../../utils/getLogo';

const SourceRanking = ({ numberOfSources, scoreboard, searchTerm }) => {
  return (
    <div className="SourceRanking">
      <p>
        Topp{' '}
        <span className="bold">{numberOfSources ? numberOfSources : 0}</span>{' '}
        webbplatser för dig som letar efter annonser för{' '}
        <span className="bold">{searchTerm}</span>
      </p>
      <OrderedList>
        {scoreboard.map(item => (
          <li key={item.source}>
            {getLogo(item.source)}
            <span className="score">
              <span>{item.score}</span>st
            </span>
          </li>
        ))}
      </OrderedList>
    </div>
  );
};

export default SourceRanking;

const OrderedList = styled.ol`
  list-style: none;

  li {
    height: 50px;
    width: 65%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2rem auto 0;

    @media (max-width: ${breakpoints.tablet}) {
      width: 100%;
    }

    .score {
      min-height: 6rem;
      min-width: 6rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 24px;
      font-weight: 700;
    }

    &:nth-child(3n + 1) .score {
      background: #ffeb9e;
    }

    &:nth-child(3n - 1) .score {
      background: #02decc;
    }

    &:nth-child(3n) .score {
      background: #a6f3ed;
    }
  }
`;
