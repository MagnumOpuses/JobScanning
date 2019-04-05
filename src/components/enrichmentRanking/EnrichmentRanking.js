import React from 'react'
import './EnrichmentRanking.scss'

const EnrichmentRanking = ({ hits, searchTerm, topCompetences, topTraits }) => {
  return (
    <div className="EnrichmentRanking">
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
    </div>
  )
}
// ({Math.ceil((competence.score / hits.length) * 100)}%)
// ({Math.ceil((trait.score / hits.length) * 100)}%)

export default EnrichmentRanking
