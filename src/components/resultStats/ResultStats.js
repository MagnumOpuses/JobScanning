import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import breakpoints from '../../styles/breakpoints';

const ResultStats = ({ searchTerm, hits, sources }) => {
  return (
    <DesktopSearchMetadata>
      <OverviewLink
        to={`/overview/${searchTerm}`}
        className={`mobile-overview-link ${
          searchTerm.length > 0 ? '' : 'link-disabled'
        }`}
      >
        <Icon name="line graph" />
        Se översikt
      </OverviewLink>
      <p>
        Visar{hits ? hits.length : 0} jobbannonser från {sources}
        {'\n'}
        webbplatser.
      </p>
    </DesktopSearchMetadata>
  );
};

export default ResultStats;

const DesktopSearchMetadata = styled.div`
  margin: 20px 10px;

  @media (max-width: ${breakpoints.tabletLandscape}) {
    padding: 0 10px;
  }

  p {
    margin: 0;
  }
`;

const OverviewLink = styled(Link)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 11px 30px;
    color: #000;
    background: #fff;
    border: 2px solid ${({ theme }) => theme.green4};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

    &.link-disabled {
      pointer-events: none;
      color: ${({ theme }) => theme.lightGrey};
      border: 2px solid ${({ theme }) => theme.lightGrey};
    }

    &.mobile-overview-link {
      width: 213px;

      @media (min-width: ${breakpoints.tablet}) {
        display: none;
      }
    }
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
