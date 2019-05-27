import React, { Component } from 'react';
import styled from 'styled-components';

export default class LogoPlaceholder extends Component {
  state = { exists: true };

  onError = () => {
    this.setState({ exists: false });
  };

  render() {
    const { name, logoUrl } = this.props.employer;

    if (!logoUrl && !name) {
      return <StyledH3 />;
    }

    try {
      if (logoUrl) {
        return this.state.exists ? (
          <StyledImg
            onError={this.onError}
            src={logoUrl}
            alt={name}
            padding={this.props.padding}
          />
        ) : (
          <StyledH3>
            {name
              .match(/\b\w/g)
              .slice(0, 3)
              .join('')}
          </StyledH3>
        );
      } else {
        return (
          <StyledH3>
            {name
              .match(/\b\w/g)
              .slice(0, 3)
              .join('')}
          </StyledH3>
        );
      }
    } catch (error) {
      return <StyledH3 />;
    }
  }
}

const StyledImg = styled.img`
  width: 80px;
  margin-right: 15px;
`;

const StyledH3 = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 65px;
  width: 65px;
  margin: 0 25px 0 5px !important;
  border-radius: 50%;
  font-size: 25px;
  overflow: hidden;
  text-align: center;
  text-transform: uppercase;
  word-break: break-word;
  hyphens: auto;
  color: #fff;
  background: ${props => props.theme.green3};
`;
