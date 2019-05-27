import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import PageHeader from '../components/PageHeader';
import Chart from '../components/Chart';
import theme from '../styles/theme';
import breakpoints from '../styles/breakpoints';
import SkillsRankingContainer from '../components/enrichmentRanking/SkillsRankingContainer';
import TraitsRankingContainer from '../components/enrichmentRanking/TraitsRankingContainer';
import SourceRankingContainer from '../components/sourceRanking/SourceRankingContainer';

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
          {/* <Link to="/jobs" style={{ color: '#000' }}>
            <SVGBackArrow height="40" width="255">
              <polygon
                points="0,20 20,0 255,0 255,40 20,40"
                fill="#fff"
                stroke="#49efe1"
                strokeWidth="3"
              />
              <text x="25" y="28">
                Gå tillbaka till annonser
              </text>
            </SVGBackArrow>
          </Link> */}
          <h2
            style={{
              fontSize: '28px',
              textAlign: 'center',
              textTransform: 'uppercase',
              margin: '20px 0 !important'
            }}
          >
            YRKESÖVERSIKT {occupationData.occupation}
          </h2>
          <p>
            Här finns information om alla annonser vi hittar för{' '}
            <span className="occupation-name">{occupationData.occupation}</span>{' '}
            i hela Sverige. Se vilka rekryteringssajter som har flest annonser
            för just det yrket just nu, och vilka kompetenser och förmågor som
            vår textanalys hittat och klassat som mest efterfrågade
          </p>
        </div>
        <div className="sources box">
          <Header
            as="h2"
            icon="world"
            content="Källor"
            style={{ fontSize: '24px' }}
          />
          <SourceRankingContainer />
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
        <div className="map box">
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
        </div>
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
            fördelats över året historiskt sett
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
  grid-gap: 20px;
  max-width: 1366px;
  margin: 40px auto;
  padding: 0 20px 20px;

  @media screen and (max-width: ${breakpoints.tabletLandscape}) {
    height: auto;
    grid-template-rows: auto auto 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'header header'
      'skills traits'
      'sources map'
      'chart chart';
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
    padding: 20px 15px;
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
  }

  .occupation-name {
    font-size: 22px;
    font-weight: 700;
    font-style: italic;
    text-transform: lowercase;
    /* color: ${theme.green4}; */
  }
`;

const SVGBackArrow = styled.svg`
  margin: 20px 0;
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.2));

  &:hover {
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2));
  }

  text {
    font-size: 20px;
  }
`;
