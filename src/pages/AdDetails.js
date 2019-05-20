import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  LogoPlaceholder,
  NoResultsBox,
  PageHeader,
  DescriptionContainer,
  TextEnrichment
} from '../components';
import format from 'date-fns/format';
import sv from 'date-fns/locale/sv';
import images from '../images/index';
import theme from '../styles/theme';
import Responsive from 'react-responsive';
import DesktopJobsPage from './JobsPage/desktop/DesktopJobsPage';

class AdDetails extends Component {
  componentDidMount = async () => {
    window.scrollTo(0, 0);
  };

  render() {
    const { selectedJob } = this.props;

    const {
      application,
      content,
      employer,
      header,
      location,
      sources
    } = this.props.selectedJob;
    if (!sources) {
      return (
        <div>
          <PageHeader ads />
        </div>
      );
    }

    const siteName = sources.length > 1 ? 'Se nedan' : sources[0].name;
    return (
      <div>
        <Responsive minWidth={768}>
          <DesktopJobsPage />
        </Responsive>
        <Responsive maxWidth={767}>
          <PageHeader ads />
          {!Object.keys(this.props.selectedJob).length > 0 ? (
            <NoResultsBox adDetails />
          ) : (
            <div>
              <StyledHeader>
                <div>
                  <Link to="/jobs">{`< tillbaka`}</Link>
                </div>
                <RightDiv>
                  <div>
                    <p>Publicerad hos</p>
                  </div>
                  {[siteName] in images ? (
                    <div>
                      <SourceLogo src={images[siteName]} alt={siteName} />
                    </div>
                  ) : (
                    <p>{siteName}</p>
                  )}
                </RightDiv>
              </StyledHeader>
              <Heading>
                <LogoPlaceholder employer={employer} padding={true} />
                <div
                  style={{
                    margin: '0 0 0 2rem'
                  }}
                >
                  <h1
                    style={{
                      fontSize: '20px'
                    }}
                  >
                    {header}
                  </h1>
                  <h2
                    style={{
                      fontSize: '18px',
                      fontWeight: 'normal',
                      margin: '0 !important'
                    }}
                  >
                    {selectedJob.employer.name}
                  </h2>
                </div>
              </Heading>
              {selectedJob.detected_keywords && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderBottom: `2px solid ${theme.green4}`,
                    padding: '2rem 0 0'
                  }}
                >
                  <TextEnrichment />
                </div>
              )}
              <InfoContainer>
                <p>
                  <span className="bold">Ort:</span> {location}
                </p>
                <p>
                  <span className="bold">Sök jobbet senast:</span>{' '}
                  {application.deadline
                    ? format(new Date(application.deadline), 'D MMMM', {
                        locale: sv
                      })
                    : 'Se annonsen för datum'}
                </p>
              </InfoContainer>
              <StyledDiv>
                <DescriptionContainer
                  text={content}
                  characters={800}
                  sources={sources}
                />
              </StyledDiv>
            </div>
          )}
        </Responsive>
      </div>
    );
  }
}

function mapStateToProps({ ads }) {
  const { hits, processedList, selectedJob } = ads;

  return {
    hits,
    processedList,
    selectedJob
  };
}

export default connect(mapStateToProps)(AdDetails);

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 1rem;
`;

const SourceLogo = styled.img`
  max-height: 4rem;
  max-width: 100%;
  height: auto;
`;

const RightDiv = styled.div`
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;

const StyledDiv = styled.div`
  padding: 3rem 1rem;
  box-shadow: 0 -0.3rem 0.5rem rgba(0, 0, 0, 0.5);
`;

const Heading = styled.div`
  border-top: 2px solid ${props => props.theme.green4};
  border-bottom: 2px solid ${props => props.theme.green4};

  display: flex;
  align-items: center;

  width: 100%;
  padding: 2rem 1rem;
  overflow: hidden;
`;

const InfoContainer = styled.div`
  padding: 2rem 1.5rem;
`;
