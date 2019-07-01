import React, { Component } from 'react';
import styled from 'styled-components';
import { SearchForm } from '../components';
import breakpoints from '../styles/breakpoints';
import { withSnackbar } from 'notistack';

class Search extends Component {

  constructor(props){
    super(props);

    const message = 'The data in this site is not real, just to show what can be done';

    // enqueue persistent snackbar
    this.props.enqueueSnackbar(message, { 
      autoHideDuration: 5000
    });

  }

  render() {
    return (
      <FlexContainer>
        <h1>Alla jobb på ett ställe</h1>
        <p>
          <span className="bold">294 293</span> jobb från{' '}
          <span className="bold">1009</span> jobbsajter
        </p>

        <SearchForm upward={true} />
      </FlexContainer>
    );
  }
}

export default withSnackbar(Search);

const FlexContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  h1,
  p {
    text-align: center;
  }

  h1 {
    margin-top: 100px;

    @media screen and (max-width: ${breakpoints.tablet}) {
      margin-top: 50px;
    }
  }

  p {
    font-size: 24px;
    margin: 1.5rem 0 70px;

    @media screen and (max-width: ${breakpoints.tablet}) {
      margin: 1.5rem 0 4rem 0;
      font-size: 24px;
    }

    @media screen and (max-width: ${breakpoints.mobileLandscape}) {
      font-size: 20px;
    }
  }
`;
