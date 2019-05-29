import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import breakpoints from '../styles/breakpoints';

class TermAndLocation extends React.Component {
  render() {
    const { usedSearchTerm, usedLocation, hide } = this.props;

    if (hide || !usedSearchTerm) {
      return null;
    }

    return (
      <P>
        <span style={{ textTransform: 'capitalize' }}>{usedSearchTerm}</span> -{' '}
        {usedLocation.text ? usedLocation.text : 'hela Sverige'}
      </P>
    );
  }
}

function mapStateToProps({ ads }) {
  const { usedSearchTerm, usedLocation } = ads;

  return {
    usedSearchTerm,
    usedLocation
  };
}

export default connect(mapStateToProps)(TermAndLocation);

const P = styled.p`
  display: none;
  font-weight: bold;
  margin: 0;

  @media (max-width: ${breakpoints.tablet}) {
    display: block;
  }
`;
