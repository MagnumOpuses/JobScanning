import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import PageHeaderAds from './JobsPage/components/PageHeaderAds';
import Chart from '../components/Chart';
import breakpoints from '../styles/breakpoints';
import SkillsRankingContainer from '../components/enrichmentRanking/SkillsRankingContainer';
import TraitsRankingContainer from '../components/enrichmentRanking/TraitsRankingContainer';
import SourceRankingContainer from '../components/sourceRanking/SourceRankingContainer';

const Overview = () => {
  return (
    <>
      <PageHeaderAds />

      <GridContainer>
        <div className="header">
          <Link to="/jobs" style={{ color: '#000' }}>
            <SVGBackArrow height="40" width="250">
              <polygon
                points="0,20 20,0 250,0 250,40 20,40"
                fill="#fff"
                stroke="#49efe1"
                strokeWidth="3"
              />
              <text x="25" y="28">
                Gå tillbaka till annonser
              </text>
            </SVGBackArrow>
          </Link>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
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
            content="Karta"
            style={{ fontSize: '24px' }}
          />
        </div>
        <div className="chart box">
          <Header
            as="h2"
            icon="line graph"
            content="Historik"
            style={{ fontSize: '24px' }}
          />
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
  margin: 0 auto;
  padding: 20px;

  @media screen and (max-width: ${breakpoints.mobileLandscape}) {
    height: auto;
    padding: 20px 5px;
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

  .box {
    padding: 40px;
    background: #fff;
    /* box-shadow: 0 1px 3px rgba(0, 0, 0, 2); */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1);
    /* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12); */

    @media screen and (max-width: ${breakpoints.mobileLandscape}) {
      padding: 20px 5px;
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
`;
const SVGBackArrow = styled.svg`
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.2));

  &:hover {
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2));
  }

  text {
    font-size: 20px;
  }
`;
