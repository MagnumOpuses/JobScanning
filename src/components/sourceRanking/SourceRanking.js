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
              {item.score}
              <p
                style={{
                  display: 'inline-block',
                  fontSize: '1.375rem',
                  margin: '6px 0 0 0'
                }}
              >
                st
              </p>
            </Score>
          </ListItem>
        ))}
      </OrderedList>
    </div>
  )
}

export default SourceRanking

const ListItem = styled.li`
  height: 5rem;
  display: grid;
  grid-template-columns: 120px 1fr;
  grid-column-gap: 25px;
  align-items: center;
`

const Score = styled.span`
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.white};
  font-size: ${props => props.theme.fontSizeLarge};
  font-weight: 600;
`

const OrderedList = styled.ol`
  list-style: none;

  & li {
    margin-top: 1rem;

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
