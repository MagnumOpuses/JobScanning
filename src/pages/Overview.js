import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PageHeaderAds from './JobsPage/components/PageHeaderAds'

const Overview = () => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <PageHeaderAds />

      <GridContainer>
        <div className="header">
          <Link to="/jobs" style={{ color: '#000' }}>
            <BackArrow>Gå tillbaka till annonser</BackArrow>
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
        <div className="skills box">Kompetenser</div>
        <div className="traits box">Förmågor</div>
        <div className="map box">Karta</div>
        <div className="graph box">Historik</div>
      </GridContainer>
    </div>
  )
}

export default Overview

const GridContainer = styled.div`
  height: 100%;
  margin: 50px;
  display: grid;
  grid-template-rows: auto 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
    'header header header'
    'sources skills traits'
    'map graph graph';
  grid-gap: 40px;

  .box {
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
  }

  .graph {
    grid-area: graph;
  }
`
const BackArrow = styled.div`
  /* width: 200px;
  height: 40px;
  display: inline-flex;
  position: relative;
  background: #fff;

  &:before {
    content: '';
    position: absolute;
    left: -20px;
    bottom: 0;
    width: 0;
    height: 0;
    border-right: 20px solid #fff;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
  } */
`
