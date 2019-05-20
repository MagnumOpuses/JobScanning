import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import sv from 'date-fns/locale/sv';
import { DescriptionContainer, LogoPlaceholder, TextEnrichment } from './index';
import images from '../images';
import { buttonStyleCorners } from '../styles/components';
import breakpoints from '../styles/breakpoints';

const DesktopJobDetails = ({ selectedJob, unselectJob }) => {
  return (
    <Container>
      <Header>
        <div className="employer">
          <LogoPlaceholder employer={selectedJob.employer} />
        </div>

        <div className="information">
          <h2>{selectedJob.header}</h2>
          <h3>{selectedJob.employer.name}</h3>
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
        <span onClick={() => unselectJob()} className="close-icon" />
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
              alignItems: 'flex-start',
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
      <h3>Annons</h3>
      <DescriptionText>
        {selectedJob.content.replace(/\n/g, '\n\n').substring(0, 1200)}
      </DescriptionText>

      {selectedJob.sources.length > 1 ? (
        <MultipleLinks>
          <p>
            Vi hittade annonsen på {selectedJob.sources.length} olika sajter
          </p>
          <p>Välj vilken du vill gå till!</p>
          <SourcesContainer>
            {selectedJob.sources.map((source, i) => (
              <A
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
              </A>
            ))}
          </SourcesContainer>
        </MultipleLinks>
      ) : (
        <StyledLink
          href={selectedJob.sources[0].url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Gå till annonsen
        </StyledLink>
      )}

      {/* <DescriptionContainer
        text={selectedJob.content}
        characters={1200}
        sources={selectedJob.sources}
      /> */}
    </Container>
  );
};

export default DesktopJobDetails;

const Container = styled.div`
  position: absolute;
  top: 100px;
  left: 545px;
  right: 5%;
  z-index: 1;
  padding: 60px;
  margin-bottom: 50px;
  background: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 1366px) {
    left: 490px;
    right: 10px;
  }

  @media (max-width: 1024px) {
    left: 20px;
    right: 20px;
  }

  @media (max-width: 767px) {
    left: 10px;
    right: 10px;
  }
`;

const Header = styled.header`
  display: flex;
  margin-bottom: 40px;

  .employer {
    margin-right: 20px;
  }

  .information {
    flex: 1 1 auto;
    margin-right: 20px;
    h2 {
      font-size: 22px;
    }

    h3 {
      font-size: 20px;
    }
  }

  .publisher {
    flex: 0 0 auto;
  }

  .close-icon {
    width: 30px;
    position: absolute;
    top: 0;
    right: 0;
    padding: 30px;
    cursor: pointer;

    &::before,
    &::after {
      content: '';
      display: inline-block;
      height: 2px;
      width: 30px;
      position: absolute;
      top: 30px;
      left: 15px;
      background: #aaa;
    }

    &::before {
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }

    &:hover::before {
      background: #000;
    }

    &:hover::after {
      background: #000;
    }
  }
`;

const SourceLogo = styled.div`
  height: 50px;
  width: 100%;
  background: ${props => `url(${props.sourceLogo})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const DescriptionText = styled.p`
  max-width: 740px;
  font-size: 20px;
  line-height: 27px;
  white-space: pre-line;
  background: -webkit-linear-gradient(
    #000 0%,
    #eee 75%,
    rgba(255, 255, 255, 0)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgba(255, 255, 255, 0);
`;

const SourcesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

const MultipleLinks = styled.div`
  width: 70%;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.05);
  padding: 2rem 0 1rem;
  margin: 0 auto 50px;
`;

const A = styled.a`
  flex: 1 1 45%;
  max-width: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2.5%;
  padding: 5px;

  &:hover {
    background: #eee;
  }
`;

const StyledLink = styled.a`
  ${buttonStyleCorners}
  &:link,
  &:visited {
    display: block;
    width: 270px;
    margin: 0 auto;
    padding: 1.5rem 60px;
  }
`;
