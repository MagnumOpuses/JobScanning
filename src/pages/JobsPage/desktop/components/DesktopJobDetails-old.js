import React from 'react'
import format from 'date-fns/format'
import sv from 'date-fns/locale/sv'
import {
  DescriptionContainer,
  TextEnrichment
} from '../../../../components/index'
import theme from '../../../../styles/theme'

const DesktopJobDetails = ({ selectedJob }) => {
  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '32px' }}>{selectedJob.header}</h1>
          <h2 style={{ fontSize: '30px' }}>{selectedJob.employer.name}</h2>
        </div>

        <div>
          {selectedJob.location && (
            <p
              style={{
                padding: '2rem 0 0',
                marginBottom: '15px'
              }}
            >
              <span className="bold">Ort:</span> {selectedJob.location}
            </p>
          )}

          <p>
            <span className="bold">Sök jobbet senast:</span>{' '}
            {selectedJob.application.deadline
              ? format(new Date(selectedJob.application.deadline), 'D MMMM', {
                  locale: sv
                })
              : 'Se annonsen för datum'}
          </p>
        </div>
      </header>

      {selectedJob.detected_keywords && (
        <div
          style={{
            margin: '2rem 0',
            padding: '1rem 0',
            borderTop: `2px solid ${theme.green4}`,
            borderBottom: `2px solid ${theme.green4}`
          }}
        >
          <p>Vi hittade följande i annonsen som vi tror är relevant för dig</p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '2rem 0 4rem'
            }}
          >
            <TextEnrichment />
          </div>
          <p style={{ fontSize: '18px !important', fontStyle: 'italic' }}>
            OBS: Informationen plockas ut av vår textanalys och kan vara
            missvisande
          </p>
        </div>
      )}

      {/* <div>
      <p>Publicerad hos</p>
      {selectedJob.duplicatedGroupId.length > 1 ? (
        'Se nedan'
      ) : [selectedJob.source.site.name] in images ? (
        <SourceLogo
          src={images[selectedJob.source.site.name]}
          alt={selectedJob.source.site.name}
        />
      ) : (
        <p>{selectedJob.source.site.name}</p>
      )}
    </div> */}
      <DescriptionContainer
        text={selectedJob.content}
        characters={1200}
        sources={selectedJob.sources}
      />
    </div>
  )
}

export default DesktopJobDetails
