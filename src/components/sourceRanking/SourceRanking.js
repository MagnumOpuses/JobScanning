import React from 'react'
import styled from 'styled-components'
import getLogo from '../../utils/getLogo'

const SourceRanking = ({ numberOfSources, scoreboard, searchTerm }) => {
  return (
    <div style={{ padding: '1.5rem' }}>
      <p>
        Topp {numberOfSources ? numberOfSources : 0} webbplatser för dig som
        letar efter annonser för {searchTerm}
      </p>
      <OrderedList>
        {scoreboard.map(item => (
          <ListItem key={item.source}>
            {getLogo(item.source)}
            <Score className="score">
              <span>{item.score}</span>st
            </Score>
          </ListItem>
        ))}
      </OrderedList>
    </div>
  )
}

export default SourceRanking

const OrderedList = styled.ol`
  list-style: none;

  & li {
    :nth-child(3n + 1) .score {
      background: ${props => props.theme.primary};
    }

    :nth-child(3n - 1) .score {
      background: ${props => props.theme.green4};
    }

    :nth-child(3n) .score {
      background: ${props => props.theme.green2};
    }
  }
`

const ListItem = styled.li`
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`

const Score = styled.span`
  min-height: 6rem;
  min-width: 6rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.white};
  font-size: ${props => props.theme.fontSizeLarge};
  font-weight: 700;
`
