import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PageHeaderAds from './JobsPage/components/PageHeaderAds'
import Chart from '../components/Chart'
import JobMapContainer from '../components/jobMapHeat/JobMapContainer'
import breakpoints from '../styles/breakpoints'
import SkillsRankingContainer from '../components/enrichmentRanking/SkillsRankingContainer'
import TraitsRankingContainer from '../components/enrichmentRanking/TraitsRankingContainer'

const Overview = () => {
  return (
    <div
      style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}
    >
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
        <div className="sources box">Källor</div>
        <div className="skills box">
          <SkillsRankingContainer />
        </div>
        <div className="traits box">
          <TraitsRankingContainer />
        </div>
        <div className="map box">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div>{/* <JobMapContainer /> */}</div>
        </div>
        <div className="chart box">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <Chart />
        </div>
      </GridContainer>
    </div>
  )
}

export default Overview

const GridContainer = styled.div`
  /* min-height: 100%; */
  /* flex: 1; */
  margin: 50px;
  display: grid;
  grid-template-rows: auto auto auto;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
    'header header header'
    'sources skills traits'
    'map chart chart';
  grid-gap: 40px;

  @media (max-width: 1023px) {
    height: auto;
    grid-template-rows: auto auto 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'header header'
      'skills traits'
      'sources map'
      'chart chart';
  }

  @media (max-width: ${breakpoints.tablet}) {
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

  .box {
    padding: 20px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 2);
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
`
const SVGBackArrow = styled.svg`
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.2));

  &:hover {
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2));
  }

  text {
    font-size: 20px;
  }
`
