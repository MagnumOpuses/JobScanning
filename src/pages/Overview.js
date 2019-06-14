import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react';
import {
  SkillsRankingContainer,
  TraitsRankingContainer,
  SourceRanking,
  Chart,
  PageHeader
} from '../components';
import theme from '../styles/theme';
import breakpoints from '../styles/breakpoints';
// import MapComponent from '../components/map/map';

const Overview = props => {
  const [occupationData, setOccupationData] = useState({});

  useEffect(() => {
    const { occupation } = props.match.params;
    setOccupationData({ occupation: occupation });
  });

  return (
    <>
      <PageHeader />

      <GridContainer>
        <div className="header">
          <OverviewLink to={`/jobs/${occupationData.occupation}`}>
            <Icon name="angle double left" />
            Gå tillbaka till annonser
          </OverviewLink>
          <h2
            style={{
              fontSize: '28px',
              textAlign: 'center',
              textTransform: 'uppercase',
              margin: '20px 0 !important'
            }}
          >
            ÖVERSIKT {occupationData.occupation}
          </h2>
          <p>
            Här finns information om alla annonser vi hittar för{' '}
            <span className="occupation-name">{occupationData.occupation}</span>{' '}
            i hela Sverige. Se vilka rekryteringssajter som har flest annonser
            för just det yrket just nu, och vilka kompetenser och förmågor som
            vår textanalys hittat och klassat som mest efterfrågade.
          </p>
        </div>
        <div className="sources box">
          <Header
            as="h2"
            icon="world"
            content="Källor"
            style={{ fontSize: '24px' }}
          />
          <SourceRanking />
        </div>
        <div className="skills box">
          <Header
            as="h2"
            icon="briefcase"
            content="Kompetenser"
            style={{ fontSize: '24px' }}
          />
          <SkillsRankingContainer />
        </div>
        <div className="traits box">
          <Header
            as="h2"
            icon="user"
            content="Förmågor"
            style={{ fontSize: '24px' }}
          />
          <TraitsRankingContainer />
        </div>
        {/* <div className="map box">
          <Header
            as="h2"
            icon="map"
            content="PROGNOSKARTA"
            style={{ fontSize: '24px' }}
          />
          <p>
            Arbetsförmedlingen bedömer att{' '}
            <span className="occupation-name">{occupationData.occupation}</span>{' '}
            har 'mycket goda' möjligheter till arbete det närmaste året. På fem
            års sikt bedöms möjligheterna till arbete vara 'goda'.
          </p>
          <MapComponent mode="heatmap" />
        </div> */}
        <div className="chart box">
          <Header
            as="h2"
            icon="line graph"
            content="ANNONSHISTORIK"
            style={{ fontSize: '24px' }}
          />
          <p>
            Medelvärde över hur jobbannonser publicerade på Platsbanken för{' '}
            <span className="occupation-name">{occupationData.occupation}</span>{' '}
            fördelats över året historiskt sett.
          </p>
          <Chart />
        </div>
      </GridContainer>
    </>
  );
};

export default Overview;

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
    'header header header'
    'sources skills traits'
    'map chart chart';
  grid-gap: 40px;
  max-width: 1366px;
  margin: 40px auto;
  padding: 0 20px 20px;

  @media screen and (max-width: 1366px) {
    height: auto;
    grid-template-rows: auto auto 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'header header'
      'skills traits'
      'sources map'
      'chart chart';
    grid-gap: 20px;
    margin: 0px auto;
  }

  @media screen and (max-width: ${breakpoints.tablet}) {
    height: auto;
    grid-template-rows: auto auto auto auto auto auto;
    grid-template-columns: 1fr;
    grid-template-areas:
      'header'
      'sources'
      'skills'
      'traits'
      'map'
      'chart';
  }

  @media screen and (max-width: ${breakpoints.mobileLandscape}) {
    height: auto;
    padding: 0px 15px;
  }

  .box {
    padding: 40px;
    background: #fff;
    /* box-shadow: 0 1px 3px rgba(0, 0, 0, 2); */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1);

    @media screen and (max-width: ${breakpoints.mobileLandscape}) {
      padding: 20px;
    }
  }

  .header {
    grid-area: header;
  }

  .sources {
    grid-area: sources;
  }

  .skills {
    grid-area: skills;
  }

  .traits {
    grid-area: traits;
  }

  .map {
    grid-area: map;
    display: flex;
    flex-direction: column;
  }

  .chart {
    grid-area: chart;

    svg:not(:root) {
      overflow: visible;
    }
  }

  .occupation-name {
    font-size: 22px;
    font-weight: 700;
    font-style: italic;
    text-transform: lowercase;
    /* color: ${theme.green4}; */
  }
`;

const OverviewLink = styled(Link)`
  &:link,
  &:visited {
    display: inline-flex;
    align-items: center;
    margin: 10px 0;
    padding: 11px 10px;
    color: #000;
    background: #fff;
    border: 2px solid ${({ theme }) => theme.green4};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    color: ${props => props.theme.white};
    background: ${props => props.theme.green4};
  }

  &:active {
    box-shadow: none;
  }

  i {
    font-size: 20px !important;
    margin-right: 10px;
  }
`;
