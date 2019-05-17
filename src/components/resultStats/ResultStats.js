import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import breakpoints from '../../styles/breakpoints';

const ResultStats = ({
  total,
  processedList,
  sources,
  usedSearchTerm,
  usedLocation
}) => {
  return (
    <DesktopSearchMetadata>
      <p>
        {processedList ? processedList.length : 0} jobbannonser från {sources}{' '}
        webbplatser för {'\n'}
        <span className="bold" style={{ textTransform: 'capitalize' }}>
          {usedSearchTerm}
        </span>{' '}
        i{' '}
        <span className="bold">
          {usedLocation ? usedLocation.text : 'hela Sverige'}
        </span>
      </p>
      {usedSearchTerm && (
        <Link to="/overview" style={{ color: '#49efe1' }}>
          <Icon name="line graph" size="large" />
          Se yrkesöversikt
        </Link>
      )}
    </DesktopSearchMetadata>
  );
};

export default ResultStats;

const DesktopSearchMetadata = styled.div`
  height: 80px;
  margin: 20px;

  @media (max-width: ${breakpoints.tabletLandscape}) {
    padding: 0 10px;
  }

  p {
    margin: 0;
    white-space: pre-line;
  }
`;
