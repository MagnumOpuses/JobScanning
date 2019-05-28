import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import breakpoints from '../../styles/breakpoints';

const ResultStats = ({ processedList, sources }) => {
  return (
    <DesktopSearchMetadata>
      <p>
        {processedList ? processedList.length : 0} jobbannonser från {sources}
        {'\n'}
        webbplatser för {'\n'}
      </p>
    </DesktopSearchMetadata>
  );
};

export default ResultStats;

const DesktopSearchMetadata = styled.div`
  margin: 20px;

  @media (max-width: ${breakpoints.tabletLandscape}) {
    padding: 0 10px;
  }

  p {
    margin: 0;

    @media (max-width: ${breakpoints.mobileLandscape}) {
      white-space: pre-line;
    }
  }
`;
