import React from 'react'
import styled from 'styled-components'
import format from 'date-fns/format'
import sv from 'date-fns/locale/sv'
import {
  DescriptionContainer,
  LogoPlaceholder,
  TextEnrichment
} from '../../../../components/index'
import theme from '../../../../styles/theme'
import images from '../../../../images'

const DesktopJobDetails = ({ selectedJob }) => {
  return (
    <Container>
      <Header>
        <div className="employer">
          <LogoPlaceholder employer={selectedJob.employer} />
        </div>

        <div className="information">
          <h1>{selectedJob.header}</h1>
          <h2>{selectedJob.employer.name}</h2>
          {selectedJob.location && <p>{selectedJob.location}</p>}

          {selectedJob.application.deadline && (
            <p>
              Sök senast:{' '}
              {format(new Date(selectedJob.application.deadline), 'D MMMM', {
                locale: sv
              })}
            </p>
          )}
        </div>

        <div className="publisher">
          Publicerad hos
          {selectedJob.sources.map((source, i) => (
            <a
              key={i}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {[source.name] in images ? (
                <SourceLogo sourceLogo={images[source.name]} />
              ) : (
                <p>{source.name}</p>
              )}
            </a>
          ))}
        </div>
      </Header>

      {selectedJob.detected_keywords.skills.length > 0 && (
        <div
          style={{
            margin: '2rem 0',
            padding: '1rem 0'
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

      <DescriptionContainer
        text={selectedJob.content}
        characters={1200}
        sources={selectedJob.sources}
      />
    </Container>
  )
}

export default DesktopJobDetails

const Container = styled.div`
  position: absolute;
  top: 5%;
  left: 0;
  right: 5%;
  z-index: 1;
  padding: 60px;
  background: #fff;
`

const Header = styled.header`
  display: flex;
  margin-bottom: 40px;

  .employer {
  }

  .information {
    flex: 1;
  }

  .publisher {
  }
`

const SourceLogo = styled.div`
  height: 50px;
  width: 100%;
  background: ${props => `url(${props.sourceLogo})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`
