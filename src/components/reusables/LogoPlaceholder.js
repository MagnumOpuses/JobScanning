import React, { Component } from 'react';
import styled from 'styled-components';

export default class LogoPlaceholder extends Component {
  state = { exists: true };

  onError = () => {
    this.setState({ exists: false });
  };

  render() {
    if (this.props.employer.logoUrl) {
      return this.state.exists ? (
        <StyledImg
          onError={this.onError}
          src={this.props.employer.logoUrl}
          alt={this.props.employer.name}
          padding={this.props.padding}
        />
      ) : (
        <StyledH3>
          {this.props.employer.name
            .match(/\b\w/g)
            .slice(0, 3)
            .join('')}
        </StyledH3>
      );
    } else if (this.props.employer.name) {
      return (
        <StyledH3>
          {this.props.employer.name
            .match(/\b\w/g)
            .slice(0, 3)
            .join('')}
        </StyledH3>
      );
    } else {
      console.log(this.props.employer);

      return <></>;
    }
  }
}

const StyledImg = styled.img`
  width: 100px;
  margin-right: 1.5rem;
`;

const StyledH3 = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 65px;
  width: 65px;
  margin: 0 25px 0 15px !important;
  border-radius: 50%;
  font-size: 25px;
  font-weight: 700;
  overflow: hidden;
  text-align: center;
  text-transform: uppercase;
  word-break: break-word;
  hyphens: auto;
  color: #fff;
  background: ${props => props.theme.green3};
`;
