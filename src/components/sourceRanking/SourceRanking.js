import React from 'react'
import getLogo from '../../utils/getLogo'
import './SourceRanking.scss'

const SourceRanking = ({ numberOfSources, scoreboard, searchTerm }) => {
  return (
    <div className="SourceRanking card-box-shadow">
      <p>
        Topp{' '}
        <span className="bold">{numberOfSources ? numberOfSources : 0}</span>{' '}
        webbplatser för dig som letar efter annonser för{' '}
        <span className="bold">{searchTerm}</span>
      </p>
      <ol>
        {scoreboard.map(item => (
          <li key={item.source}>
            {getLogo(item.source)}
            <span className="score">
              <span>{item.score}</span>st
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default SourceRanking
